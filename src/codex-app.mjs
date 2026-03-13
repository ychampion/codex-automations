import os from 'node:os';
import path from 'node:path';
import {
  access,
  mkdir,
  readdir,
  readFile,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';

export const CODEX_AUTOMATIONS_DIRNAME = 'automations';
export const CODEX_AUTOMATION_FILENAME = 'automation.toml';
export const CODEX_AUTOMATION_MEMORY_FILENAME = 'memory.md';
export const CODEX_AUTOMATION_FILE_VERSION = 1;
export const DEFAULT_TEMPLATE_ID_PREFIX = 'template-';
export const DEFAULT_TEMPLATE_NAME_PREFIX = 'Template - ';
export const DEFAULT_TEMPLATE_STATUS = 'PAUSED';
export const DEFAULT_WEEKLY_DAY = 'MO';

export const ALLOWED_AUTOMATION_STATUSES = new Set(['ACTIVE', 'PAUSED', 'DELETED']);
export const ALLOWED_EXECUTION_ENVIRONMENTS = new Set(['worktree', 'local']);

const WEEKDAY_VALUES = new Set(['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']);
const WINDOWS_PROFILE_ROOT = ['CodexProfiles'];
const WINDOWS_FALLBACK_PROFILE = ['CodexDesktopProfile'];
const POSIX_PROFILE_ROOTS = [
  ['.local', 'share', 'CodexProfiles'],
  ['.config', 'CodexProfiles'],
  ['Library', 'Application Support', 'CodexProfiles'],
];
const POSIX_FALLBACK_PROFILES = [
  ['.local', 'share', 'CodexDesktopProfile'],
  ['.config', 'CodexDesktopProfile'],
  ['Library', 'Application Support', 'CodexDesktopProfile'],
  ['.codex'],
];

async function pathExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function maybeStat(filePath) {
  try {
    return await stat(filePath);
  } catch {
    return null;
  }
}

function uniqueStrings(values) {
  return [...new Set(values.filter(Boolean))];
}

function sanitizeAutomationId(value) {
  const sanitized = String(value ?? '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

  if (!sanitized || sanitized === '.' || sanitized === '..') {
    return '';
  }

  return sanitized;
}

function normalizeAutomationStatus(value) {
  const normalized = String(value ?? DEFAULT_TEMPLATE_STATUS).trim().toUpperCase();
  return ALLOWED_AUTOMATION_STATUSES.has(normalized) ? normalized : DEFAULT_TEMPLATE_STATUS;
}

export function normalizeExecutionEnvironment(value) {
  return value === 'local' ? 'local' : 'worktree';
}

export function escapeTomlString(value) {
  return `"${String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/"/g, '\\"')}"`;
}

export function renderTomlStringArray(values) {
  if (!values.length) {
    return '[]';
  }

  return `[${values.map(escapeTomlString).join(', ')}]`;
}

function parseClockTime(value) {
  const match = /^(\d{2}):(\d{2})$/.exec(String(value ?? '').trim());
  if (!match) {
    throw new Error(`Unsupported time format: ${value}`);
  }

  const [, hourText, minuteText] = match;
  const hour = Number(hourText);
  const minute = Number(minuteText);

  if (!Number.isInteger(hour) || hour < 0 || hour > 23) {
    throw new Error(`Unsupported hour in time: ${value}`);
  }

  if (!Number.isInteger(minute) || minute < 0 || minute > 59) {
    throw new Error(`Unsupported minute in time: ${value}`);
  }

  return { hour, minute };
}

function normalizeWeekday(value) {
  if (!value) {
    return DEFAULT_WEEKLY_DAY;
  }

  const normalized = String(value).trim().toUpperCase();
  if (!WEEKDAY_VALUES.has(normalized)) {
    throw new Error(`Unsupported weekly day: ${value}`);
  }

  return normalized;
}

function normalizeCwds(values, { baseDir = process.cwd() } = {}) {
  return uniqueStrings(
    (Array.isArray(values) ? values : [])
      .map((value) => String(value ?? '').trim())
      .filter(Boolean)
      .map((value) => (path.isAbsolute(value) ? value : path.resolve(baseDir, value))),
  );
}

export function buildDefaultRRule(template, options = {}) {
  const explicitRRule = template.rrule ?? template.default_rrule ?? options.rrule;
  if (explicitRRule) {
    return String(explicitRRule).trim();
  }

  const { hour, minute } = parseClockTime(template.time);
  const schedule = String(template.schedule ?? '').trim().toLowerCase();

  if (schedule === 'daily') {
    return `FREQ=DAILY;BYHOUR=${hour};BYMINUTE=${minute}`;
  }

  if (schedule === 'weekdays') {
    return `FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;BYHOUR=${hour};BYMINUTE=${minute}`;
  }

  if (schedule === 'weekly') {
    const weekday = normalizeWeekday(template.weekday ?? template.day_of_week ?? options.weekday);
    return `FREQ=WEEKLY;BYDAY=${weekday};BYHOUR=${hour};BYMINUTE=${minute}`;
  }

  if (schedule === 'hourly') {
    const interval = Number(template.interval_hours ?? options.intervalHours ?? 1);
    return `FREQ=HOURLY;INTERVAL=${interval};BYMINUTE=${minute}`;
  }

  return `FREQ=DAILY;BYHOUR=${hour};BYMINUTE=${minute}`;
}

export function buildTemplateAutomationId(slug, { idPrefix = DEFAULT_TEMPLATE_ID_PREFIX } = {}) {
  const base = sanitizeAutomationId(`${idPrefix}${slug}`);
  if (!base) {
    throw new Error(`Unable to build a valid automation id from slug: ${slug}`);
  }

  return base;
}

export function buildInstalledAutomation(template, options = {}) {
  const now = Number(options.now ?? Date.now());
  const status = normalizeAutomationStatus(options.status ?? template.install_status);
  const executionEnvironment = normalizeExecutionEnvironment(
    options.executionEnvironment ?? template.recommended_execution_environment,
  );
  const cwds = normalizeCwds(options.cwds ?? template.install_cwds ?? [], {
    baseDir: options.baseDir,
  });
  const namePrefix = options.namePrefix ?? DEFAULT_TEMPLATE_NAME_PREFIX;

  return {
    id: buildTemplateAutomationId(template.slug, options),
    name: `${namePrefix}${template.title}`,
    prompt: template.prompt.trim(),
    status,
    executionEnvironment,
    rrule: buildDefaultRRule(template, options),
    cwds,
    createdAt: now,
    updatedAt: now,
  };
}

export function serializeAutomationToml(automation) {
  return [
    `version = ${CODEX_AUTOMATION_FILE_VERSION}`,
    `id = ${escapeTomlString(automation.id)}`,
    `name = ${escapeTomlString(automation.name)}`,
    `prompt = ${escapeTomlString(automation.prompt)}`,
    `status = ${escapeTomlString(automation.status)}`,
    `rrule = ${escapeTomlString(automation.rrule)}`,
    `execution_environment = ${escapeTomlString(automation.executionEnvironment)}`,
    `cwds = ${renderTomlStringArray(automation.cwds)}`,
    `created_at = ${automation.createdAt}`,
    `updated_at = ${automation.updatedAt}`,
    '',
  ].join('\n');
}

export function getAutomationDirectory(codexHome, automationId) {
  return path.join(codexHome, CODEX_AUTOMATIONS_DIRNAME, automationId);
}

export function getAutomationTomlPath(codexHome, automationId) {
  return path.join(getAutomationDirectory(codexHome, automationId), CODEX_AUTOMATION_FILENAME);
}

export function getAutomationMemoryPath(codexHome, automationId) {
  return path.join(getAutomationDirectory(codexHome, automationId), CODEX_AUTOMATION_MEMORY_FILENAME);
}

async function findProfileDirectories(root) {
  const stats = await maybeStat(root);
  if (!stats?.isDirectory()) {
    return [];
  }

  const entries = await readdir(root, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(root, entry.name));
}

async function collectCandidateCodexHomes({
  platform = process.platform,
  env = process.env,
  homeDir = os.homedir(),
} = {}) {
  const candidates = [];

  if (env.CODEX_HOME) {
    candidates.push(path.resolve(env.CODEX_HOME));
  }

  if (platform === 'win32') {
    const localAppData = env.LOCALAPPDATA ?? path.join(homeDir, 'AppData', 'Local');
    const profileRoot = path.join(localAppData, ...WINDOWS_PROFILE_ROOT);
    candidates.push(path.join(profileRoot, 'prime'));
    candidates.push(...(await findProfileDirectories(profileRoot)));
    candidates.push(path.join(localAppData, ...WINDOWS_FALLBACK_PROFILE));
  } else {
    for (const relativePath of POSIX_PROFILE_ROOTS) {
      const root = path.join(homeDir, ...relativePath);
      candidates.push(path.join(root, 'prime'));
      candidates.push(...(await findProfileDirectories(root)));
    }

    for (const relativePath of POSIX_FALLBACK_PROFILES) {
      candidates.push(path.join(homeDir, ...relativePath));
    }
  }

  return uniqueStrings(candidates.map((candidate) => path.resolve(candidate)));
}

async function codexHomeScore(codexHome) {
  const indicators = [
    path.join(codexHome, 'sqlite', 'codex-dev.db'),
    path.join(codexHome, 'config.toml'),
    path.join(codexHome, 'logs_1.sqlite'),
    path.join(codexHome, 'state_5.sqlite'),
  ];
  const stats = await Promise.all(indicators.map((indicator) => maybeStat(indicator)));

  const existsCount = stats.filter(Boolean).length;
  const hasSqlite = Boolean(stats[0]);
  const basename = path.basename(codexHome).toLowerCase();
  const latestMtimeMs = Math.max(...stats.filter(Boolean).map((entry) => entry.mtimeMs), 0);

  return {
    codexHome,
    existsCount,
    hasSqlite,
    latestMtimeMs,
    basename,
  };
}

export async function detectCodexHome(options = {}) {
  if (options.codexHome) {
    return path.resolve(options.codexHome);
  }

  const candidates = await collectCandidateCodexHomes(options);
  if (candidates.length === 0) {
    return null;
  }

  const scoredCandidates = await Promise.all(candidates.map((candidate) => codexHomeScore(candidate)));
  const validCandidates = scoredCandidates.filter((candidate) => candidate.existsCount > 0);

  if (validCandidates.length === 0) {
    return null;
  }

  validCandidates.sort((left, right) => {
    if (left.hasSqlite !== right.hasSqlite) {
      return left.hasSqlite ? -1 : 1;
    }

    if (left.basename === 'prime' || right.basename === 'prime') {
      return left.basename === 'prime' ? -1 : 1;
    }

    if (left.existsCount !== right.existsCount) {
      return right.existsCount - left.existsCount;
    }

    return right.latestMtimeMs - left.latestMtimeMs;
  });

  return validCandidates[0].codexHome;
}

async function writeAtomicUtf8(filePath, contents) {
  const directoryPath = path.dirname(filePath);
  await mkdir(directoryPath, { recursive: true });

  const tempPath = path.join(
    directoryPath,
    `.${path.basename(filePath)}.tmp-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  );

  await writeFile(tempPath, contents, 'utf8');

  try {
    await rm(filePath, { force: true });
  } catch {
    // Ignore remove failures; rename will surface the real problem.
  }

  await writeFile(filePath, contents, 'utf8');
  await rm(tempPath, { force: true }).catch(() => {});
}

async function writeAutomationFiles(codexHome, automation, { createMemory = false } = {}) {
  const automationDirectory = getAutomationDirectory(codexHome, automation.id);
  const automationTomlPath = getAutomationTomlPath(codexHome, automation.id);

  await mkdir(automationDirectory, { recursive: true });
  await writeAtomicUtf8(automationTomlPath, serializeAutomationToml(automation));

  if (createMemory) {
    const memoryPath = getAutomationMemoryPath(codexHome, automation.id);
    if (!(await pathExists(memoryPath))) {
      await writeFile(memoryPath, '', 'utf8');
    }
  }

  return automationTomlPath;
}

export async function installTemplatesToCodex({
  templates,
  codexHome,
  selectedSlugs = null,
  overwrite = false,
  createMemory = false,
  ...options
}) {
  const resolvedCodexHome = await detectCodexHome({ codexHome });
  if (!resolvedCodexHome) {
    throw new Error('Unable to detect your Codex app profile. Re-run with --codex-home /path/to/profile.');
  }

  const allowedSlugs = selectedSlugs?.length ? new Set(selectedSlugs) : null;
  const filteredTemplates = templates.filter((template) =>
    allowedSlugs ? allowedSlugs.has(template.slug) : true,
  );

  const installed = [];
  const skipped = [];

  for (const template of filteredTemplates) {
    const automation = buildInstalledAutomation(template, options);
    const automationTomlPath = getAutomationTomlPath(resolvedCodexHome, automation.id);

    if (!overwrite && (await pathExists(automationTomlPath))) {
      skipped.push({ template, automation, reason: 'exists', automationTomlPath });
      continue;
    }

    await writeAutomationFiles(resolvedCodexHome, automation, { createMemory });
    installed.push({ template, automation, automationTomlPath });
  }

  return {
    codexHome: resolvedCodexHome,
    installed,
    skipped,
  };
}

export async function uninstallTemplatesFromCodex({
  codexHome,
  templates,
  selectedSlugs = null,
  idPrefix = DEFAULT_TEMPLATE_ID_PREFIX,
} = {}) {
  const resolvedCodexHome = await detectCodexHome({ codexHome });
  if (!resolvedCodexHome) {
    throw new Error('Unable to detect your Codex app profile. Re-run with --codex-home /path/to/profile.');
  }

  const allowedSlugs = selectedSlugs?.length ? new Set(selectedSlugs) : null;
  const targetTemplates = (templates ?? []).filter((template) =>
    allowedSlugs ? allowedSlugs.has(template.slug) : true,
  );

  const removed = [];
  const missing = [];

  for (const template of targetTemplates) {
    const automationId = buildTemplateAutomationId(template.slug, { idPrefix });
    const automationDirectory = getAutomationDirectory(resolvedCodexHome, automationId);

    if (!(await pathExists(automationDirectory))) {
      missing.push({ template, automationId, automationDirectory });
      continue;
    }

    await rm(automationDirectory, { recursive: true, force: true });
    removed.push({ template, automationId, automationDirectory });
  }

  return {
    codexHome: resolvedCodexHome,
    removed,
    missing,
  };
}
