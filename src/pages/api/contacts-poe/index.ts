import { NextApiRequest, NextApiResponse } from 'next';

import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/handleResponse.util';

export async function enregistrerContactPOEHandler(req: NextApiRequest, res: NextApiResponse<void | ErrorHttpResponse>) {
  if (req.method !== 'POST') {
    return res.status(406).end();
  }
  const response = await dependencies.contactpoeDependencies.demandeDeContactPOEUsecase.formerPoleEmploi(req.body);
  return handleResponse(response, res);
}

export default monitoringHandler(enregistrerContactPOEHandler);
