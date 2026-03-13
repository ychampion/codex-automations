# Stale issues review

Automation template for the Codex app.

> Review old issues and recommend which to close, refresh, or escalate.

## Fast install into Codex app

- Run `npm run install:codex -- --template stale-issues` from the repo root.
- This installs a paused automation into your local Codex app profile so it appears in **Automations**.
- Add `--cwd /absolute/path/to/your/repo` if you want to attach a project during install.
- Weekly templates default to Monday unless you pass `--weekday` during install.

## Manual create in Codex
- **Projects:** Connect the target repo or project in Codex before enabling this automation.
- **Model:** gpt-5.1-codex-mini
- **Reasoning:** medium
- **Execution environment:** Local
- **Schedule:** Weekly
- **Time:** 13:00
- **Timezone:** Etc/UTC

## Prompt

Review older open issues that have gone quiet. Recommend which should be closed, refreshed with a request for more detail, linked to newer work, or escalated because they still look important. Keep the guidance practical and maintainer-friendly.

## Branch targeting

If you want this automation to run on a specific branch, say so directly in the prompt before enabling it.

## Tags

- stale
- issues
- cleanup
