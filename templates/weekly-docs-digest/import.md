# Weekly docs digest

Automation template for the Codex app.

> Summarize docs changes, gaps, and recommended next documentation investments.

## Fast install into Codex app

- Run `npm run install:codex -- --template weekly-docs-digest` from the repo root.
- This installs a paused automation into your local Codex app profile so it appears in **Automations**.
- Add `--cwd /absolute/path/to/your/repo` if you want to attach a project during install.
- Weekly templates default to Monday unless you pass `--weekday` during install.

## Manual create in Codex
- **Projects:** Connect the target repo or project in Codex before enabling this automation.
- **Model:** gpt-5.1-codex-mini
- **Reasoning:** medium
- **Execution environment:** Local
- **Schedule:** Weekly
- **Time:** 18:00
- **Timezone:** Etc/UTC

## Prompt

Create a weekly digest of documentation changes, open gaps, and repeated confusion points inferred from recent repo activity. Highlight which docs improved, which still need attention, and where a small writing pass would remove recurring friction.

## Branch targeting

If you want this automation to run on a specific branch, say so directly in the prompt before enabling it.

## Tags

- docs
- digest
- weekly
