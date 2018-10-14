import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

const env = process.env.NODE_ENV;

export default {
  input: 'src/Geosuggest.tsx',
  plugins: [
    typescript({useTsconfigDeclarationDir: true}),
    resolve({jsnext: true, main: true, browser: true}),
    commonjs({
      namedExports: {
        'node_modules/react/index.js': ['createElement', 'Component', 'PureComponent']
      }
    }),
    replace({'process.env.NODE_ENV': JSON.stringify(env)})
  ],
  output: [
    {
      name: 'Geosuggest',
      sourcemap: false,
      globals: ['google'],
      external: ['react'],
      file: 'module/Geosuggest.umd.js',
      format: 'umd'
    },
    {
      name: 'Geosuggest',
      sourcemap: false,
      globals: ['google'],
      external: ['react'],
      file: 'module/Geosuggest.esm.js',
      format: 'esm'
    }
  ]
};
