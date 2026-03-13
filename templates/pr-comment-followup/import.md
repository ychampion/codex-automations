# PR comment follow-up

Automation template for the Codex app.

> Review fresh PR comments and suggest which ones need action, clarification, or closure.

## Fast install into Codex app

- Run `npm run install:codex -- --template pr-comment-followup` from the repo root.
- This installs a paused automation into your local Codex app profile so it appears in **Automations**.
- Add `--cwd /absolute/path/to/your/repo` if you want to attach a project during install.
- Weekly templates default to Monday unless you pass `--weekday` during install.

## Manual create in Codex
- **Projects:** Connect the target repo or project in Codex before enabling this automation.
- **Model:** gpt-5.1-codex
- **Reasoning:** high
- **Execution environment:** Local
- **Schedule:** Daily
- **Time:** 10:00
- **Timezone:** Etc/UTC

## Prompt

Review pull request comments and discussion threads since the last run. Identify unresolved feedback, questions waiting on maintainers, repeated review themes, and comments that can likely be closed. Return a prioritized action list with concise rationale.

## Branch targeting

If you want this automation to run on a specific branch, say so directly in the prompt before enabling it.

## Tags

- pr
- comments
- follow-up
