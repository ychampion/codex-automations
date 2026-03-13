# Customer bug escalation prep

Automation template for the Codex app.

> Prepare a maintainer-facing escalation brief for customer-reported bugs.

## Fast install into Codex app

- Run `npm run install:codex -- --template customer-bug-escalation` from the repo root.
- This installs a paused automation into your local Codex app profile so it appears in **Automations**.
- Add `--cwd /absolute/path/to/your/repo` if you want to attach a project during install.
- Weekly templates default to Monday unless you pass `--weekday` during install.

## Manual create in Codex
- **Projects:** Connect the target repo or project in Codex before enabling this automation.
- **Model:** gpt-5.1-codex
- **Reasoning:** medium
- **Execution environment:** Local
- **Schedule:** Daily
- **Time:** 14:30
- **Timezone:** Etc/UTC

## Prompt

Review recent customer- or user-reported bug issues and prepare an escalation brief. Summarize the strongest reproduction clues, likely affected area, severity, gaps in evidence, and the fastest next investigation step maintainers should take.

## Branch targeting

If you want this automation to run on a specific branch, say so directly in the prompt before enabling it.

## Tags

- support
- bug
- escalation
