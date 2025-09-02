import { defineConfig } from 'vite'
import router from './router-plugin.ts'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
// import rollupNodePolyFill from "rollup-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		nodePolyfills({
			include: [
				'util',
				'events',
				'http2',
				'stream',
				'buffer',
				'crypto',
				'timers',
				'timers/promises',
				'process'
			],
			globals: { global: true, process: true },
			protocolImports: true,
		}),
		router(),
		// rollupNodePolyFill({})
	],
	resolve: {
		alias: {
			//FIXME: this \/
            util: 'node_modules/rollup-plugin-node-polyfills/polyfills/util.js',
            'util/types': 'node_modules/rollup-plugin-node-polyfills/polyfills/util.js',
            'node:util': 'node_modules/rollup-plugin-node-polyfills/polyfills/util.js',
            'node:util/types': 'node_modules/rollup-plugin-node-polyfills/polyfills/util.js',
            'stream': 'node_modules/rollup-plugin-node-polyfills/polyfills/stream.js',
		}
	}
})
