import { AxiosInstance } from 'axios';

import { AnnonceDeLogementAttributesFromCMS } from '~/client/components/features/Logement/AnnonceDeLogement.type';
import { MEILISEARCH_INDEX } from '~/pages/annonces/index.page';

import { AnnonceDeLogementService } from './AnnonceDeLogementService.type';

type AnnonceDeLogementInternalService = {
	data: AnnonceDeLogementDataFromCMS
}

type AnnonceDeLogementDataFromCMS = {
	id: number,
	attributes: AnnonceDeLogementAttributesFromCMS
}

export class AnnonceDeLogementHttpService implements AnnonceDeLogementService {

	constructor(private http: AxiosInstance) {
	}

	async get(id: string): Promise<AnnonceDeLogementAttributesFromCMS> {
		const response = await this.http.get<AnnonceDeLogementInternalService>(`slugify/slugs/${MEILISEARCH_INDEX}/${id}?populate=deep`);
		return response.data.data.attributes;
	}
}
