# Daily repo briefing

Automation template for the Codex app.

> Produce a daily briefing for maintainers covering movement, risk, and follow-ups.

## Fast install into Codex app

- Run `npm run install:codex -- --template repo-briefing` from the repo root.
- This installs a paused automation into your local Codex app profile so it appears in **Automations**.
- Add `--cwd /absolute/path/to/your/repo` if you want to attach a project during install.
- Weekly templates default to Monday unless you pass `--weekday` during install.

## Manual create in Codex
- **Projects:** Connect the target repo or project in Codex before enabling this automation.
- **Model:** gpt-5.1-codex
- **Reasoning:** medium
- **Execution environment:** Local
- **Schedule:** Daily
- **Time:** 08:30
- **Timezone:** Etc/UTC

## Prompt

Create a daily repo briefing that captures what changed since the last run, where active work is converging, which discussions need maintainer attention, and which repo areas look stalled. End with a short list of recommended actions for today.

## Branch targeting

If you want this automation to run on a specific branch, say so directly in the prompt before enabling it.

## Tags

- briefing
- maintainer
- daily
