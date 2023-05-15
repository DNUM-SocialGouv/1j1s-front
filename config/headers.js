const LOCAL_MODE_HEADERS = [];

const STRAPI_MEDIA_HOST = new URL(process.env.STRAPI_MEDIA_URL).hostname;
const TRUSTED_SOURCES = '*.fabrique.social.gouv.fr *.meilisearch.io/multi-search 1j1s-front.osc-fr1.scalingo.io *.1jeune1solution.gouv.fr';
const ANALYTICS_SOURCES = `${process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN}`;
const contentSecurityPolicy = `
  default-src 'self' ${TRUSTED_SOURCES};
  script-src 'self' ${ANALYTICS_SOURCES} https://*.adform.net;
  img-src 'self' *.google.com data: ${STRAPI_MEDIA_HOST} ${ANALYTICS_SOURCES} img.youtube.com;
  style-src 'self' 'unsafe-inline';
  frame-ancestors 'none';
  frame-src 'self' *.apprentissage.beta.gouv.fr immersion-facile.beta.gouv.fr deposer-offre.www.1jeune1solution.gouv.fr *.youtube-nocookie.com simulateur-alternance.1jeune1solution.gouv.fr;
  form-action 'self';
  base-uri 'none';
`;

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
	}, {
		key: 'Content-Security-Policy',
		value: contentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
	}],
	source: '/:path*',
}];

module.exports = { LOCAL_MODE_HEADERS, SECURITY_MODE_HEADERS };
