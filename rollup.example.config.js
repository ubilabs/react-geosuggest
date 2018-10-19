import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import {uglify} from 'rollup-plugin-uglify';

const env = process.env.NODE_ENV;

export default {
  input: 'example/src/app.tsx',
 
  output: {
    name: 'Geosuggest',
    sourcemap: env === 'production' ? false : 'inline',
    exports: 'none',
    globals: ['google'],
    format: 'iife',
    file: 'example/dist/app.js'
  },
  plugins: [
    typescript(),
    resolve({jsnext: true, main: true, browser: true}),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'react': [ 'Children',
        'Component',
        'PureComponent',
        'PropTypes',
        'createElement',
        'Fragment',
        'cloneElement',
        'StrictMode',
        'createFactory',
        'createRef',
        'createContext',
        'isValidElement',
        'isValidElementType',]
      }
    }),
    replace({'process.env.NODE_ENV': JSON.stringify(env)}),
    env === 'production' && uglify()
  ],
};
