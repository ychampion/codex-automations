# Weekly engineering update

Automation template for the Codex app.

> Turn the week's engineering activity into a maintainer-ready written update.

## Fast install into Codex app

- Run `npm run install:codex -- --template weekly-engineering-update` from the repo root.
- This installs a paused automation into your local Codex app profile so it appears in **Automations**.
- Add `--cwd /absolute/path/to/your/repo` if you want to attach a project during install.
- Weekly templates default to Monday unless you pass `--weekday` during install.

## Manual create in Codex
- **Projects:** Connect the target repo or project in Codex before enabling this automation.
- **Model:** gpt-5.1-codex
- **Reasoning:** medium
- **Execution environment:** Local
- **Schedule:** Weekly
- **Time:** 16:00
- **Timezone:** Etc/UTC

## Prompt

Review the last 7 days of activity across commits, merged PRs, issues, and review notes. Draft a weekly engineering update with sections for wins, risks, delayed work, and next focus areas. Prefer concrete examples over vague summaries.

## Branch targeting

If you want this automation to run on a specific branch, say so directly in the prompt before enabling it.

## Tags

- weekly
- status
- update
