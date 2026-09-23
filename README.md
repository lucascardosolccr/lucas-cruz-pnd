# Opensquad

Crie squads de agentes de IA que trabalham juntos — direto do seu IDE.

## Como Usar

Abra esta pasta no seu IDE e digite:

```
/opensquad
```

Isso abre o menu principal. De lá você pode criar squads, executá-los e mais.

Você também pode ser direto — descreva o que quer em linguagem natural:

```
/opensquad crie um squad para escrever posts no LinkedIn sobre IA
/opensquad execute o squad meu-squad
```

## Criar um Squad

Digite `/opensquad` e escolha "Criar squad" no menu, ou seja direto:

```
/opensquad crie um squad para [o que você precisa]
```

O Arquiteto fará algumas perguntas, projetará o squad e configurará tudo automaticamente.

## Executar um Squad

Digite `/opensquad` e escolha "Executar squad" no menu, ou seja direto:

```
/opensquad execute o squad <nome-do-squad>
```

O squad executa automaticamente, pausando apenas nos checkpoints de decisão.

## Escritório Virtual

O Escritório Virtual é uma interface visual 2D que mostra seus agentes trabalhando em tempo real.

O dashboard vive em `dashboard/` (React + Vite + Phaser) e observa
`squads/*/state.json` em tempo real via WebSocket.

**Passo 1 — Instale as dependências** (uma vez):

```bash
cd dashboard
npm install
```

**Passo 2 — Rode o servidor de desenvolvimento:**

```bash
npm run dev
```

**Passo 3 —** Abra a URL indicada pelo Vite (por padrão `http://localhost:5173`).

---

# Opensquad (English)

Create AI squads that work together — right from your IDE.

## How to Use

Open this folder in your IDE and type:

```
/opensquad
```

This opens the main menu. From there you can create squads, run them, and more.

You can also be direct — describe what you want in plain language:

```
/opensquad create a squad for writing LinkedIn posts about AI
/opensquad run my-squad
```

## Create a Squad

Type `/opensquad` and choose "Create squad" from the menu, or be direct:

```
/opensquad create a squad for [what you need]
```

The Architect will ask a few questions, design the squad, and set everything up automatically.

## Run a Squad

Type `/opensquad` and choose "Run squad" from the menu, or be direct:

```
/opensquad run the <squad-name> squad
```

The squad runs automatically, pausing only at decision checkpoints.

## Virtual Office

The Virtual Office is a 2D visual interface that shows your agents working in real time.

The dashboard lives in `dashboard/` (React + Vite + Phaser) and watches
`squads/*/state.json` in real time over a WebSocket.

**Step 1 — Install dependencies** (once):

```bash
cd dashboard
npm install
```

**Step 2 — Start the dev server:**

```bash
npm run dev
```

**Step 3 —** Open the URL Vite prints (defaults to `http://localhost:5173`).
