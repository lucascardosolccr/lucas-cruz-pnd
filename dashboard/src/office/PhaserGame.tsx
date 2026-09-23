import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { OfficeScene } from './OfficeScene';
import { useSquadStore } from '@/store/useSquadStore';
import type { SquadState } from '@/types/state';

export function PhaserGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  // Create Phaser game on mount
  useEffect(() => {
    if (!containerRef.current || gameRef.current) return;

    const container = containerRef.current;
    const w = container.clientWidth || 800;
    const h = container.clientHeight || 600;

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: container,
      width: w,
      height: h,
      // Text is rendered by Phaser.Text (unaffected by pixelArt), while sprite
      // textures get a NEAREST filter in OfficeScene.create() for a crisp look.
      pixelArt: false,
      antialias: false,
      roundPixels: true,         // snap sprites to whole pixels
      backgroundColor: '#1a1420',
      scene: [OfficeScene],
      scale: {
        mode: Phaser.Scale.NONE,
      },
    });

    gameRef.current = game;

    // Resize canvas when container resizes
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          game.scale.resize(width, height);
        }
      }
    });
    ro.observe(container);

    return () => {
      ro.disconnect();
      game.destroy(true);
      gameRef.current = null;
    };
  }, []);

  // Bridge React state → Phaser scene.
  // Only forward an update when the *selected squad* or its state object actually
  // changes — otherwise unrelated store mutations (e.g. the connection indicator
  // toggling on every poll tick) would trigger a full scene rebuild.
  useEffect(() => {
    let lastSquad: string | null = null;
    let lastState: SquadState | null = null;

    return useSquadStore.subscribe((state) => {
      const game = gameRef.current;
      if (!game) return;
      const scene = game.scene.getScene('OfficeScene') as OfficeScene | null;
      if (!scene || !scene.scene.isActive()) return;

      const selectedSquad = state.selectedSquad;
      const squadState = selectedSquad
        ? state.activeStates.get(selectedSquad) ?? null
        : null;

      // Store actions replace the state object on every real change, so a
      // reference check is enough to detect meaningful updates.
      if (selectedSquad === lastSquad && squadState === lastState) return;
      lastSquad = selectedSquad;
      lastState = squadState;

      scene.events.emit('stateUpdate', squadState);
    });
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        overflow: 'hidden',
        imageRendering: 'auto',
      }}
    />
  );
}
