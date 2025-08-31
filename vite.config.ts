import { defineConfig } from 'vite'
import router from './router-plugin.ts'

export default defineConfig({
	plugins: [router()],
})
