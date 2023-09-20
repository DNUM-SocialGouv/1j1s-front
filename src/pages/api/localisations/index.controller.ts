import type { NextApiRequest, NextApiResponse } from 'next';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { Localisation, RechercheLocalisation } from '~/server/localisations/domain/localisation';
import { Commune } from '~/server/localisations/domain/localisationAvecCoordonnées';
import {
	CommuneLocalisationApiResponse,
	LocalisationApiResponse,
	RechercheLocalisationApiResponse,
} from '~/server/localisations/infra/controllers/RechercheLocalisationApiResponse';
import { dependencies } from '~/server/start';

export async function rechercherLocalisationHandler(req: NextApiRequest, res: NextApiResponse<RechercheLocalisationApiResponse | ErrorHttpResponse>) {
	const résultatsRechercheLocalisation = await dependencies.localisationDependencies.listeLocalisation
		.handle(rechercheLocalisationRequestMapper(req));
	switch (résultatsRechercheLocalisation.instance) {
		case 'success':
			return res.status(200).json(mapApiResponse(résultatsRechercheLocalisation.result));
		case 'failure':
			switch(résultatsRechercheLocalisation.errorType) {
				case ErreurMetier.SERVICE_INDISPONIBLE:
					return res.status(503).json({ error: résultatsRechercheLocalisation.errorType });
				case ErreurMetier.DEMANDE_INCORRECTE:
					return res.status(400).json({ error: résultatsRechercheLocalisation.errorType });
				case ErreurMetier.CONTENU_INDISPONIBLE:
					return res.status(404).json({ error: résultatsRechercheLocalisation.errorType });
			}
	}
}

function mapLocalisation(localisationApiResponse: Localisation): LocalisationApiResponse {
	return {
		code: localisationApiResponse.code,
		libelle: `${localisationApiResponse.nom} ${localisationApiResponse.code}`,
		nom: localisationApiResponse.nom,
	};
}

function mapCommune(communeApiResponse: Commune): CommuneLocalisationApiResponse {
	return {
		code: communeApiResponse.code,
		codePostal: communeApiResponse.codePostal,
		libelle: communeApiResponse.libelle,
		nom: communeApiResponse.ville,
	};
}

export function mapApiResponse(localisationList: RechercheLocalisation): RechercheLocalisationApiResponse {
	const { communeList, departementList, regionList } = localisationList;

	const communeListApiResponse: CommuneLocalisationApiResponse[] = communeList.map(mapCommune);
	const départementListApiResponse: LocalisationApiResponse[] = departementList.slice(0,20).map(mapLocalisation);
	const régionListApiResponse: LocalisationApiResponse[] = regionList.slice(0,20).map(mapLocalisation);
	return { communeList: communeListApiResponse, departementList: départementListApiResponse, regionList: régionListApiResponse };
}
export default withMonitoring(rechercherLocalisationHandler);

export function rechercheLocalisationRequestMapper(request: NextApiRequest): string {
	const { query } = request;

	return String(query.recherche);
}
