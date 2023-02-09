import { NextApiRequest, NextApiResponse } from 'next';

import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { dependencies } from '~/server/start';

export default async function générerRobotsTxt(req: NextApiRequest, res: NextApiResponse<void | ErrorHttpResponse>) {
	const robots = await dependencies.robotsDependencies.générerRobotsUseCase.handle();

	res.setHeader('Content-Type', 'plain/text');
	res.write(robots);
	res.end();
}
