# Contributing

Thanks for helping grow the Codex automation template library.

This repository is for reusable **Codex app automation templates** that people can copy from GitHub into Codex and save as recurring automations.

## What belongs here

- Recurring workflows that are useful across many repos or teams
- Templates that are easy to customize with small prompt edits
- Templates that map cleanly to the Codex automation UI:
  - title
  - projects hint
  - model
  - reasoning level
  - execution environment
  - schedule
  - time
  - timezone
  - prompt

## What does not belong here

- One-off prompts that are not automation-shaped
- Templates that require private internal tooling with no fallback guidance
- Repo-specific prompts with hardcoded URLs, secrets, tokens, or usernames
- Templates that only make sense for a single company without adaptation notes

## Template structure

Each template lives in its own directory under `templates/<slug>/`.

Required files:

- `template.json` - metadata and Codex field defaults
- `prompt.md` - the prompt body users paste into Codex
- `README.md` - usage and customization guide

Required `template.json` fields:

- `slug`
- `title`
- `summary`
- `category`
- `icon`
- `projects_hint`
- `default_model`
- `default_reasoning`
- `recommended_execution_environment`
- `schedule`
- `time`
- `timezone`
- `branch_prompt_hint`
- `tags`

## Authoring rules

- Keep slugs short, kebab-case, and stable
- Write titles in plain English, not internal shorthand
- Keep summaries to one sentence focused on the recurring job
- Use categories already present in the repo unless a new one is clearly justified
- Prefer prompts that work on any connected repo with minimal edits
- Mark required edits clearly in both `prompt.md` and the template `README.md`
- Never include secrets, private endpoints, or personal data
- Avoid hardcoding branch names unless the template is explicitly branch-specific
- Keep prompt instructions deterministic and outcome-oriented

## Prompt writing guidance

Good automation prompts usually include:

- the data window to inspect
- the exact deliverable format
- what to prioritize
- when to ask for links, owners, labels, or next steps
- what to do when evidence is incomplete

Good example characteristics:

- "Summarize CI failures from the last completed CI window, group by likely root cause, and suggest the smallest next fix."
- "Review merged PRs since the last run and draft release notes with links when available."

Avoid:

- vague goals like "look at the repo and help"
- prompts that require hidden context not available in Codex
- prompts that mix several unrelated jobs into one run

## Template README requirements

Every template `README.md` must include these sections:

- `When to use`
- `Before enabling`
- `Recommended execution environment`
- `Example output`

Recommended additions:

- branch-specific setup notes
- cost/speed guidance for model choice
- expected schedule suggestions

## Submission checklist

Before opening a PR, make sure your change does all of the following:

- Adds or updates the required template files
- Uses the required metadata fields
- Keeps prompts substantive and reusable
- Explains any placeholders the user must customize
- Avoids secrets and org-private details
- Runs the repo checks successfully

## Validation

Run these commands before submitting:

```bash
npm test
npm run build
```

If you are only proposing a new template idea and not implementing it yet, open a template request issue instead of a PR.

## Pull request expectations

PRs are easiest to review when they:

- explain the recurring use case
- explain who benefits from the template
- mention what users need to edit before enabling it
- note whether `Local` or `Worktree` is the better execution environment
- include a short example of the expected output

## Naming conventions

- Direct, descriptive slug names: `ci-failure-cluster`, not `ci-helper-v2`
- Category names should stay reader-friendly
- Keep icons simple and consistent with the template theme

## Community standards

- Be practical over clever
- Prefer low-friction defaults
- Optimize for reuse, not novelty
- Document assumptions explicitly

If you are unsure whether a new template belongs here, open a template request issue first.
