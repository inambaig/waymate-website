/**
 * Downloads hero images for articles from Unsplash (free to use).
 * Run: node scripts/setup-article-images.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '../public/article-images');

const IMAGES = [
  { file: 'lahore-carpool.jpg', url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&h=630&fit=crop&q=80' },
  { file: 'islamabad-commute.jpg', url: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=1200&h=630&fit=crop&q=80' },
  { file: 'karachi-traffic.jpg', url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&h=630&fit=crop&q=80' },
  { file: 'carpool-savings.jpg', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=630&fit=crop&q=80' },
  { file: 'ride-hailing.jpg', url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&h=630&fit=crop&q=80' },
  { file: 'safety-verification.jpg', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=630&fit=crop&q=80' },
  { file: 'women-safety.jpg', url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&h=630&fit=crop&q=80' },
  { file: 'ride-host.jpg', url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=630&fit=crop&q=80' },
  { file: 'passenger-app.jpg', url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=630&fit=crop&q=80' },
  { file: 'gulberg-dha.jpg', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=630&fit=crop&q=80' },
  { file: 'waymate-launch.jpg', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=630&fit=crop&q=80' },
  { file: 'carpool-tips.jpg', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=630&fit=crop&q=80' },
  { file: 'green-commute.jpg', url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=630&fit=crop&q=80' },
  { file: 'university-commute.jpg', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=630&fit=crop&q=80' },
  { file: 'motorbike-carpool.jpg', url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&h=630&fit=crop&q=80' },
  { file: 'office-carpool.jpg', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=630&fit=crop&q=80' },
  { file: 'default-og.jpg', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=630&fit=crop&q=80' },
];

fs.mkdirSync(OUT, { recursive: true });

for (const { file, url } of IMAGES) {
  const dest = path.join(OUT, file);
  if (fs.existsSync(dest)) {
    console.log(`skip ${file}`);
    continue;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${file}: ${res.status}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  console.log(`saved ${file}`);
}

console.log(`Images ready in public/article-images/`);
