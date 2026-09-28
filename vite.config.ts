import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Vite dev middleware to execute /api/*.js serverless functions locally
function localApiDevPlugin() {
  return {
    name: 'local-api-dev-plugin',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        const urlPath = req.url.split('?')[0];
        const apiName = urlPath.replace('/api/', '').replace(/\.js$/, '');
        const handlerFile = path.resolve(process.cwd(), `api/${apiName}.js`);

        if (!fs.existsSync(handlerFile)) {
          return next();
        }

        try {
          let rawBody = '';
          req.on('data', (chunk: any) => {
            rawBody += chunk;
          });

          req.on('end', async () => {
            if (rawBody) {
              try {
                req.body = JSON.parse(rawBody);
              } catch {
                req.body = rawBody;
              }
            } else {
              req.body = {};
            }

            // Mock standard Vercel res methods
            res.status = function (code: number) {
              res.statusCode = code;
              return res;
            };

            res.json = function (data: any) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return res;
            };

            // Dynamically load and execute serverless handler
            const handlerModule = await server.ssrLoadModule(`/api/${apiName}.js`);
            const handler = handlerModule.default;

            if (typeof handler === 'function') {
              await handler(req, res);
            } else {
              next();
            }
          });
        } catch (err: any) {
          console.error(`[Local API Error on ${req.url}]:`, err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message || 'Internal Local API Error' }));
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables (.env) into process.env for local API execution
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [react(), localApiDevPlugin()],
  };
});
