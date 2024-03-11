import { NextApiRequest, NextApiResponse } from 'next';

import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { dependencies } from '~/server/start';

export default async function générerSitemapXml(req: NextApiRequest, res: NextApiResponse<void | ErrorHttpResponse>) {
	const sitemap = await dependencies.sitemapDependencies.générerSitemapUseCase.handle();

	res.setHeader('Content-Type', 'text/xml');
	res.write(sitemap);
	res.end();
}
