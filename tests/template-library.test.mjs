import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, mkdir, readdir, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

import {
  TEMPLATE_REQUIRED_FIELDS,
  buildLibrary,
  loadTemplates,
  renderManualImportGuide,
  renderCatalogMarkdown,
} from '../src/library.mjs';
import {
  buildDefaultRRule,
  installTemplatesToCodex,
  serializeAutomationToml,
} from '../src/codex-app.mjs';

test('loadTemplates reads template metadata and prompt content', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'codex-templates-'));
  const templateDir = path.join(root, 'daily-standup');

  await mkdir(templateDir, { recursive: true });
  await writeFile(
    path.join(templateDir, 'template.json'),
    JSON.stringify(
      {
        slug: 'daily-standup',
        title: 'Daily standup recap',
        summary: 'Summarize recent activity for standup.',
        category: 'Standups & Summaries',
        icon: 'message',
        projects_hint: 'Repo connected in Codex',
        default_model: 'gpt-5.1-codex-mini',
        default_reasoning: 'medium',
        recommended_execution_environment: 'local',
        schedule: 'Daily',
        time: '09:00',
        timezone: 'Etc/UTC',
        branch_prompt_hint: 'If you want this to run on a specific branch, add it to the prompt.',
        tags: ['standup', 'summary'],
      },
      null,
      2,
    ),
  );
  await writeFile(
    path.join(templateDir, 'prompt.md'),
    'Summarize yesterday\'s work, highlight notable changes, and produce a short standup-ready recap.',
  );

  const templates = await loadTemplates(root);
  assert.equal(templates.length, 1);
  assert.equal(templates[0].slug, 'daily-standup');
  assert.equal(
    templates[0].prompt,
    'Summarize yesterday\'s work, highlight notable changes, and produce a short standup-ready recap.',
  );
});

test('loadTemplates rejects missing required metadata fields', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'codex-templates-'));
  const templateDir = path.join(root, 'broken-template');

  await mkdir(templateDir, { recursive: true });
  await writeFile(
    path.join(templateDir, 'template.json'),
    JSON.stringify({ slug: 'broken-template', title: 'Broken template' }, null, 2),
  );
  await writeFile(path.join(templateDir, 'prompt.md'), 'Broken');

  await assert.rejects(loadTemplates(root), /missing required field/i);
});

test('renderManualImportGuide includes Codex app fields and prompt', async () => {
  const guide = renderManualImportGuide({
    slug: 'daily-standup',
    title: 'Daily standup recap',
    summary: 'Summarize recent activity for standup.',
    category: 'Standups & Summaries',
    icon: 'message',
    projects_hint: 'Repo connected in Codex',
    default_model: 'gpt-5.1-codex-mini',
    default_reasoning: 'medium',
    recommended_execution_environment: 'local',
    schedule: 'Daily',
    time: '09:00',
    timezone: 'Etc/UTC',
    branch_prompt_hint: 'Optional branch text.',
    tags: ['standup', 'summary'],
    prompt: 'Summarize yesterday.',
  });

  assert.match(guide, /Fast install into Codex app/i);
  assert.match(guide, /npm run install:codex/i);
  assert.match(guide, /Execution environment/i);
  assert.match(guide, /Daily/i);
  assert.match(guide, /09:00/i);
  assert.match(guide, /Summarize yesterday\./i);
});

test('buildDefaultRRule creates stable daily and weekly defaults', () => {
  assert.equal(
    buildDefaultRRule({ schedule: 'Daily', time: '09:00' }),
    'FREQ=DAILY;BYHOUR=9;BYMINUTE=0',
  );

  assert.equal(
    buildDefaultRRule({ schedule: 'Weekly', time: '16:30', weekday: 'FR' }),
    'FREQ=WEEKLY;BYDAY=FR;BYHOUR=16;BYMINUTE=30',
  );
});

test('serializeAutomationToml writes the Codex app automation schema', () => {
  const toml = serializeAutomationToml({
    id: 'template-daily-standup',
    name: 'Template - Daily standup recap',
    prompt: 'Summarize yesterday.\nCall out blockers.',
    status: 'PAUSED',
    rrule: 'FREQ=DAILY;BYHOUR=9;BYMINUTE=0',
    executionEnvironment: 'local',
    cwds: ['C:\\Projects\\Acme'],
    createdAt: 100,
    updatedAt: 200,
  });

  assert.match(toml, /^version = 1/m);
  assert.match(toml, /^status = "PAUSED"$/m);
  assert.match(toml, /^execution_environment = "local"$/m);
  assert.match(toml, /^cwds = \["C:\\\\Projects\\\\Acme"\]$/m);
});

test('installTemplatesToCodex writes automation.toml files that Codex can read', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'codex-home-'));
  const workspacePath = path.join(root, 'workspace');
  await mkdir(workspacePath, { recursive: true });

  const result = await installTemplatesToCodex({
    codexHome: root,
    templates: [
      {
        slug: 'daily-standup',
        title: 'Daily standup recap',
        summary: 'Summarize recent activity for standup.',
        category: 'Standups & Summaries',
        icon: 'message',
        projects_hint: 'Repo connected in Codex',
        default_model: 'gpt-5.1-codex-mini',
        default_reasoning: 'medium',
        recommended_execution_environment: 'local',
        schedule: 'Daily',
        time: '09:00',
        timezone: 'Etc/UTC',
        branch_prompt_hint: 'Optional branch text.',
        tags: ['standup', 'summary'],
        prompt: 'Summarize yesterday and list blockers.',
      },
    ],
    cwds: [workspacePath],
  });

  assert.equal(result.installed.length, 1);
  const contents = await readFile(result.installed[0].automationTomlPath, 'utf8');

  assert.match(contents, /^id = "template-daily-standup"$/m);
  assert.match(contents, /^status = "PAUSED"$/m);
  assert.match(contents, /^execution_environment = "local"$/m);
  assert.match(contents, /workspace/m);
});

test('renderCatalogMarkdown groups templates by category', () => {
  const markdown = renderCatalogMarkdown([
    {
      slug: 'daily-standup',
      title: 'Daily standup recap',
      summary: 'Summarize recent activity for standup.',
      category: 'Standups & Summaries',
      icon: 'message',
      projects_hint: 'Repo connected in Codex',
      default_model: 'gpt-5.1-codex-mini',
      default_reasoning: 'medium',
      recommended_execution_environment: 'local',
      schedule: 'Daily',
      time: '09:00',
      timezone: 'Etc/UTC',
      branch_prompt_hint: 'Optional branch text.',
      tags: ['standup', 'summary'],
      prompt: 'Summarize yesterday.',
    },
    {
      slug: 'ci-failure-cluster',
      title: 'CI failure cluster',
      summary: 'Group CI failures by likely root cause.',
      category: 'CI & Quality',
      icon: 'target',
      projects_hint: 'Repo connected in Codex',
      default_model: 'gpt-5.1-codex',
      default_reasoning: 'high',
      recommended_execution_environment: 'worktree',
      schedule: 'Daily',
      time: '10:00',
      timezone: 'Etc/UTC',
      branch_prompt_hint: 'Optional branch text.',
      tags: ['ci'],
      prompt: 'Check CI failures.',
    },
  ]);

  assert.match(markdown, /## Standups & Summaries/);
  assert.match(markdown, /## CI & Quality/);
  assert.match(markdown, /daily-standup/);
  assert.match(markdown, /ci-failure-cluster/);
});

test('repo ships at least 24 templates with complete metadata', async () => {
  const templates = await loadTemplates(path.resolve('templates'));
  const categories = new Set(templates.map((template) => template.category));
  const slugs = new Set(templates.map((template) => template.slug));

  assert.ok(
    templates.length >= 24,
    `expected at least 24 templates, found ${templates.length}`,
  );
  assert.equal(slugs.size, templates.length, 'template slugs must be unique');
  assert.ok(categories.size >= 6, 'expected at least 6 categories');

  for (const template of templates) {
    for (const field of TEMPLATE_REQUIRED_FIELDS) {
      assert.ok(template[field], `template ${template.slug} is missing ${field}`);
    }
    assert.ok(!/^\?+$/.test(template.icon), `template ${template.slug} needs a descriptive icon label`);
    assert.ok(template.prompt.trim().length > 40, `template ${template.slug} prompt is too short`);
  }
});

test('generated template artifacts exist after build', async () => {
  await buildLibrary();
  const templateDirs = await readdir(path.resolve('templates'), { withFileTypes: true });
  const firstTemplateDir = templateDirs.find((entry) => entry.isDirectory());

  assert.ok(firstTemplateDir, 'expected at least one template directory');

  const templateRoot = path.resolve('templates', firstTemplateDir.name);
  const manualGuide = await readFile(path.join(templateRoot, 'import.md'), 'utf8');
  const templateReadme = await readFile(path.join(templateRoot, 'README.md'), 'utf8');

  assert.match(manualGuide, /Automation template/i);
  assert.match(manualGuide, /npm run install:codex/i);
  assert.match(templateReadme, /When to use/i);
});
