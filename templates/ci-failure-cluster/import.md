# CI failure cluster

Automation template for the Codex app.

> Group recent CI failures by likely root cause and propose focused follow-up.

## Fast install into Codex app

- Run `npm run install:codex -- --template ci-failure-cluster` from the repo root.
- This installs a paused automation into your local Codex app profile so it appears in **Automations**.
- Add `--cwd /absolute/path/to/your/repo` if you want to attach a project during install.
- Weekly templates default to Monday unless you pass `--weekday` during install.

## Manual create in Codex
- **Projects:** Connect the target repo or project in Codex before enabling this automation.
- **Model:** gpt-5.1-codex
- **Reasoning:** high
- **Execution environment:** Worktree
- **Schedule:** Daily
- **Time:** 10:30
- **Timezone:** Etc/UTC

## Prompt

Review recent CI failures and flaky runs. Group them by likely root cause, impacted area, and repeat frequency. Suggest the smallest next actions that would reduce noise or restore confidence, and separate one-off incidents from recurring failure modes.

## Branch targeting

If you want this automation to run on a specific branch, say so directly in the prompt before enabling it.

## Tags

- ci
- failures
- quality
