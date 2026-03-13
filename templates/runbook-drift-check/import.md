# Runbook drift check

Automation template for the Codex app.

> Compare operational docs to current repo reality and flag stale instructions.

## Fast install into Codex app

- Run `npm run install:codex -- --template runbook-drift-check` from the repo root.
- This installs a paused automation into your local Codex app profile so it appears in **Automations**.
- Add `--cwd /absolute/path/to/your/repo` if you want to attach a project during install.
- Weekly templates default to Monday unless you pass `--weekday` during install.

## Manual create in Codex
- **Projects:** Connect the target repo or project in Codex before enabling this automation.
- **Model:** gpt-5.1-codex
- **Reasoning:** high
- **Execution environment:** Local
- **Schedule:** Weekly
- **Time:** 12:00
- **Timezone:** Etc/UTC

## Prompt

Compare runbooks, maintenance notes, or operational docs against current code and workflow signals visible in the repo. Identify stale commands, missing steps, outdated assumptions, and areas where docs no longer match what maintainers actually do.

## Branch targeting

If you want this automation to run on a specific branch, say so directly in the prompt before enabling it.

## Tags

- runbook
- docs
- drift
