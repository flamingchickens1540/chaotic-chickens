import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import webSocketServer from './ws.js';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), webSocketServer],
	server: {
		fs: { allow: ['./'] },
		allowedHosts: true
	}
});
