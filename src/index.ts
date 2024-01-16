import fastGlob from 'fast-glob';
import createDebug from 'debug';
import { Plugin, ViteDevServer } from 'vite';
import { warmupFile } from 'vite-plugin-warmup';

export interface Options {
  /**
   * The files can be direct file names or glob patterns using `fast-glob`
   */
  files: string[];
  /**
   * @default 300
   */
  ms?: number;
}

const { globSync } = fastGlob;

const NAME = 'vite-plugin-idle-warmup';
const debug = createDebug(NAME);

export default function idleWarmup(options: Options): Plugin {
  let server: ViteDevServer;
  let pendingRequestsMap: Map<string, unknown>;

  const { ms = 300 } = options;
  const files = mapFiles(options.files);

  const fire = () => setTimeout(() => tryWarmup(), ms);

  let pending = false;
  async function tryWarmup() {
    try {
      if (!files.length) return;

      if (pendingRequestsMap.size || pending) {
        fire();
        return;
      }

      pending = true;

      const file = files.shift()!;
      debug(`warmup file: ${file}`);
      await warmupFile(server, file, false);

      tryWarmup();
    } finally {
      pending = false;
    }
  }

  return {
    name: NAME,
    apply: 'serve',
    configureServer(_server) {
      server = _server;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pendingRequestsMap = (_server as any)._pendingRequests;

      let init = false;
      _server.httpServer?.on('request', () => {
        if (init) return;
        init = true;
        fire();
        console.log('init');
      });
    },
  };
}

function mapFiles(files: string[]): string[] {
  return globSync(files, {
    dot: true,
    absolute: true,
  });
}
