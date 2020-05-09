import resolve from 'rollup-plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

export default {
  // If using any exports from a symlinked project, uncomment the following:
  // preserveSymlinks: true,
	input: ['demo/entry.js'],
	output: {
		file: 'demo/main.js',
		format: 'es',
		sourcemap: true
	},
	plugins: [
    resolve(), terser()
  ]
};

