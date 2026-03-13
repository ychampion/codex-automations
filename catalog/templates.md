# Template Catalog

Use these templates to create Codex automations from GitHub-hosted source files.

## Standups & Summaries

- [repo-briefing](https://github.com/ychampion/codex-automations/tree/main/templates/repo-briefing) - Produce a daily briefing for maintainers covering movement, risk, and follow-ups. (Daily at 08:30, local) | [raw prompt](https://raw.githubusercontent.com/ychampion/codex-automations/main/templates/repo-briefing/prompt.md)
- [daily-standup](https://github.com/ychampion/codex-automations/tree/main/templates/daily-standup) - Summarize yesterday's git activity, shipped changes, and likely blockers for standup. (Daily at 09:00, local) | [raw prompt](https://raw.githubusercontent.com/ychampion/codex-automations/main/templates/daily-standup/prompt.md)
- [release-notes-draft](https://github.com/ychampion/codex-automations/tree/main/templates/release-notes-draft) - Draft release notes from merged PRs and user-visible changes during the last release window. (Weekly at 15:00, local) | [raw prompt](https://raw.githubusercontent.com/ychampion/codex-automations/main/templates/release-notes-draft/prompt.md)
- [weekly-engineering-update](https://github.com/ychampion/codex-automations/tree/main/templates/weekly-engineering-update) - Turn the week's engineering activity into a maintainer-ready written update. (Weekly at 16:00, local) | [raw prompt](https://raw.githubusercontent.com/ychampion/codex-automations/main/templates/weekly-engineering-update/prompt.md)

## PRs & Reviews

- [merged-pr-highlights](https://github.com/ychampion/codex-automations/tree/main/templates/merged-pr-highlights) - Extract the most meaningful merged PRs and explain why they matter. (Daily at 17:00, local) | [raw prompt](https://raw.githubusercontent.com/ychampion/codex-automations/main/templates/merged-pr-highlights/prompt.md)
- [pr-comment-followup](https://github.com/ychampion/codex-automations/tree/main/templates/pr-comment-followup) - Review fresh PR comments and suggest which ones need action, clarification, or closure. (Daily at 10:00, local) | [raw prompt](https://raw.githubusercontent.com/ychampion/codex-automations/main/templates/pr-comment-followup/prompt.md)
- [review-queue-digest](https://github.com/ychampion/codex-automations/tree/main/templates/review-queue-digest) - Summarize the current review queue by urgency, size, and likely reviewer bottlenecks. (Daily at 11:00, local) | [raw prompt](https://raw.githubusercontent.com/ychampion/codex-automations/main/templates/review-queue-digest/prompt.md)
- [review-skill-growth](https://github.com/ychampion/codex-automations/tree/main/templates/review-skill-growth) - Infer learning opportunities from recent PRs and reviews and suggest next skills to deepen. (Weekly at 14:00, local) | [raw prompt](https://raw.githubusercontent.com/ychampion/codex-automations/main/templates/review-skill-growth/prompt.md)

## Issues & Backlog

- [priority-suggestion](https://github.com/ychampion/codex-automations/tree/main/templates/priority-suggestion) - Suggest a refreshed backlog order based on urgency, impact, and repo momentum. (Weekly at 12:30, local) | [raw prompt](https://raw.githubusercontent.com/ychampion/codex-automations/main/templates/priority-suggestion/prompt.md)
- [duplicate-issue-scan](https://github.com/ychampion/codex-automations/tree/main/templates/duplicate-issue-scan) - Find likely duplicate issue clusters and propose consolidation actions. (Weekly at 11:30, local) | [raw prompt](https://raw.githubusercontent.com/ychampion/codex-automations/main/templates/duplicate-issue-scan/prompt.md)
- [issue-triage](https://github.com/ychampion/codex-automations/tree/main/templates/issue-triage) - Classify newly opened issues and suggest likely priority, owner type, and next action. (Daily at 09:30, local) | [raw prompt](https://raw.githubusercontent.com/ychampion/codex-automations/main/templates/issue-triage/prompt.md)
- [stale-issues](https://github.com/ychampion/codex-automations/tree/main/templates/stale-issues) - Review old issues and recommend which to close, refresh, or escalate. (Weekly at 13:00, local) | [raw prompt](https://raw.githubusercontent.com/ychampion/codex-automations/main/templates/stale-issues/prompt.md)

## CI & Quality

- [ci-failure-cluster](https://github.com/ychampion/codex-automations/tree/main/templates/ci-failure-cluster) - Group recent CI failures by likely root cause and propose focused follow-up. (Daily at 10:30, worktree) | [raw prompt](https://raw.githubusercontent.com/ychampion/codex-automations/main/templates/ci-failure-cluster/prompt.md)
- [dependency-drift](https://github.com/ychampion/codex-automations/tree/main/templates/dependency-drift) - Detect dependency or SDK drift and suggest a minimal alignment plan. (Weekly at 10:00, worktree) | [raw prompt](https://raw.githubusercontent.com/ychampion/codex-automations/main/templates/dependency-drift/prompt.md)
- [flaky-test-summary](https://github.com/ychampion/codex-automations/tree/main/templates/flaky-test-summary) - Identify likely flaky tests and turn them into a concise maintainer summary. (Daily at 11:30, worktree) | [raw prompt](https://raw.githubusercontent.com/ychampion/codex-automations/main/templates/flaky-test-summary/prompt.md)
- [regression-early-warning](https://github.com/ychampion/codex-automations/tree/main/templates/regression-early-warning) - Compare recent changes against benchmark or CI signal to flag likely regressions early. (Daily at 15:30, worktree) | [raw prompt](https://raw.githubusercontent.com/ychampion/codex-automations/main/templates/regression-early-warning/prompt.md)

## Docs & Process

- [agents-md-refresh](https://github.com/ychampion/codex-automations/tree/main/templates/agents-md-refresh) - Update working instructions by surfacing newly repeated workflows and commands. (Weekly at 16:30, local) | [raw prompt](https://raw.githubusercontent.com/ychampion/codex-automations/main/templates/agents-md-refresh/prompt.md)
- [changelog-maintainer](https://github.com/ychampion/codex-automations/tree/main/templates/changelog-maintainer) - Turn recent work into changelog-ready maintainer notes with grouped entries. (Weekly at 17:30, local) | [raw prompt](https://raw.githubusercontent.com/ychampion/codex-automations/main/templates/changelog-maintainer/prompt.md)
- [runbook-drift-check](https://github.com/ychampion/codex-automations/tree/main/templates/runbook-drift-check) - Compare operational docs to current repo reality and flag stale instructions. (Weekly at 12:00, local) | [raw prompt](https://raw.githubusercontent.com/ychampion/codex-automations/main/templates/runbook-drift-check/prompt.md)
- [weekly-docs-digest](https://github.com/ychampion/codex-automations/tree/main/templates/weekly-docs-digest) - Summarize docs changes, gaps, and recommended next documentation investments. (Weekly at 18:00, local) | [raw prompt](https://raw.githubusercontent.com/ychampion/codex-automations/main/templates/weekly-docs-digest/prompt.md)

## Ops & Support

- [customer-bug-escalation](https://github.com/ychampion/codex-automations/tree/main/templates/customer-bug-escalation) - Prepare a maintainer-facing escalation brief for customer-reported bugs. (Daily at 14:30, local) | [raw prompt](https://raw.githubusercontent.com/ychampion/codex-automations/main/templates/customer-bug-escalation/prompt.md)
- [error-spike-watch](https://github.com/ychampion/codex-automations/tree/main/templates/error-spike-watch) - Watch for sudden error spikes and connect them to recent code or release activity. (Daily at 13:30, local) | [raw prompt](https://raw.githubusercontent.com/ychampion/codex-automations/main/templates/error-spike-watch/prompt.md)
- [incident-summary](https://github.com/ychampion/codex-automations/tree/main/templates/incident-summary) - Convert recent incident signal into a concise incident summary and next-action draft. (Daily at 18:30, local) | [raw prompt](https://raw.githubusercontent.com/ychampion/codex-automations/main/templates/incident-summary/prompt.md)
- [sentry-issue-digest](https://github.com/ychampion/codex-automations/tree/main/templates/sentry-issue-digest) - Summarize new Sentry issues into an action-oriented maintainer digest. (Daily at 09:15, local) | [raw prompt](https://raw.githubusercontent.com/ychampion/codex-automations/main/templates/sentry-issue-digest/prompt.md)
