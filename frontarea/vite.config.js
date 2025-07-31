import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	base : '/https://ohjihwan.github.io/petplanbook2/',
	plugins: [react()],
})