import path from 'path';
import express from 'express';
import { app } from './app';

const PORT = process.env.PORT || 3001;

// If dist directory exists, serve frontend static files (for fullstack Node.js deployment)
const distPath = path.resolve(process.cwd(), 'dist');
app.use(express.static(distPath));

// For SPA client routing fallback (excluding /api)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, err => {
    if (err) {
      // In dev mode when dist doesn't exist yet, return API welcome message
      res.json({
        message: 'Wedding API Server is running. In dev mode, access React client at http://localhost:5173',
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🎉 Wedding Backend Server running on http://localhost:${PORT}`);
  console.log(`💌 APIs available at:`);
  console.log(`   - http://localhost:${PORT}/api/health`);
  console.log(`   - http://localhost:${PORT}/api/wedding-info`);
  console.log(`   - http://localhost:${PORT}/api/wishes`);
  console.log(`   - http://localhost:${PORT}/api/rsvp`);
  console.log(`===============================================`);
});

