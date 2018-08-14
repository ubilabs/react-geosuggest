import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import {uglify} from 'rollup-plugin-uglify';

const env = process.env.NODE_ENV;

export default {
  input: 'example/src/app.tsx',
  plugins: [
    typescript(),
    resolve({jsnext: true, main: true, browser: true}),
    commonjs(),
    replace({'process.env.NODE_ENV': JSON.stringify(env)}),
    env === 'production' && uglify()
  ],
  output: {
    name: 'Geosuggest',
    sourcemap: env === 'production' ? false : 'inline',
    exports: 'none',
    globals: ['google'],
    format: 'iife',
    file: 'example/dist/app.js'
  }
};
