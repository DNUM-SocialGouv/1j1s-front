import { NextApiRequest, NextApiResponse } from 'next';

import { DemandeDeContactType } from '~/server/demande-de-contact/domain/DemandeDeContact';
import { createFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/handleResponse.util';

export async function enregistrerDemandeDeContactHandler(req: NextApiRequest, res: NextApiResponse<void | ErrorHttpResponse>) {
  if (req.method !== 'POST') {
    return res.status(406).end();
  }
  const { type } = JSON.parse(req.body);
  const command = req.body;
  delete command.type;
  let response;

  switch(type as DemandeDeContactType) {
    case 'CEJ': {
      const body = JSON.parse(req.body);
      delete body['type'];
      response = await dependencies.demandeDeContactDependencies.envoyerDemanderDeContactCEJUseCase.handle(body);
      break;
    }
    case 'LesEntreprisesSEngagent': {
      response = await dependencies.demandeDeContactDependencies.envoyerDemanderDeContactEntrepriseUseCase.handle(req.body);
      break;
    }
    default: {
      response = createFailure(ErreurMétier.DEMANDE_INCORRECTE);
      break;
    }
  }

  return handleResponse(response, res);
}

export default monitoringHandler(enregistrerDemandeDeContactHandler);
