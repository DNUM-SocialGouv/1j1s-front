import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { validate } from '~/pages/api/middleware/validate.controller';
import {
	MissionEngagementFiltre,
	NOMBRE_RÉSULTATS_MISSION_PAR_PAGE,
	RésultatsRechercheMission,
} from '~/server/engagement/domain/engagement';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { applyRateLimit } from '~/server/middlewares/rateLimit/rateLimit';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/handleResponse.util';

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
	if (await applyRateLimit(req, res)) return;

	const résultatRechercherMission = await dependencies.engagementDependencies.rechercherMissionEngagement.handle(missionRequestMapper(req));
	return handleResponse(résultatRechercherMission, res);
}

export default monitoringHandler(validate({ query: querySchema }, rechercherMissionHandler));

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
