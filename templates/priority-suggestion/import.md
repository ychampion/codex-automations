# Backlog priority suggestions

Automation template for the Codex app.

> Suggest a refreshed backlog order based on urgency, impact, and repo momentum.

## Fast install into Codex app

- Run `npm run install:codex -- --template priority-suggestion` from the repo root.
- This installs a paused automation into your local Codex app profile so it appears in **Automations**.
- Add `--cwd /absolute/path/to/your/repo` if you want to attach a project during install.
- Weekly templates default to Monday unless you pass `--weekday` during install.

## Manual create in Codex
- **Projects:** Connect the target repo or project in Codex before enabling this automation.
- **Model:** gpt-5.1-codex
- **Reasoning:** high
- **Execution environment:** Local
- **Schedule:** Weekly
- **Time:** 12:30
- **Timezone:** Etc/UTC

## Prompt

Review the active backlog and suggest how priority should shift based on current repo activity, user pain, operational risk, and strategic momentum. Prefer explicit tradeoffs and highlight the top items that deserve immediate attention.

## Branch targeting

If you want this automation to run on a specific branch, say so directly in the prompt before enabling it.

## Tags

- priority
- backlog
- planning
