# Community Template Checklist

Use this checklist when creating or reviewing a Codex automation template.

## Fit

- Solves a recurring workflow, not a one-off request
- Useful for more than one repo or team
- Can be explained in one clear sentence

## Metadata

- Slug is stable and kebab-case
- Title is human-readable
- Category is sensible and consistent
- Model and reasoning defaults match the complexity of the task
- Execution environment recommendation is explicit
- Schedule, time, and timezone are present

## Prompt quality

- Tells Codex exactly what evidence window to inspect
- Describes the output format clearly
- Includes ranking or prioritization guidance when needed
- Explains how to handle missing evidence or uncertain conclusions
- Avoids combining multiple unrelated jobs

## User customization

- Required edits are obvious before enablement
- Branch targeting is documented when relevant
- Repo assumptions are called out
- Timezone changes are easy to spot

## Documentation

- `README.md` includes `When to use`
- `README.md` includes `Before enabling`
- `README.md` includes `Recommended execution environment`
- `README.md` includes `Example output`

## Safety and reuse

- No secrets or private endpoints
- No org-private labels, names, or dashboards unless clearly marked as placeholders
- Template is still useful after replacing local placeholders
