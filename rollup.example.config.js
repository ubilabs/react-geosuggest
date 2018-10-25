import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import {uglify} from 'rollup-plugin-uglify';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const env = process.env.NODE_ENV;

export default {
  input: 'example/src/app.tsx',
 
  output: {
    name: 'Geosuggest',
    sourcemap: env === 'production' ? false : 'inline',
    exports: 'none',
    globals: {
	  'google': 'google',
      'react': 'React',
	  'react-dom': 'ReactDOM',
	},
    format: 'iife',
    file: 'example/dist/app.js'
  },
  plugins: [
    peerDepsExternal(),
    typescript(),
    resolve({jsnext: true, main: true, browser: true}),
    commonjs({
      include: 'node_modules/**',
    }),
    replace({'process.env.NODE_ENV': JSON.stringify(env)}),
    env === 'production' && uglify()
  ],
};
