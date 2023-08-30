import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const env = process.env.NODE_ENV;

export default {
  input: 'src/Geosuggest.tsx',
  plugins: [
    peerDepsExternal(),
    typescript(),
    resolve({jsnext: true, main: true, browser: true}),
    commonjs(),
    replace({
      preventAssignment: true,
      values: {'process.env.NODE_ENV': JSON.stringify(env)}
    }),
    env === 'production' && terser()
  ],
  output: {
    name: 'Geosuggest',
    sourcemap: false,
    globals: {
      google: 'google',
      react: 'React',
      'react-dom': 'ReactDOM',
      'react-dom/client': 'ReactDOM'
    },
    format: 'iife',
    file:
      env === 'production'
        ? 'dist/react-geosuggest.min.js'
        : 'dist/react-geosuggest.js'
  }
};
