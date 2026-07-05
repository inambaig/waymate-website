import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PARTIALS_DIR = resolve(__dirname, '../partials');

const HEADER_INCLUDE = '<!-- @include header.html -->';
const FOOTER_INCLUDE = '<!-- @include footer.html -->';

export function readPartial(name) {
  return readFileSync(resolve(PARTIALS_DIR, name), 'utf8');
}

export function injectPartials(html) {
  if (!html.includes(HEADER_INCLUDE) && !html.includes(FOOTER_INCLUDE)) {
    return html;
  }

  const beforeFooter = readPartial('download-cta.html') + readPartial('footer.html');

  return html
    .replace(HEADER_INCLUDE, readPartial('header.html'))
    .replace(FOOTER_INCLUDE, beforeFooter);
}
