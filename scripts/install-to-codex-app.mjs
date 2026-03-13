import path from 'node:path';
import process from 'node:process';

import { loadTemplates } from '../src/library.mjs';
import {
  DEFAULT_TEMPLATE_ID_PREFIX,
  DEFAULT_TEMPLATE_NAME_PREFIX,
  DEFAULT_TEMPLATE_STATUS,
  installTemplatesToCodex,
} from '../src/codex-app.mjs';

function printHelp() {
  console.log(`Install Codex automation templates into the local Codex app profile.

Usage:
  npm run install:codex
  npm run install:codex -- --template daily-standup
  npm run install:codex -- --template daily-standup,repo-briefing --cwd C:\\path\\to\\repo

Options:
  --template <slug[,slug...]>   Install only specific templates.
  --cwd <path[,path...]>        Attach one or more project folders during install.
  --status <paused|active>      Installed status. Default: paused.
  --codex-home <path>           Override automatic Codex profile detection.
  --overwrite                   Replace existing installed template automations.
  --weekday <MO|TU|...>         Default weekday for weekly templates. Default: MO.
  --id-prefix <prefix>          Automation id prefix. Default: ${DEFAULT_TEMPLATE_ID_PREFIX}
  --name-prefix <prefix>        Automation name prefix. Default: ${DEFAULT_TEMPLATE_NAME_PREFIX}
  --create-memory               Create an empty memory.md beside each automation file.
  --help                        Show this message.
`);
}

function collectListValues(current, rawValue) {
  const pieces = String(rawValue)
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  current.push(...pieces);
}

function parseArgs(argv) {
  const args = {
    templates: [],
    cwds: [],
    status: DEFAULT_TEMPLATE_STATUS,
    codexHome: null,
    overwrite: false,
    weekday: 'MO',
    idPrefix: DEFAULT_TEMPLATE_ID_PREFIX,
    namePrefix: DEFAULT_TEMPLATE_NAME_PREFIX,
    createMemory: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (argument === '--help' || argument === '-h') {
      args.help = true;
      continue;
    }

    if (argument === '--overwrite') {
      args.overwrite = true;
      continue;
    }

    if (argument === '--create-memory') {
      args.createMemory = true;
      continue;
    }

    const value = argv[index + 1];
    if (value == null) {
      throw new Error(`Missing value for ${argument}`);
    }

    switch (argument) {
      case '--template':
        collectListValues(args.templates, value);
        index += 1;
        break;
      case '--cwd':
        collectListValues(args.cwds, value);
        index += 1;
        break;
      case '--status':
        args.status = value.toUpperCase();
        index += 1;
        break;
      case '--codex-home':
        args.codexHome = value;
        index += 1;
        break;
      case '--weekday':
        args.weekday = value.toUpperCase();
        index += 1;
        break;
      case '--id-prefix':
        args.idPrefix = value;
        index += 1;
        break;
      case '--name-prefix':
        args.namePrefix = value;
        index += 1;
        break;
      default:
        throw new Error(`Unknown argument: ${argument}`);
    }
  }

  return args;
}

try {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    process.exit(0);
  }

  const templates = await loadTemplates(path.resolve('templates'));
  const result = await installTemplatesToCodex({
    templates,
    codexHome: args.codexHome,
    selectedSlugs: args.templates,
    cwds: args.cwds,
    overwrite: args.overwrite,
    status: args.status,
    weekday: args.weekday,
    idPrefix: args.idPrefix,
    namePrefix: args.namePrefix,
    createMemory: args.createMemory,
  });

  console.log(`Codex profile: ${result.codexHome}`);
  console.log(`Installed: ${result.installed.length}`);

  for (const item of result.installed) {
    console.log(`- ${item.template.slug} -> ${item.automationTomlPath}`);
  }

  if (result.skipped.length > 0) {
    console.log(`Skipped: ${result.skipped.length}`);
    for (const item of result.skipped) {
      console.log(`- ${item.template.slug} (already installed)`);
    }
  }

  console.log('Open Codex > Automations. If that view is already open, close and reopen it.');
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
