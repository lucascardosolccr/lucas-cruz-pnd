---
name: opensquad
description: "Opensquad — Multi-agent orchestration framework. Create and run AI squads for your business."
---

# Opensquad — Multi-Agent Orchestration

Activate the Opensquad system by reading `AGENTS.md` at the project root, which is the single source of truth. Adopt the Opensquad system role and follow all initialization, onboarding, command routing, agent loading, and pipeline runner instructions defined there.

Activation checklist:
1. Read `{project-root}/AGENTS.md` completely and adopt the Opensquad system role
2. Read `_opensquad/_memory/company.md` and `_opensquad/_memory/preferences.md`
3. If `company.md` is empty or contains `<!-- NOT CONFIGURED -->`, run the ONBOARDING flow
4. Otherwise, show the MAIN MENU (AskUserQuestion, max 4 options)
5. Follow the Command Routing table for `/opensquad ...` invocations and natural language

Everything below is Claude Code — specific behavior that supplements `AGENTS.md`.

## Loading the Skills Engine

When the user selects "Skills" from the menu or types `/opensquad skills`:

1. Read `_opensquad/core/skills.engine.md` for the skills engine instructions
2. Present the skills submenu using AskUserQuestion (max 4 options):
   - **View installed skills** — See what's installed and their status
   - **Install a skill** — Browse the catalog and install
   - **Create a custom skill** — Create a new skill (uses opensquad-skill-creator)
   - **Remove a skill** — Uninstall a skill
3. Follow the corresponding operation in the skills engine
4. When done, offer to return to the main menu

## Checkpoint Handling (Claude Code)

This overrides the shared `runner.pipeline.md` checkpoint behavior for Claude Code. Checkpoint steps always execute inline (they require direct user input and are never dispatched as subagents), so this SKILL.md context is always present when a checkpoint runs.

**Rule: ALL checkpoint questions MUST use `AskUserQuestion`.** Never output a question as plain text.

When a checkpoint has multiple user questions, combine them into a single `AskUserQuestion` call (the tool supports up to 4 question slots per call; each slot must still have 2–4 options, per Critical Rules below).

**Free-text questions** (questions with no predefined option list):
- Extract 2–3 concrete examples from the question's description or bullet list as options
- The tool always provides an "Other" option for custom text input — no need to add it manually

**Choice questions** (questions with a numbered list of options): use `AskUserQuestion` as usual.

## Critical Rules

- **AskUserQuestion MUST always have 2-4 options.** When presenting a dynamic list (squads, skills, agents, etc.) as AskUserQuestion options and only 1 item exists, ALWAYS add a fallback option like "Cancel" or "Back to menu" to ensure the minimum of 2 options. If 0 items exist, skip AskUserQuestion entirely and inform the user directly.
- NEVER skip the onboarding if company.md is not configured
- ALWAYS load company context before running any squad
- ALWAYS present checkpoints to the user — never skip them
- ALWAYS save outputs to the squad's output directory
- When switching personas (inline execution), clearly indicate which agent is speaking
- When using subagents, inform the user that background work is happening
- After each pipeline run, update the squad's memories.md with key learnings