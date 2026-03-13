# Regression early warning

Automation template for the Codex app.

> Compare recent changes against benchmark or CI signal to flag likely regressions early.

## Fast install into Codex app

- Run `npm run install:codex -- --template regression-early-warning` from the repo root.
- This installs a paused automation into your local Codex app profile so it appears in **Automations**.
- Add `--cwd /absolute/path/to/your/repo` if you want to attach a project during install.
- Weekly templates default to Monday unless you pass `--weekday` during install.

## Manual create in Codex
- **Projects:** Connect the target repo or project in Codex before enabling this automation.
- **Model:** gpt-5.1-codex
- **Reasoning:** high
- **Execution environment:** Worktree
- **Schedule:** Daily
- **Time:** 15:30
- **Timezone:** Etc/UTC

## Prompt

Compare recent repo changes against benchmarks, traces, or CI outcomes available in the project context. Flag any early regression signals in correctness, performance, or reliability, and explain whether each signal looks real, noisy, or inconclusive.

## Branch targeting

If you want this automation to run on a specific branch, say so directly in the prompt before enabling it.

## Tags

- regression
- benchmarks
- warning
