import fs from 'fs';
import path from 'path';

const dist = path.resolve(process.cwd(), 'dist');
if (fs.existsSync(path.join(dist, 'index.html'))) {
  // 1. 404.html fallback
  fs.copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'));

  // 2. Direct SPA routes fallback for Cloudflare Pages
  const spaRoutes = ['studio', 'admin', 'live-wall', 'led', 'w'];
  for (const route of spaRoutes) {
    const routeDir = path.join(dist, route);
    if (!fs.existsSync(routeDir)) fs.mkdirSync(routeDir, { recursive: true });
    fs.copyFileSync(path.join(dist, 'index.html'), path.join(routeDir, 'index.html'));
  }

  // 3. _routes.json for Pages
  const routesJson = JSON.stringify({ version: 1, include: ['/api/*'], exclude: [] }, null, 2);
  fs.writeFileSync(path.join(dist, '_routes.json'), routesJson, 'utf-8');
}
