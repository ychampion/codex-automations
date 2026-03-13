import { validateLibrary } from '../src/library.mjs';

const templates = await validateLibrary();

console.log(`Validated ${templates.length} templates.`);
