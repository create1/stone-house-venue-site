// Simple HTTP server for Stone House website
// Run with: node server.js

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf'
};

const server = http.createServer((req, res) => {
  // Parse URL and remove query string
  let filePath = '.' + req.url.split('?')[0];

  // Default to index.html
  if (filePath === './') {
    filePath = './index.html';
  }

  // Get file extension
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // Read and serve file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Page Not Found</h1>', 'utf-8');
      } else {
        // Server error
        res.writeHead(500);
        res.end('Sorry, there was an error: ' + error.code + ' ..\n');
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log('🏛️  Stone House Venue Site - Development Server');
  console.log('='.repeat(60));
  console.log(`\n✅ Server running at http://localhost:${PORT}/`);
  console.log(`\n📂 Serving files from: ${__dirname}`);
  console.log('\n🌐 Open your browser to: http://localhost:8080/');
  console.log('\n⌨️  Press Ctrl+C to stop the server\n');
  console.log('='.repeat(60));
});
