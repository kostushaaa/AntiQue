import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		allowedHosts: true,
		port: 8080,
		https: {
			pfx: fs.readFileSync(path.resolve(__dirname, 'keystore.p12')),
			passphrase: 'password' // если есть
		},
	},
});
