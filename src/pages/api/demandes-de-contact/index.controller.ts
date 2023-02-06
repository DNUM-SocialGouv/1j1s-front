import { NextApiRequest, NextApiResponse } from 'next';

import { DemandeDeContactType } from '~/server/demande-de-contact/domain/demandeDeContact';
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

	const { type } = req.body;
	const command = req.body;
	delete command.type;
	let response;

	switch(type as DemandeDeContactType) {
		case 'CEJ': {
			response = await dependencies.demandeDeContactDependencies.envoyerDemandeDeContactCEJUseCase.handle(req.body);
			break;
		}
		case 'LesEntreprisesSEngagent': {
			response = await dependencies.demandeDeContactDependencies.envoyerDemandeDeContactEntrepriseUseCase.handle(req.body);
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
