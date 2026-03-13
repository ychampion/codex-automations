# AGENTS.md refresh

Automation template for the Codex app.

> Update working instructions by surfacing newly repeated workflows and commands.

## Fast install into Codex app

- Run `npm run install:codex -- --template agents-md-refresh` from the repo root.
- This installs a paused automation into your local Codex app profile so it appears in **Automations**.
- Add `--cwd /absolute/path/to/your/repo` if you want to attach a project during install.
- Weekly templates default to Monday unless you pass `--weekday` during install.

## Manual create in Codex
- **Projects:** Connect the target repo or project in Codex before enabling this automation.
- **Model:** gpt-5.1-codex
- **Reasoning:** medium
- **Execution environment:** Local
- **Schedule:** Weekly
- **Time:** 16:30
- **Timezone:** Etc/UTC

## Prompt

Review recent repo work patterns, common commands, and repeated troubleshooting steps. Suggest practical updates that would improve AGENTS.md or adjacent contributor guidance. Focus on workflows that are repeatedly rediscovered or easy to forget.

## Branch targeting

If you want this automation to run on a specific branch, say so directly in the prompt before enabling it.

## Tags

- agents-md
- docs
- workflow
