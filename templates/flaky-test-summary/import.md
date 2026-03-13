# Flaky test summary

Automation template for the Codex app.

> Identify likely flaky tests and turn them into a concise maintainer summary.

## Fast install into Codex app

- Run `npm run install:codex -- --template flaky-test-summary` from the repo root.
- This installs a paused automation into your local Codex app profile so it appears in **Automations**.
- Add `--cwd /absolute/path/to/your/repo` if you want to attach a project during install.
- Weekly templates default to Monday unless you pass `--weekday` during install.

## Manual create in Codex
- **Projects:** Connect the target repo or project in Codex before enabling this automation.
- **Model:** gpt-5.1-codex-mini
- **Reasoning:** medium
- **Execution environment:** Worktree
- **Schedule:** Daily
- **Time:** 11:30
- **Timezone:** Etc/UTC

## Prompt

Summarize likely flaky tests from the latest CI window. Call out patterns such as environment sensitivity, timing issues, platform skew, or brittle snapshots. Recommend which flaky tests should be quarantined, fixed first, or monitored further.

## Branch targeting

If you want this automation to run on a specific branch, say so directly in the prompt before enabling it.

## Tags

- tests
- flake
- ci
