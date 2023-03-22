import { stringify } from 'querystring';

import { OffreQueryParams } from '~/client/hooks/useOffreQuery';
import { HttpClientService } from '~/client/services/httpClient.service';
import { Either } from '~/server/errors/either';
import { RésultatsRechercheOffre } from '~/server/offres/domain/offre';
import { removeUndefinedKeys } from '~/server/removeUndefinedKeys.utils';

export class OffreService {

	constructor(private httpClientService: HttpClientService) {}

	async rechercherOffreEmploi(query: OffreQueryParams): Promise<Either<RésultatsRechercheOffre>> {
		// FIXME (GAFI 20-03-2023): cf commentaire dans l'interface OffreQueryParams
		const sanitizedQuery = removeUndefinedKeys(query);
		const queryString = stringify(sanitizedQuery);
		return this.httpClientService.get<RésultatsRechercheOffre>(`emplois?${queryString}`);
	}

	async rechercherJobÉtudiant(query: OffreQueryParams): Promise<Either<RésultatsRechercheOffre>> {
		// FIXME (GAFI 20-03-2023): cf commentaire dans l'interface OffreQueryParams
		const sanitizedQuery = removeUndefinedKeys(query);
		const queryString = stringify(sanitizedQuery);
		return this.httpClientService.get<RésultatsRechercheOffre>(`jobs-etudiants?${queryString}`);
	}
	async rechercherAlternance(query: OffreQueryParams): Promise<Either<RésultatsRechercheOffre>> {
		// FIXME (GAFI 20-03-2023): cf commentaire dans l'interface OffreQueryParams
		const sanitizedQuery = removeUndefinedKeys(query);
		const queryString = stringify(sanitizedQuery);
		return this.httpClientService.get<RésultatsRechercheOffre>(`alternances-pole-emploi?${queryString}`);
	}
}
