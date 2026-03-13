# Dependency drift check

Automation template for the Codex app.

> Detect dependency or SDK drift and suggest a minimal alignment plan.

## Fast install into Codex app

- Run `npm run install:codex -- --template dependency-drift` from the repo root.
- This installs a paused automation into your local Codex app profile so it appears in **Automations**.
- Add `--cwd /absolute/path/to/your/repo` if you want to attach a project during install.
- Weekly templates default to Monday unless you pass `--weekday` during install.

## Manual create in Codex
- **Projects:** Connect the target repo or project in Codex before enabling this automation.
- **Model:** gpt-5.1-codex
- **Reasoning:** medium
- **Execution environment:** Worktree
- **Schedule:** Weekly
- **Time:** 10:00
- **Timezone:** Etc/UTC

## Prompt

Detect dependency, SDK, or tooling drift in this repository. Highlight packages or build tools that are materially behind, inconsistent, or likely to cause support issues. Suggest a minimal alignment plan instead of a broad upgrade wave.

## Branch targeting

If you want this automation to run on a specific branch, say so directly in the prompt before enabling it.

## Tags

- dependencies
- sdk
- drift
