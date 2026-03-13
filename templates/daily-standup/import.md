# Daily standup recap

Automation template for the Codex app.

> Summarize yesterday's git activity, shipped changes, and likely blockers for standup.

## Fast install into Codex app

- Run `npm run install:codex -- --template daily-standup` from the repo root.
- This installs a paused automation into your local Codex app profile so it appears in **Automations**.
- Add `--cwd /absolute/path/to/your/repo` if you want to attach a project during install.
- Weekly templates default to Monday unless you pass `--weekday` during install.

## Manual create in Codex
- **Projects:** Connect the target repo or project in Codex before enabling this automation.
- **Model:** gpt-5.1-codex-mini
- **Reasoning:** medium
- **Execution environment:** Local
- **Schedule:** Daily
- **Time:** 09:00
- **Timezone:** Etc/UTC

## Prompt

Summarize the last working day in this repo for a team standup. Highlight merged work, notable commits, review activity, open blockers, and anything that may need follow-up today. Keep it concise, factual, and easy to read aloud.

## Branch targeting

If you want this automation to run on a specific branch, say so directly in the prompt before enabling it.

## Tags

- standup
- summary
