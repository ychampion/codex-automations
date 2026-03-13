# Duplicate issue scan

Automation template for the Codex app.

> Find likely duplicate issue clusters and propose consolidation actions.

## Fast install into Codex app

- Run `npm run install:codex -- --template duplicate-issue-scan` from the repo root.
- This installs a paused automation into your local Codex app profile so it appears in **Automations**.
- Add `--cwd /absolute/path/to/your/repo` if you want to attach a project during install.
- Weekly templates default to Monday unless you pass `--weekday` during install.

## Manual create in Codex
- **Projects:** Connect the target repo or project in Codex before enabling this automation.
- **Model:** gpt-5.1-codex
- **Reasoning:** high
- **Execution environment:** Local
- **Schedule:** Weekly
- **Time:** 11:30
- **Timezone:** Etc/UTC

## Prompt

Scan recent and open issues for likely duplicates or near-duplicates. Group similar reports, explain why they appear related, and suggest which issue should be the canonical thread. Flag any cases where separate reports reveal a broader systemic problem.

## Branch targeting

If you want this automation to run on a specific branch, say so directly in the prompt before enabling it.

## Tags

- duplicates
- issues
- consolidation
