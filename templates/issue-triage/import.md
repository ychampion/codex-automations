# New issue triage

Automation template for the Codex app.

> Classify newly opened issues and suggest likely priority, owner type, and next action.

## Fast install into Codex app

- Run `npm run install:codex -- --template issue-triage` from the repo root.
- This installs a paused automation into your local Codex app profile so it appears in **Automations**.
- Add `--cwd /absolute/path/to/your/repo` if you want to attach a project during install.
- Weekly templates default to Monday unless you pass `--weekday` during install.

## Manual create in Codex
- **Projects:** Connect the target repo or project in Codex before enabling this automation.
- **Model:** gpt-5.1-codex
- **Reasoning:** high
- **Execution environment:** Local
- **Schedule:** Daily
- **Time:** 09:30
- **Timezone:** Etc/UTC

## Prompt

Triage newly opened issues since the last run. For each issue, suggest its likely severity, product area, owner type, and immediate next step. Group duplicates or weak reports when relevant, and surface anything that looks urgent or under-described.

## Branch targeting

If you want this automation to run on a specific branch, say so directly in the prompt before enabling it.

## Tags

- issues
- triage
- backlog
