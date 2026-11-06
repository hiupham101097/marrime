import fs from 'fs';
import path from 'path';

const dist = path.resolve(process.cwd(), 'dist');
if (fs.existsSync(path.join(dist, 'index.html'))) {
  // 1. 404.html fallback
  fs.copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'));

  // 2. studio/index.html fallback
  const studioDir = path.join(dist, 'studio');
  if (!fs.existsSync(studioDir)) fs.mkdirSync(studioDir, { recursive: true });
  fs.copyFileSync(path.join(dist, 'index.html'), path.join(studioDir, 'index.html'));

  // 3. _redirects
  fs.writeFileSync(path.join(dist, '_redirects'), '/*    /index.html   200\n', 'utf-8');

  // 4. _routes.json
  const routesJson = JSON.stringify({ version: 1, include: ['/api/*'], exclude: [] }, null, 2);
  fs.writeFileSync(path.join(dist, '_routes.json'), routesJson, 'utf-8');
}
