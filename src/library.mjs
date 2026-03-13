import path from 'node:path';
import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';

import { buildDefaultRRule } from './codex-app.mjs';

export const TEMPLATE_REQUIRED_FIELDS = [
  'slug',
  'title',
  'summary',
  'category',
  'icon',
  'projects_hint',
  'default_model',
  'default_reasoning',
  'recommended_execution_environment',
  'schedule',
  'time',
  'timezone',
  'branch_prompt_hint',
  'tags',
];

export const DEFAULT_REPO = {
  owner: 'ychampion',
  name: 'codex-automations',
  branch: 'main',
};

const ALLOWED_REASONING = new Set(['low', 'medium', 'high', 'xhigh']);
const ALLOWED_EXECUTION_ENVIRONMENTS = new Set(['local', 'worktree']);
const ALLOWED_MODELS = new Set([
  'gpt-5.1-codex',
  'gpt-5.1-codex-mini',
  'gpt-4.1-codex',
]);

function repoBaseUrl(repo = DEFAULT_REPO) {
  return `https://github.com/${repo.owner}/${repo.name}`;
}

function repoRawBaseUrl(repo = DEFAULT_REPO) {
  return `https://raw.githubusercontent.com/${repo.owner}/${repo.name}/${repo.branch}`;
}

async function readJson(filePath) {
  const text = await readFile(filePath, 'utf8');
  return JSON.parse(text);
}

function normalizeTemplate(template, prompt, directoryName) {
  const normalized = {
    ...template,
    tags: Array.isArray(template.tags) ? [...template.tags] : template.tags,
    prompt: prompt.trim(),
  };

  if (!normalized.slug) {
    normalized.slug = directoryName;
  }

  return normalized;
}

function assertTemplateShape(template, sourcePath) {
  for (const field of TEMPLATE_REQUIRED_FIELDS) {
    if (
      template[field] === undefined ||
      template[field] === null ||
      template[field] === '' ||
      (Array.isArray(template[field]) && template[field].length === 0)
    ) {
      throw new Error(`Template ${sourcePath} is missing required field: ${field}`);
    }
  }

  if (!Array.isArray(template.tags)) {
    throw new Error(`Template ${sourcePath} must define tags as an array`);
  }

  if (!ALLOWED_MODELS.has(template.default_model)) {
    throw new Error(`Template ${sourcePath} has unsupported default_model: ${template.default_model}`);
  }

  if (!ALLOWED_REASONING.has(template.default_reasoning)) {
    throw new Error(
      `Template ${sourcePath} has unsupported default_reasoning: ${template.default_reasoning}`,
    );
  }

  if (!ALLOWED_EXECUTION_ENVIRONMENTS.has(template.recommended_execution_environment)) {
    throw new Error(
      `Template ${sourcePath} has unsupported recommended_execution_environment: ${template.recommended_execution_environment}`,
    );
  }

  if (template.prompt.trim().length < 40) {
    throw new Error(`Template ${sourcePath} prompt must be at least 40 characters long`);
  }
}

export async function loadTemplates(templatesRoot) {
  const entries = await readdir(templatesRoot, { withFileTypes: true });
  const templateDirectories = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));

  const templates = [];
  const seenSlugs = new Set();

  for (const directoryName of templateDirectories) {
    const templateRoot = path.join(templatesRoot, directoryName);
    const metadataPath = path.join(templateRoot, 'template.json');
    const promptPath = path.join(templateRoot, 'prompt.md');
    const metadata = await readJson(metadataPath);
    const prompt = await readFile(promptPath, 'utf8');
    const template = normalizeTemplate(metadata, prompt, directoryName);

    assertTemplateShape(template, templateRoot);

    if (seenSlugs.has(template.slug)) {
      throw new Error(`Duplicate template slug detected: ${template.slug}`);
    }

    seenSlugs.add(template.slug);
    templates.push(template);
  }

  return templates;
}

function renderField(label, value) {
  return `- **${label}:** ${value}`;
}

export function renderManualImportGuide(template) {
  return [
    `# ${template.title}`,
    '',
    'Automation template for the Codex app.',
    '',
    `> ${template.summary}`,
    '',
    '## Fast install into Codex app',
    '',
    `- Run \`npm run install:codex -- --template ${template.slug}\` from the repo root.`,
    '- This installs a paused automation into your local Codex app profile so it appears in **Automations**.',
    '- Add `--cwd /absolute/path/to/your/repo` if you want to attach a project during install.',
    '- Weekly templates default to Monday unless you pass `--weekday` during install.',
    '',
    '## Manual create in Codex',
    renderField('Projects', template.projects_hint),
    renderField('Model', template.default_model),
    renderField('Reasoning', template.default_reasoning),
    renderField(
      'Execution environment',
      template.recommended_execution_environment === 'worktree' ? 'Worktree' : 'Local',
    ),
    renderField('Schedule', template.schedule),
    renderField('Time', template.time),
    renderField('Timezone', template.timezone),
    '',
    '## Prompt',
    '',
    template.prompt,
    '',
    '## Branch targeting',
    '',
    template.branch_prompt_hint,
    '',
    '## Tags',
    '',
    template.tags.map((tag) => `- ${tag}`).join('\n'),
    '',
  ].join('\n');
}

function categorySortValue(category) {
  const preferredOrder = [
    'Standups & Summaries',
    'PRs & Reviews',
    'Issues & Backlog',
    'CI & Quality',
    'Docs & Process',
    'Ops & Support',
  ];
  const index = preferredOrder.indexOf(category);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

export function renderCatalogMarkdown(templates, repo = DEFAULT_REPO) {
  const grouped = new Map();

  for (const template of templates) {
    if (!grouped.has(template.category)) {
      grouped.set(template.category, []);
    }
    grouped.get(template.category).push(template);
  }

  const categories = [...grouped.keys()].sort((left, right) => {
    const leftOrder = categorySortValue(left);
    const rightOrder = categorySortValue(right);
    return leftOrder - rightOrder || left.localeCompare(right);
  });

  const lines = [
    '# Template Catalog',
    '',
    'Use these templates to create Codex automations from GitHub-hosted source files.',
    '',
  ];

  for (const category of categories) {
    lines.push(`## ${category}`, '');
    const items = grouped
      .get(category)
      .slice()
      .sort((left, right) => left.title.localeCompare(right.title));

    for (const template of items) {
      const repoUrl = `${repoBaseUrl(repo)}/tree/${repo.branch}/templates/${template.slug}`;
      const rawPrompt = `${repoRawBaseUrl(repo)}/templates/${template.slug}/prompt.md`;
      lines.push(
        `- [${template.slug}](${repoUrl}) - ${template.summary} ` +
          `(${template.schedule} at ${template.time}, ${template.recommended_execution_environment}) | ` +
          `[raw prompt](${rawPrompt})`,
      );
    }

    lines.push('');
  }

  return lines.join('\n');
}

export function renderRootReadme(templates, repo = DEFAULT_REPO) {
  const templateCount = templates.length;
  const categories = [...new Set(templates.map((template) => template.category))].sort(
    (left, right) => categorySortValue(left) - categorySortValue(right) || left.localeCompare(right),
  );
  const catalog = renderCatalogMarkdown(templates, repo);

  return [
    '# Codex Automation Templates',
    '',
    `A community library of ${templateCount}+ reusable Codex automation templates that people can download from GitHub and install directly into the Codex app.`,
    '',
    '## What this repo does',
    '',
    '- Curates reusable prompts and settings for recurring Codex automations.',
    '- Installs templates into the real Codex app automation store so they show up in **Automations**.',
    '- Keeps every template documented with schedule defaults, model defaults, execution-environment guidance, and branch-target hints.',
    '',
    '## Quick start',
    '',
    '1. Make sure the Codex app is installed, and use Node.js 18+.',
    '2. Clone this repo or download it as a ZIP from GitHub, then open the repo root in a terminal.',
    '3. Run `npm run install:codex` to install all templates into your local Codex app profile.',
    '4. Open Codex and go to **Automations**.',
    '5. If the list was already open, close and reopen the Automations view.',
    '6. Optional: rerun with `--template <slug>` or `--cwd /absolute/path/to/repo` to narrow or pre-attach templates.',
    '',
    '## Install behavior',
    '',
    '- Templates are written to the same `automation.toml` format the Codex app reads from `$CODEX_HOME/automations/<id>/`.',
    '- This repo has no package dependencies, so `npm run install:codex` works right after download or clone.',
    '- Installs default to `PAUSED` so nothing starts running unexpectedly.',
    '- Installs default to no project folders so templates stay portable unless you pass `--cwd`.',
    '- Weekly templates default to Monday unless you pass `--weekday MO|TU|WE|TH|FR|SA|SU`.',
    '- Use `npm run where:codex` to print the detected Codex profile path.',
    '- Use `npm run uninstall:codex` to remove previously installed templates.',
    '',
    '## Manual fallback',
    '',
    '- If you prefer manual setup, each template still includes an `import.md` guide with the Codex form fields.',
    '',
    '## Execution environment',
    '',
    '- Use `Local` when the automation should only inspect the current branch and produce summaries or triage output.',
    '- Use `Worktree` when the automation may propose edits, patch plans, or branch-safe fixes.',
    '',
    '## Branch-specific runs',
    '',
    '- If you want an automation to run on a specific branch, include the branch in the prompt text as guided by each template.',
    '',
    '## Categories',
    '',
    ...categories.map((category) => `- ${category}`),
    '',
    catalog,
    '',
    '## Contributing',
    '',
    '- See `CONTRIBUTING.md` for template authoring rules and submission guidelines.',
    '- Use `docs/community-template-checklist.md` when reviewing or submitting a new template.',
    '',
  ].join('\n');
}

export async function buildLibrary({
  templatesDir = path.resolve('templates'),
  catalogDir = path.resolve('catalog'),
  repo = DEFAULT_REPO,
} = {}) {
  const templates = await loadTemplates(templatesDir);

  await mkdir(catalogDir, { recursive: true });

  for (const template of templates) {
    const templateRoot = path.join(templatesDir, template.slug);
    await writeFile(path.join(templateRoot, 'import.md'), renderManualImportGuide(template));
  }

  const catalogJson = JSON.stringify(
    templates.map(({ prompt, ...template }) => ({
      ...template,
      default_rrule: buildDefaultRRule(template),
      prompt_path: `templates/${template.slug}/prompt.md`,
      import_path: `templates/${template.slug}/import.md`,
      readme_path: `templates/${template.slug}/README.md`,
    })),
    null,
    2,
  );
  await writeFile(path.join(catalogDir, 'catalog.json'), `${catalogJson}\n`);
  await writeFile(path.join(catalogDir, 'templates.md'), renderCatalogMarkdown(templates, repo));
  await writeFile(path.resolve('README.md'), renderRootReadme(templates, repo));

  return templates;
}

export async function validateLibrary({
  templatesDir = path.resolve('templates'),
  catalogDir = path.resolve('catalog'),
  repo = DEFAULT_REPO,
} = {}) {
  const templates = await loadTemplates(templatesDir);

  for (const template of templates) {
    const expectedImportGuide = renderManualImportGuide(template);
    const actualImportGuide = await readFile(path.join(templatesDir, template.slug, 'import.md'), 'utf8');
    if (actualImportGuide !== expectedImportGuide) {
      throw new Error(`Generated import.md is stale for ${template.slug}`);
    }
  }

  const expectedCatalogMarkdown = renderCatalogMarkdown(templates, repo);
  const actualCatalogMarkdown = await readFile(path.join(catalogDir, 'templates.md'), 'utf8');
  if (actualCatalogMarkdown !== expectedCatalogMarkdown) {
    throw new Error('catalog/templates.md is stale');
  }

  const expectedReadme = renderRootReadme(templates, repo);
  const actualReadme = await readFile(path.resolve('README.md'), 'utf8');
  if (actualReadme !== expectedReadme) {
    throw new Error('README.md is stale');
  }

  return templates;
}
