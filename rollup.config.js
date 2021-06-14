import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'lib/index.ts',
  output: [
    {
      file: 'dist/cjs.js',
      format: 'cjs',
      exports: 'named',
    },
    {
      file: 'dist/index.js',
      format: 'es',
      exports: 'named',
    },
  ],
  plugins: [resolve(), commonjs(), typescript()],
};
