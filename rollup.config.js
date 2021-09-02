import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const globals = {
  axios: 'axios',
  vue: 'Vue',
  'vue-router': 'VueRouter',
  moment: 'moment'
};

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  external: Object.keys(globals),
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'iife',
      globals,
      interop: false,
    },
    {
      file: 'dist/index.min.js',
      format: 'iife',
      globals,
      interop: false,
      plugins: [terser()]
    }
  ],
  plugins: [typescript()],
};

export default config;
