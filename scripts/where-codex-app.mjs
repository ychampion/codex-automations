import process from 'node:process';

import { detectCodexHome } from '../src/codex-app.mjs';

try {
  const codexHome = await detectCodexHome();
  if (!codexHome) {
    console.error('Unable to detect your Codex app profile.');
    process.exit(1);
  }

  console.log(codexHome);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
