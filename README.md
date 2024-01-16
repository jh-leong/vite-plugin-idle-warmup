# vite-plugin-idle-warmup

[![npm version][npm-version-src]][npm-version-href] [![npm downloads][npm-downloads-src]][npm-downloads-href] [![bundle][bundle-src]][bundle-href] [![JSDocs][jsdocs-src]][jsdocs-href] [![License][license-src]][license-href]

🚀 Optimize your Vite app's speed by warming up Vite's transform cache during server idle periods.

## why

Vite comes with a powerful built-in feature for warming up the cache, as outlined in [Warm Up Frequently Used Files](https://vitejs.dev/guide/performance.html#warm-up-frequently-used-files) and [vite-plugin-warmup](https://github.com/bluwy/vite-plugin-warmup).

However, when we want to warm up resources for lazily loaded pages, the fact that Vite's transform cache is generated during server startup can lead to longer initial page load times.

`vite-plugin-idle-warmup` is a Vite plugin that optimizes server response times by performing idle warming up of Vite's transform cache during server idle periods. It helps to enhance the user experience by reducing the loading times for subsequent requests.

## Usage

> Example project: [playground](./playground)

### Setup

Install `vite-plugin-idle-warmup`:

```bash
npm i -D vite-plugin-idle-warmup
```

Use the Vite plugin:

```ts
// vite.config.js
import { defineConfig } from 'vite';
import idleWarmup from 'vite-plugin-idle-warmup';

export default defineConfig({
  plugins: [idleWarmup({ files: ['./src/foo.ts', './src/BarComp.vue'] })],
});
```

The files can be direct file names or glob patterns using [fast-glob](https://github.com/mrmlnc/fast-glob).

## License

[MIT](./LICENSE) License © 2024-PRESENT [Tycho](https://github.com/jh-leong)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/vite-plugin-idle-warmup?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/vite-plugin-idle-warmup
[npm-downloads-src]: https://img.shields.io/npm/dm/vite-plugin-idle-warmup?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/vite-plugin-idle-warmup
[bundle-src]: https://img.shields.io/bundlephobia/minzip/vite-plugin-idle-warmup?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=vite-plugin-idle-warmup
[license-src]: https://img.shields.io/github/license/jh-leong/vite-plugin-idle-warmup.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/jh-leong/vite-plugin-idle-warmup/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/vite-plugin-idle-warmup
