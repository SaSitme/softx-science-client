import { readFile } from 'node:fs/promises';
import { createServer, request } from 'node:http';

const host = '127.0.0.1';
const clientPort = Number(process.env.CLIENT_PORT ?? 5173);
const apiPort = Number(process.env.SOFTX_API_PORT ?? 8000);
const assets = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/style.css', ['style.css', 'text/css; charset=utf-8']],
  ['/app.js', ['app.js', 'text/javascript; charset=utf-8']],
  ['/photovoltaic-banner.webp', ['photovoltaic-banner.webp', 'image/webp']],
]);

function forwardApi(req, res) {
  const { connection, host: incomingHost, 'transfer-encoding': encoding, ...headers } = req.headers;
  const upstream = request({ host, port: apiPort, method: req.method, path: req.url, headers });
  upstream.on('response', (response) => {
    const { connection, 'transfer-encoding': encoding, ...headers } = response.headers;
    res.writeHead(response.statusCode, headers);
    response.pipe(res);
    response.on('error', () => res.destroy());
  });
  upstream.on('error', () => {
    if (res.headersSent) {
      res.destroy();
      return;
    }
    res.writeHead(502, { 'content-type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'Сервер SoftX недоступен' }));
  });
  res.on('close', () => upstream.destroy());
  req.pipe(upstream);
}

createServer(async (req, res) => {
  const path = req.url.split('?')[0];
  if (path.startsWith('/api/')) {
    forwardApi(req, res);
    return;
  }

  const asset = assets.get(path);
  if (!asset) {
    res.writeHead(404).end();
    return;
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { allow: 'GET, HEAD' }).end();
    return;
  }

  try {
    const [filename, contentType] = asset;
    const body = await readFile(new URL(filename, import.meta.url));
    res.writeHead(200, { 'content-type': contentType, 'content-length': body.length });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch {
    res.writeHead(500).end();
  }
}).listen(clientPort, host, () => {
  console.log(`SoftX client: http://${host}:${clientPort}`);
});
