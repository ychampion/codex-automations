import path from 'node:path';
import process from 'node:process';

import { loadTemplates } from '../src/library.mjs';
import {
  DEFAULT_TEMPLATE_ID_PREFIX,
  uninstallTemplatesFromCodex,
} from '../src/codex-app.mjs';

function printHelp() {
  console.log(`Remove Codex automation templates previously installed by this repo.

Usage:
  npm run uninstall:codex
  npm run uninstall:codex -- --template daily-standup

Options:
  --template <slug[,slug...]>   Remove only specific templates.
  --codex-home <path>           Override automatic Codex profile detection.
  --id-prefix <prefix>          Automation id prefix. Default: ${DEFAULT_TEMPLATE_ID_PREFIX}
  --help                        Show this message.
`);
}

function parseArgs(argv) {
  const args = {
    templates: [],
    codexHome: null,
    idPrefix: DEFAULT_TEMPLATE_ID_PREFIX,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (argument === '--help' || argument === '-h') {
      args.help = true;
      continue;
    }

    const value = argv[index + 1];
    if (value == null) {
      throw new Error(`Missing value for ${argument}`);
    }

    switch (argument) {
      case '--template':
        args.templates.push(...value.split(',').map((item) => item.trim()).filter(Boolean));
        index += 1;
        break;
      case '--codex-home':
        args.codexHome = value;
        index += 1;
        break;
      case '--id-prefix':
        args.idPrefix = value;
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
  const result = await uninstallTemplatesFromCodex({
    templates,
    codexHome: args.codexHome,
    selectedSlugs: args.templates,
    idPrefix: args.idPrefix,
  });

  console.log(`Codex profile: ${result.codexHome}`);
  console.log(`Removed: ${result.removed.length}`);
  for (const item of result.removed) {
    console.log(`- ${item.template.slug}`);
  }

  if (result.missing.length > 0) {
    console.log(`Missing: ${result.missing.length}`);
    for (const item of result.missing) {
      console.log(`- ${item.template.slug}`);
    }
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
