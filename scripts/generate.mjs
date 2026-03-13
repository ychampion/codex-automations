import { buildLibrary } from '../src/library.mjs';

const templates = await buildLibrary();

console.log(`Generated catalog and import guides for ${templates.length} templates.`);
