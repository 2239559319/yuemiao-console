import typescript from '@rollup/plugin-typescript';

const globals = {
  axios: 'axios',
  vue: 'Vue',
  'vue-router': 'VueRouter'
};

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  external: Object.keys(globals),
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'iife',
    globals,
    interop: false
  },
  plugins: [
    typescript()
  ]
};

export default config;
