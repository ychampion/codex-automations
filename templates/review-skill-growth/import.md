# Review skill growth suggestions

Automation template for the Codex app.

> Infer learning opportunities from recent PRs and reviews and suggest next skills to deepen.

## Fast install into Codex app

- Run `npm run install:codex -- --template review-skill-growth` from the repo root.
- This installs a paused automation into your local Codex app profile so it appears in **Automations**.
- Add `--cwd /absolute/path/to/your/repo` if you want to attach a project during install.
- Weekly templates default to Monday unless you pass `--weekday` during install.

## Manual create in Codex
- **Projects:** Connect the target repo or project in Codex before enabling this automation.
- **Model:** gpt-5.1-codex
- **Reasoning:** high
- **Execution environment:** Local
- **Schedule:** Weekly
- **Time:** 14:00
- **Timezone:** Etc/UTC

## Prompt

Analyze recent pull requests and reviews to identify recurring skill gaps or growth opportunities for the team. Suggest specific topics to deepen next, supported by concrete examples from the work rather than generic advice.

## Branch targeting

If you want this automation to run on a specific branch, say so directly in the prompt before enabling it.

## Tags

- learning
- reviews
- growth
