# Incident summary draft

Automation template for the Codex app.

> Convert recent incident signal into a concise incident summary and next-action draft.

## Fast install into Codex app

- Run `npm run install:codex -- --template incident-summary` from the repo root.
- This installs a paused automation into your local Codex app profile so it appears in **Automations**.
- Add `--cwd /absolute/path/to/your/repo` if you want to attach a project during install.
- Weekly templates default to Monday unless you pass `--weekday` during install.

## Manual create in Codex
- **Projects:** Connect the target repo or project in Codex before enabling this automation.
- **Model:** gpt-5.1-codex
- **Reasoning:** high
- **Execution environment:** Local
- **Schedule:** Daily
- **Time:** 18:30
- **Timezone:** Etc/UTC

## Prompt

Draft a concise incident summary from recent operational signals, issue threads, and code changes. Focus on user impact, likely timeline, plausible causes, mitigations already in motion, and the clearest next steps for maintainers.

## Branch targeting

If you want this automation to run on a specific branch, say so directly in the prompt before enabling it.

## Tags

- incident
- ops
- summary
