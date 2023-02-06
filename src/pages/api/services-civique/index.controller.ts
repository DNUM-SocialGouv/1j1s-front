import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import {
	MissionEngagementFiltre,
	NOMBRE_RÉSULTATS_MISSION_PAR_PAGE,
	RésultatsRechercheMission,
} from '~/server/engagement/domain/engagement';
import { dependencies } from '~/server/start';

const querySchema = Joi.object({
	codeCommune: Joi.number().optional(),
	distanceCommune: Joi.string().optional(),
	domain: Joi.string().optional(),
	latitudeCommune: Joi.number().optional(),
	libelleCommune: Joi.string().optional(),
	longitudeCommune: Joi.number().optional(),
	ouvertsAuxMineurs: Joi.boolean().optional(),
	page: Joi.number().min(1).required(),
});

export async function rechercherMissionHandler(req: NextApiRequest, res: NextApiResponse<RésultatsRechercheMission | ErrorHttpResponse>) {
	const résultatRechercherMission = await dependencies.engagementDependencies.rechercherMissionEngagement.handle(missionRequestMapper(req));
	return handleResponse(résultatRechercherMission, res);
}

export default withMonitoring(withValidation({ query: querySchema }, rechercherMissionHandler));

function missionRequestMapper(request: NextApiRequest): MissionEngagementFiltre {
	const { query } = request;
	const SERVICE_CIVIQUE_ID = '5f99dbe75eb1ad767733b206';

	return {
		distance: query.distanceCommune ? String(query.distanceCommune) : undefined,
		domain: query.domain ? String(query.domain) : '',
		from: Number(query.page),
		lat: query.latitudeCommune ? Number(query.latitudeCommune) : undefined,
		lon: query.longitudeCommune ? Number(query.longitudeCommune) : undefined,
		openToMinors: query.ouvertsAuxMineurs ? true : undefined,
		publisher: SERVICE_CIVIQUE_ID,
		size: NOMBRE_RÉSULTATS_MISSION_PAR_PAGE,
	};
}
