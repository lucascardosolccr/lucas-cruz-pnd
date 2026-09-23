import Phaser from 'phaser';
import {
  CHARACTER_NAMES, MALE_CHARACTERS, FEMALE_CHARACTERS, avatarKeys, avatarPath,
  DESK_PATHS,
  FURNITURE_PATHS,
  type CharacterName,
} from './assetKeys';
import { CELL_W, CELL_H, MARGIN, WALL_H } from './palette';
import { RoomBuilder } from './RoomBuilder';
import { AgentSprite } from './AgentSprite';
import type { SquadState, Agent } from '@/types/state';

function assignCharacters(agents: Agent[]): Map<string, CharacterName> {
  const assignments = new Map<string, CharacterName>();
  let maleIndex = 0;
  let femaleIndex = 0;

  for (const agent of agents) {
    if (agent.gender === 'male') {
      assignments.set(agent.id, MALE_CHARACTERS[maleIndex % MALE_CHARACTERS.length]);
      maleIndex++;
    } else {
      assignments.set(agent.id, FEMALE_CHARACTERS[femaleIndex % FEMALE_CHARACTERS.length]);
      femaleIndex++;
    }
  }

  return assignments;
}

const DEMO_AGENTS: Agent[] = [
  { id: '1', name: 'Researcher', icon: '', status: 'working', gender: 'female', desk: { col: 1, row: 1 } },
  { id: '2', name: 'Writer', icon: '', status: 'idle', gender: 'male', desk: { col: 2, row: 1 } },
  { id: '3', name: 'Editor', icon: '', status: 'done', gender: 'female', desk: { col: 3, row: 1 } },
  { id: '4', name: 'Designer', icon: '', status: 'working', gender: 'female', desk: { col: 1, row: 2 } },
  { id: '5', name: 'Reviewer', icon: '', status: 'checkpoint', gender: 'male', desk: { col: 2, row: 2 } },
  { id: '6', name: 'Publisher', icon: '', status: 'idle', gender: 'male', desk: { col: 3, row: 2 } },
];

export class OfficeScene extends Phaser.Scene {
  private agentSprites: Map<string, AgentSprite> = new Map();
  private roomBuilder!: RoomBuilder;
  // Signature of the last rendered composition (agent ids + desk positions + room
  // size). When it is unchanged we update sprites in place instead of rebuilding.
  private currentSignature: string | null = null;

  constructor() {
    super({ key: 'OfficeScene' });
  }

  preload(): void {
    // Load desk sprites
    for (const [key, path] of Object.entries(DESK_PATHS)) {
      this.load.image(key, path);
    }

    // Load avatar sprites
    for (const name of CHARACTER_NAMES) {
      const keys = avatarKeys(name);
      this.load.image(keys.blink, avatarPath(name, 'blink'));
      this.load.image(keys.talk, avatarPath(name, 'talk'));
      this.load.image(keys.wave1, avatarPath(name, 'wave1'));
      this.load.image(keys.wave2, avatarPath(name, 'wave2'));
    }

    // Load furniture sprites
    for (const [key, path] of Object.entries(FURNITURE_PATHS)) {
      this.load.image(key, path);
    }

    this.load.on('loaderror', (file: Phaser.Loader.File) => {
      console.error('Failed to load asset:', file.key, file.url);
    });
  }

  create(): void {
    // Set all loaded textures to NEAREST filter for crisp pixel art
    if (this.textures.list) {
      for (const tex of Object.values(this.textures.list)) {
        if (tex.key !== '__DEFAULT' && tex.key !== '__MISSING') {
          tex.setFilter(Phaser.Textures.FilterMode.NEAREST);
        }
      }
    }

    this.roomBuilder = new RoomBuilder(this);

    this.events.on('stateUpdate', (state: SquadState | null) => {
      this.onStateUpdate(state);
    });

    this.renderScene(DEMO_AGENTS);
  }

  private onStateUpdate(state: SquadState | null): void {
    const agents = state?.agents ?? DEMO_AGENTS;
    this.renderScene(agents);
  }

  private renderScene(inputAgents: Agent[]): void {
    const { agents, roomW, roomH, cellW, cellH } = this.computeLayout(inputAgents);

    const signature =
      agents.map((a) => `${a.id}@${a.desk.col},${a.desk.row}`).join('|') +
      `#${roomW}x${roomH}`;

    // Same squad composition & layout → update statuses in place (no teardown).
    if (signature === this.currentSignature && this.agentSprites.size === agents.length) {
      for (const agent of agents) {
        this.agentSprites.get(agent.id)?.updateStatus(agent);
      }
      return;
    }

    // Composition changed → rebuild the room and sprites from scratch.
    this.currentSignature = signature;
    this.clearScene();
    this.roomBuilder.build(roomW, roomH);

    const characterMap = assignCharacters(agents);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      const x = (agent.desk.col - 1) * cellW + MARGIN + cellW / 2;
      const y = (agent.desk.row - 1) * cellH + MARGIN + WALL_H + cellH / 2;
      const characterName = characterMap.get(agent.id)!;
      const deskVariant = i % 2 === 0 ? 'black' : 'white';
      const agentSprite = new AgentSprite(this, x, y, characterName, deskVariant, agent);
      this.agentSprites.set(agent.id, agentSprite);
    }

    // Fit room in viewport with slight padding
    const cam = this.cameras.main;
    const scaleX = cam.width / (roomW + 32);
    const scaleY = cam.height / (roomH + 32);
    const zoom = Math.min(scaleX, scaleY, 2);
    cam.setZoom(zoom);
    cam.centerOn(roomW / 2, roomH / 2);
  }

  /** Resolve desk positions and derive room dimensions for a set of agents. */
  private computeLayout(agents: Agent[]): {
    agents: Agent[];
    roomW: number;
    roomH: number;
    cellW: number;
    cellH: number;
  } {
    // Auto-assign desk positions if all agents are at the same spot (default 1,1)
    const allSameDesk =
      agents.length > 1 &&
      agents.every((a) => a.desk.col === agents[0].desk.col && a.desk.row === agents[0].desk.row);
    if (allSameDesk) {
      const cols = Math.min(agents.length, 3); // max 3 columns
      agents = agents.map((a, i) => ({
        ...a,
        desk: { col: (i % cols) + 1, row: Math.floor(i / cols) + 1 },
      }));
    }

    let maxCol = 0, maxRow = 0;
    for (const agent of agents) {
      maxCol = Math.max(maxCol, agent.desk.col);
      maxRow = Math.max(maxRow, agent.desk.row);
    }

    // Wider cells for comfortable spacing between agents + labels
    const cellW = CELL_W + 64;   // 160px per cell (wider for desk tables + decorations)
    const cellH = CELL_H + 80;   // 176px per cell (label + monitor + desk + avatar)

    const roomW = Math.max(maxCol * cellW + MARGIN * 2, 580);
    // Extra space below desk grid for lounge area
    const loungeSpace = CELL_H + 48;
    const roomH = maxRow * cellH + MARGIN * 2 + WALL_H + loungeSpace;

    return { agents, roomW, roomH, cellW, cellH };
  }

  private clearScene(): void {
    // Destroy AgentSprite wrappers first so their animation timers are cleared
    // (removeAll only disposes display objects, not scene timers).
    for (const sprite of this.agentSprites.values()) {
      sprite.destroy();
    }
    this.agentSprites.clear();
    this.children.removeAll(true);
  }
}
