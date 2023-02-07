const { LOCAL_MODE_HEADERS,SECURITY_MODE_HEADERS } = require('./config/headers');
const { ALL_MODE_REDIRECT } = require('./config/redirects');
const { name, version } = require('./package.json');
const { withSentryConfig } = require('@sentry/nextjs');
const { URL } = require('url');

const IS_ONLINE_CONFIG_ENVIRONNEMENT = ['integration', 'production'];
const NODE_ENV_ENABLE_SOURCEMAP = 'production';
const isProduction = process.env.NODE_ENV === 'production';

const shouldUploadSourceMap = (env = process.env) =>
	IS_ONLINE_CONFIG_ENVIRONNEMENT.includes(env.NEXT_PUBLIC_SENTRY_ENVIRONMENT)
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
const BUCKET_S3_URL = process.env.BUCKET_S3_URL;


const sentryModuleExports = {
	disableClientWebpackPlugin: DISABLE_UPLOAD_SOURCEMAP,
	disableServerWebpackPlugin: DISABLE_UPLOAD_SOURCEMAP,
	hideSourceMaps: true,
	silent: true,
};

const moduleExports = {
	// staticPageGenerationTimeout: 1000,
	compress: true,
	env: {
		NEXT_PUBLIC_APPLICATION_NAME: name,
		NEXT_PUBLIC_APPLICATION_VERSION: version,
	},
	images: {
		domains: [
			CMS_HOST,
			API_POLE_EMPLOI_HOST,
			BUCKET_S3_URL,
			STRAPI_MEDIA_URL,
		],
		remotePatterns: getImagesRemotePattern(),
	},
	pageExtensions: ['page.tsx','controller.ts'],
	poweredByHeader: false,
	reactStrictMode: true,
	redirects: async () => ALL_MODE_REDIRECT,
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

module.exports = isProduction
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
