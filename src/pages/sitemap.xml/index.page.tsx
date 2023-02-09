import { GetServerSidePropsContext } from 'next';

import { dependencies } from '~/server/start';

export default function SiteMap() {
	return null;
}

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
	const baseUrl = `https://${req.headers.host}`;
	const sitemap = await dependencies.sitemapDependencies.générerSitemapUseCase.handle(baseUrl);

	res.setHeader('Content-Type', 'text/xml');
	res.write(sitemap);
	res.end();

	return {
		props: {},
	};
}
