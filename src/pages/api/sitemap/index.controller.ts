import { NextApiRequest, NextApiResponse } from 'next';

import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { dependencies } from '~/server/start';

export default async function générerSitemapXml(req: NextApiRequest, res: NextApiResponse<void | ErrorHttpResponse>) {
	const baseUrl = `https://${process.env.NEXT_PUBLIC_1J1S_DOMAIN}`;
	const sitemap = await dependencies.sitemapDependencies.générerSitemapUseCase.handle(baseUrl);

	res.setHeader('Content-Type', 'text/xml');
	res.write(sitemap);
	res.end();
}
