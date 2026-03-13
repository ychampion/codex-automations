# Sentry issue digest

Automation template for the Codex app.

> Summarize new Sentry issues into an action-oriented maintainer digest.

## Fast install into Codex app

- Run `npm run install:codex -- --template sentry-issue-digest` from the repo root.
- This installs a paused automation into your local Codex app profile so it appears in **Automations**.
- Add `--cwd /absolute/path/to/your/repo` if you want to attach a project during install.
- Weekly templates default to Monday unless you pass `--weekday` during install.

## Manual create in Codex
- **Projects:** Connect the target repo or project in Codex before enabling this automation.
- **Model:** gpt-5.1-codex
- **Reasoning:** high
- **Execution environment:** Local
- **Schedule:** Daily
- **Time:** 09:15
- **Timezone:** Etc/UTC

## Prompt

Summarize new or regressed Sentry issues since the last run. Group errors by likely shared cause, affected feature, and urgency. Recommend which issues deserve immediate investigation, which can wait, and which look like duplicates or known noise.

## Branch targeting

If you want this automation to run on a specific branch, say so directly in the prompt before enabling it.

## Tags

- sentry
- ops
- errors
