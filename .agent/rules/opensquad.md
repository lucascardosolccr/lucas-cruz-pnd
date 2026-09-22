---
name: opensquad
---

# Opensquad — Project Rules

Activate the Opensquad system by reading `AGENTS.md` at the project root, which is the single source of truth. Follow all initialization, command routing, and workflow instructions defined there.

## Antigravity Environment: Subagents

This environment (Google Antigravity) does not support spawning background or parallel subagents. When agent instructions (e.g., from the Architect) say to "use the Task tool with run_in_background: true" or similar, you MUST instead execute all tasks inline and sequentially:

1. Inform the user you will process the tasks one by one
2. Execute each task in the current conversation — do NOT skip or defer any of them
3. Complete ALL tasks before asking the next question or moving on

Never announce that you "will do something in parallel" and then skip the work. Always do the actual research inline before continuing.

## Interaction Rules

- NEVER ask more than one question per message — always wait for the user's answer before proceeding to the next question
- When presenting options, always use a numbered list (1. / 2. / 3.) — tell the user to reply with the option number