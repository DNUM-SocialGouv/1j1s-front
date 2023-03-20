import { stringify } from 'querystring';

import { OffreQueryParams } from '~/client/hooks/useOffreQuery';
import { HttpClientService } from '~/client/services/httpClient.service';
import { removeNullOrEmptyValue } from '~/client/utils/removeNullOrEmptyValue.util';
import { Either } from '~/server/errors/either';
import { RésultatsRechercheOffre } from '~/server/offres/domain/offre';
import { removeUndefinedKeys } from '~/server/removeUndefinedKeys.utils';

export class OffreService {

	constructor(private httpClientService: HttpClientService) {}

	async rechercherOffreEmploi(query: string): Promise<Either<RésultatsRechercheOffre>> {
		return this.httpClientService.get<RésultatsRechercheOffre>(`emplois?${query}`);
	}

	async rechercherJobÉtudiant(query: string): Promise<Either<RésultatsRechercheOffre>> {
		return this.httpClientService.get<RésultatsRechercheOffre>(`jobs-etudiants?${query}`);
	}

	// FIXME (GAFI 20-03-2023): remplacer le type de `query` dans les autres usecases pour prendre une interface
	async rechercherAlternance(query: OffreQueryParams): Promise<Either<RésultatsRechercheOffre>> {
		const sanitizedQuery = removeUndefinedKeys(query);

		// FIXME (GAFI 20-03-2023): Pas super clean ça, on peut pas trouver mieux genre s'assurer que l'interface elle-même
		//  étend Record<> ?
		const queryString = stringify(sanitizedQuery as Record<string, string>);

		return this.httpClientService.get<RésultatsRechercheOffre>(`alternances-pole-emploi?${queryString}`);
	}
}
