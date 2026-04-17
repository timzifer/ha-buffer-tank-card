import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const dev = process.env.ROLLUP_WATCH === 'true';

export default {
  input: 'src/buffer-tank-card.ts',
  output: {
    file: 'dist/ha-buffer-tank-card.js',
    format: 'iife',
    name: 'HaBufferTankCard',
    sourcemap: false,
    inlineDynamicImports: true,
  },
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      noEmitOnError: true,
    }),
    !dev && terser({ format: { comments: false } }),
  ].filter(Boolean),
};
