const esbuild = require('esbuild');
const { argv } = require('process');

const isWatch = argv.includes('--watch');

/** @type {import('esbuild').BuildOptions} */
const config = {
  entryPoints: ['src/index.ts', 'src/cli.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outdir: 'dist',
  sourcemap: true,
  format: 'cjs',
  external: [
    // External packages that should not be bundled
    'playwright',
    '@aws-sdk/client-bedrock-runtime',
    '@langchain/community',
    '@langchain/core',
    '@langchain/langgraph',
    '@langchain/openai',
    'langchain'
  ],
  logLevel: 'info',
};

if (isWatch) {
  // Watch mode
  esbuild.context(config).then(ctx => {
    ctx.watch();
  }).catch(() => process.exit(1));
} else {
  // Single build
  esbuild.build(config).catch(() => process.exit(1));
}
