import { NextApiRequest, NextApiResponse } from 'next';

import { DemandeDeContactTipimail } from '~/server/envoie-email/domain/DemandeDeContactTipimail';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/handleResponse.util';

export async function envoyerEmailHandler(req: NextApiRequest, res: NextApiResponse<DemandeDeContactTipimail[] | ErrorHttpResponse>) {
  if (req.method !== 'POST') {
    return res.status(406).end();
  }
  const responseEnvoyerEmail = await dependencies.demandeDeContactMailDependencies.envoyerEmailUseCase.handle(req.body);
  return handleResponse(responseEnvoyerEmail, res);
}

export default monitoringHandler(envoyerEmailHandler);
