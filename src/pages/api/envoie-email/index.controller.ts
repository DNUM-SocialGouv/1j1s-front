import { NextApiRequest, NextApiResponse } from 'next';

import { EnvoieEmail } from '~/server/envoie-email/domain/EnvoieEmail';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/handleResponse.util';

export async function envoyerEmailHandler(req: NextApiRequest, res: NextApiResponse<EnvoieEmail[] | ErrorHttpResponse>) {
  if (req.method !== 'POST') {
    return res.status(406).end();
  }
  const response = await dependencies.envoyerEmailDependencies.envoyerEmailUseCase.handle(req.body);
  return handleResponse(response, res);
}

export default monitoringHandler(envoyerEmailHandler);
