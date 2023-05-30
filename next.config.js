const { LOCAL_MODE_HEADERS, SECURITY_MODE_HEADERS } = require('./config/headers');
const { ALL_MODE_REDIRECT } = require('./config/redirects');
const { ALL_MODE_REWRITE } = require('./config/rewrites');
const { name, version } = require('./package.json');
const { withSentryConfig } = require('@sentry/nextjs');
const { URL } = require('url');

const IS_ONLINE_CONFIG_ENVIRONMENT = ['recette', 'production'];
const NODE_ENV_ENABLE_SOURCEMAP = 'production';
const isOnlineEnvironment = IS_ONLINE_CONFIG_ENVIRONMENT.includes(process.env.ENVIRONMENT);

const shouldUploadSourceMap = (env = process.env) =>
	IS_ONLINE_CONFIG_ENVIRONMENT.includes(env.NEXT_PUBLIC_SENTRY_ENVIRONMENT)
	&& env.NODE_ENV === NODE_ENV_ENABLE_SOURCEMAP;

const DISABLE_UPLOAD_SOURCEMAP = !shouldUploadSourceMap();

function getHostName(uri) {
	return new URL(uri).hostname;
}

function getImagesRemotePattern() {
	const logementUrlList = process.env.LOGEMENT_IMAGE_URL_LIST.split(',');
	return logementUrlList.map((url) => {
		return {
			hostname: url,
			protocol: 'https',
		};
	});
}

const CMS_HOST = getHostName(process.env.STRAPI_URL_API);
const API_POLE_EMPLOI_HOST = getHostName(process.env.POLE_EMPLOI_CONNECT_URL);
const STRAPI_MEDIA_URL = getHostName(process.env.STRAPI_MEDIA_URL);


const sentryModuleExports = {
	disableClientWebpackPlugin: DISABLE_UPLOAD_SOURCEMAP,
	disableServerWebpackPlugin: DISABLE_UPLOAD_SOURCEMAP,
	hideSourceMaps: true,
	silent: true,
};

const moduleExports = {
	compress: true,
	env: {
		NEXT_PUBLIC_APPLICATION_NAME: name,
		NEXT_PUBLIC_APPLICATION_VERSION: version,
	},
	images: {
		remotePatterns: [
			...getImagesRemotePattern(),
			{
				hostname: API_POLE_EMPLOI_HOST,
				protocol: 'https',
			},
			{
				hostname: STRAPI_MEDIA_URL,
				protocol: 'https',
			},
			{
				hostname: CMS_HOST,
				protocol: 'https',
			},
			{
				hostname: 'img.youtube.com',
				protocol: 'https',
			},
		],
	},
	pageExtensions: ['page.tsx','controller.ts'],
	poweredByHeader: false,
	reactStrictMode: true,
	redirects: async () => ALL_MODE_REDIRECT,
	rewrites: async () => ALL_MODE_REWRITE,
	webpack(config, { isServer }) {
		if (!isServer) {
			config.optimization.mergeDuplicateChunks = true;
			config.optimization.splitChunks.cacheGroups = {
				...config.optimization.splitChunks.cacheGroups,
				'@sentry': {
					name: '@sentry',
					priority: 10,
					reuseExistingChunk: false,
					test: /[\\/]node_modules[\\/](@sentry)[\\/]/,
				},
			};
		}

		return config;
	},
};

module.exports = isOnlineEnvironment
	? withSentryConfig(
		{
			...moduleExports,
			headers: async () => SECURITY_MODE_HEADERS,
			sentry: sentryModuleExports,
		}, sentryModuleExports)
	: {
		...moduleExports,
		headers: async () => LOCAL_MODE_HEADERS,
	};
