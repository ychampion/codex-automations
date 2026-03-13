# Release notes draft

Automation template for the Codex app.

> Draft release notes from merged PRs and user-visible changes during the last release window.

## Fast install into Codex app

- Run `npm run install:codex -- --template release-notes-draft` from the repo root.
- This installs a paused automation into your local Codex app profile so it appears in **Automations**.
- Add `--cwd /absolute/path/to/your/repo` if you want to attach a project during install.
- Weekly templates default to Monday unless you pass `--weekday` during install.

## Manual create in Codex
- **Projects:** Connect the target repo or project in Codex before enabling this automation.
- **Model:** gpt-5.1-codex
- **Reasoning:** medium
- **Execution environment:** Local
- **Schedule:** Weekly
- **Time:** 15:00
- **Timezone:** Etc/UTC

## Prompt

Draft release notes from merged pull requests and visible repo changes since the last release window. Group items into features, fixes, maintenance, and known follow-ups. Include links or references when available and keep the language user-facing.

## Branch targeting

If you want this automation to run on a specific branch, say so directly in the prompt before enabling it.

## Tags

- release
- notes
- merged-prs
