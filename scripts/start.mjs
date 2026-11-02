/* npm start : runs the API and the website side by side in one process, for hosts that give the app a
   single port (Azure App Service). The website listens on $PORT and its /api route forwards to the API
   on API_PORT, so only the website is public. With Docker, use docker-compose.yml instead. */
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const webPort = process.env.PORT || '8080';
const apiPort = process.env.API_PORT || '4000';
const env = { NODE_ENV: 'production', ...process.env };

function run(name, script, extraEnv, onExit) {
  const child = spawn(process.execPath, [path.join(root, script)], {
    cwd: root,
    env: { ...env, ...extraEnv },
    stdio: 'inherit',
  });
  child.on('exit', (code, signal) => onExit(code, signal));
  return child;
}

let api;
let stopping = false;

/* The API stopping (for example while the database is not set up yet) must not take the website down. */
function startApi() {
  api = run('api', 'apps/api/dist/main.js', { PORT: apiPort }, (code, signal) => {
    if (stopping) return;
    console.error(`[start] API stopped (${signal || code}), restarting in 5s`);
    setTimeout(startApi, 5000);
  });
}

startApi();
const web = run(
  'web',
  'apps/web/.next/standalone/apps/web/server.js',
  { PORT: webPort, HOSTNAME: '0.0.0.0', API_INTERNAL_URL: process.env.API_INTERNAL_URL || `http://127.0.0.1:${apiPort}` },
  (code, signal) => {
    console.error(`[start] website stopped (${signal || code})`);
    shutdown(code ?? 1);
  },
);
console.log(`[start] website on :${webPort}, API on :${apiPort}`);

function shutdown(code = 0) {
  stopping = true;
  api?.kill('SIGTERM');
  web.kill('SIGTERM');
  setTimeout(() => process.exit(code), 3000).unref();
}
process.on('SIGTERM', () => shutdown(0));
process.on('SIGINT', () => shutdown(0));
