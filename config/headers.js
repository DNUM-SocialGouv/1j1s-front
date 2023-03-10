const LOCAL_MODE_HEADERS = [];


const SECURITY_MODE_HEADERS = [{
	headers: [{
		key: 'X-DNS-Prefetch-Control',
		value: 'on',
	}, {
		key: 'Strict-Transport-Security',
		value: 'max-age=63072000; includeSubDomains; preload',
	}, {
		key: 'X-Content-Type-Options',
		value: 'nosniff',
	}, {
		key: 'Referrer-Policy',
		value: 'no-referrer, strict-origin-when-cross-origin',
	}],
	source: '/:path*',
}];

module.exports = { LOCAL_MODE_HEADERS, SECURITY_MODE_HEADERS };
