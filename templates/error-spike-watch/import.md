# Error spike watch

Automation template for the Codex app.

> Watch for sudden error spikes and connect them to recent code or release activity.

## Fast install into Codex app

- Run `npm run install:codex -- --template error-spike-watch` from the repo root.
- This installs a paused automation into your local Codex app profile so it appears in **Automations**.
- Add `--cwd /absolute/path/to/your/repo` if you want to attach a project during install.
- Weekly templates default to Monday unless you pass `--weekday` during install.

## Manual create in Codex
- **Projects:** Connect the target repo or project in Codex before enabling this automation.
- **Model:** gpt-5.1-codex
- **Reasoning:** high
- **Execution environment:** Local
- **Schedule:** Daily
- **Time:** 13:30
- **Timezone:** Etc/UTC

## Prompt

Look for sudden increases in errors, failures, or operational complaints relative to recent project activity. Connect possible spikes to recent code changes, releases, or environment shifts, and separate strong evidence from weak correlation.

## Branch targeting

If you want this automation to run on a specific branch, say so directly in the prompt before enabling it.

## Tags

- errors
- spike
- monitoring
