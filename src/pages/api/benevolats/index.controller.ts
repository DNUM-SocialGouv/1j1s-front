import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import {
	MissionEngagement,
	RésultatsRechercheMission,
} from '~/server/engagement/domain/engagement';
import { dependencies } from '~/server/start';

export const missionBenevolatQuerySchema = Joi.object({
	codeCommune: Joi.number().optional(),
	distanceCommune: Joi.number().optional(),
	domain: Joi.string().optional().valid('culture-loisirs', 'education', 'environnement', 'mémoire et citoyenneté', 'prevention-protection', 'sante', 'solidarite-insertion', 'sport', 'vivre-ensemble', 'autre'),
	latitudeCommune: Joi.number().optional(),
	libelleCommune: Joi.string().optional(),
	longitudeCommune: Joi.number().optional(),
	ouvertsAuxMineurs: Joi.boolean().optional(),
	page: Joi.number().min(1).required(),
}).options({ allowUnknown: true });

export async function rechercherMissionHandler(req: NextApiRequest, res: NextApiResponse<RésultatsRechercheMission | ErrorHttpResponse>) {
	const résultatRechercherMission = await dependencies.engagementDependencies.rechercherMissionBénévolat.handle(missionRequestMapper(req));
	return handleResponse(résultatRechercherMission, res);
}

export default withMonitoring(withValidation({ query: missionBenevolatQuerySchema }, rechercherMissionHandler));

function missionRequestMapper(request: NextApiRequest): MissionEngagement.Recherche.Benevolat {
	const { query } = request;

	const missionEngagementFiltre: MissionEngagement.Recherche.Benevolat = {
		domaine: query.domain ? query.domain as MissionEngagement.Recherche.Benevolat.Domain : undefined,
		ouvertAuxMineurs: query.ouvertsAuxMineurs ? true : undefined,
		page: Number(query.page),
	};

	if(query.latitudeCommune && query.longitudeCommune && query.distanceCommune) {
		missionEngagementFiltre.localisation = {
			distance: Number(query.distanceCommune),
			latitude: Number(query.latitudeCommune),
			longitude: Number(query.longitudeCommune),
		};
	}

	return missionEngagementFiltre;
}
