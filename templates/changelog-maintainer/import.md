# Changelog maintainer draft

Automation template for the Codex app.

> Turn recent work into changelog-ready maintainer notes with grouped entries.

## Fast install into Codex app

- Run `npm run install:codex -- --template changelog-maintainer` from the repo root.
- This installs a paused automation into your local Codex app profile so it appears in **Automations**.
- Add `--cwd /absolute/path/to/your/repo` if you want to attach a project during install.
- Weekly templates default to Monday unless you pass `--weekday` during install.

## Manual create in Codex
- **Projects:** Connect the target repo or project in Codex before enabling this automation.
- **Model:** gpt-5.1-codex-mini
- **Reasoning:** medium
- **Execution environment:** Local
- **Schedule:** Weekly
- **Time:** 17:30
- **Timezone:** Etc/UTC

## Prompt

Draft a maintainer-oriented changelog from recent merged work. Group entries into features, fixes, internal maintenance, and noteworthy breaking or operational changes. Keep entries brief but specific enough that a maintainer can quickly polish and publish them.

## Branch targeting

If you want this automation to run on a specific branch, say so directly in the prompt before enabling it.

## Tags

- changelog
- release
- docs
