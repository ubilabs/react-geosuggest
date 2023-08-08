import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import {dts} from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';

const env = process.env.NODE_ENV;

export default [
  {
    input: 'src/Geosuggest.tsx',
    plugins: [
      peerDepsExternal(),
      typescript({
        tsconfig: './tsconfig.module.json',
        useTsconfigDeclarationDir: true
      }),
      resolve({jsnext: true, main: true, browser: true}),
      commonjs(),
      replace({
        preventAssignment: true,
        values: {'process.env.NODE_ENV': JSON.stringify(env)}
      })
    ],
    output: [
      {
        name: 'Geosuggest',
        sourcemap: false,
        globals: {
          google: 'google',
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-dom/client': 'ReactDOM',
          classnames: 'classnames',
          'lodash.debounce': 'debounce'
        },
        file: 'module/Geosuggest.umd.js',
        format: 'umd'
      },
      {
        name: 'Geosuggest',
        sourcemap: false,
        globals: {
          google: 'google',
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        file: 'module/Geosuggest.esm.js',
        format: 'esm'
      }
    ],
    external: ['classnames', 'lodash.debounce']
  },
  {
    input: 'module/types/index.d.ts',
    output: [{file: 'module/Geosuggest.d.ts', format: 'es'}],
    plugins: [dts(), del({hook: 'buildEnd', targets: './module/types'})]
  }
];
