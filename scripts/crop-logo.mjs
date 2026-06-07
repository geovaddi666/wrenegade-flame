import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, '..', 'public', 'emporium', 'emporium-logo.png');
const out = path.join(__dirname, '..', 'public', 'emporium', 'emporium-mark.png');

const input = sharp(src);
const meta = await input.metadata();
console.log('source size:', meta.width, 'x', meta.height);

const trimmed = await sharp(src)
  // Trim away the uniform black border around the gold mark.
  .trim({ background: '#000000', threshold: 20 })
  .png()
  .toBuffer({ resolveWithObject: true });

console.log('trimmed size:', trimmed.info.width, 'x', trimmed.info.height);

await sharp(trimmed.data).toFile(out);
console.log('wrote', out);
