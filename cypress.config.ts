import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		baseUrl: 'http://127.0.0.1:3000',
		defaultCommandTimeout: 10000,
		pageLoadTimeout: 100000,
		requestTimeout: 20000,
		screenshotOnRunFailure: false,
		video: false,
	},
});
