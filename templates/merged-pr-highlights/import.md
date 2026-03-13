# Merged PR highlights

Automation template for the Codex app.

> Extract the most meaningful merged PRs and explain why they matter.

## Fast install into Codex app

- Run `npm run install:codex -- --template merged-pr-highlights` from the repo root.
- This installs a paused automation into your local Codex app profile so it appears in **Automations**.
- Add `--cwd /absolute/path/to/your/repo` if you want to attach a project during install.
- Weekly templates default to Monday unless you pass `--weekday` during install.

## Manual create in Codex
- **Projects:** Connect the target repo or project in Codex before enabling this automation.
- **Model:** gpt-5.1-codex-mini
- **Reasoning:** medium
- **Execution environment:** Local
- **Schedule:** Daily
- **Time:** 17:00
- **Timezone:** Etc/UTC

## Prompt

Review recently merged pull requests and highlight the changes that most affect product behavior, engineering velocity, or operational reliability. Prefer signal over volume and explain why each highlighted PR matters to the team.

## Branch targeting

If you want this automation to run on a specific branch, say so directly in the prompt before enabling it.

## Tags

- merged-prs
- highlights
- summary
