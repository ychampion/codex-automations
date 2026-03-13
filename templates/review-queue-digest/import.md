# Review queue digest

Automation template for the Codex app.

> Summarize the current review queue by urgency, size, and likely reviewer bottlenecks.

## Fast install into Codex app

- Run `npm run install:codex -- --template review-queue-digest` from the repo root.
- This installs a paused automation into your local Codex app profile so it appears in **Automations**.
- Add `--cwd /absolute/path/to/your/repo` if you want to attach a project during install.
- Weekly templates default to Monday unless you pass `--weekday` during install.

## Manual create in Codex
- **Projects:** Connect the target repo or project in Codex before enabling this automation.
- **Model:** gpt-5.1-codex-mini
- **Reasoning:** medium
- **Execution environment:** Local
- **Schedule:** Daily
- **Time:** 11:00
- **Timezone:** Etc/UTC

## Prompt

Summarize the open review queue. Group pull requests by urgency, size, and blocked status, then identify where reviewer attention is missing. Suggest which PRs should be reviewed first and call out any queue patterns that could slow the team down.

## Branch targeting

If you want this automation to run on a specific branch, say so directly in the prompt before enabling it.

## Tags

- review
- queue
- digest
