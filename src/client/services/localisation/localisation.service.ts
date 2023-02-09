import { HttpClientService } from '~/client/services/httpClient.service';
import { Either } from '~/server/errors/either';
import { RésultatsRechercheCommune } from '~/server/localisations/domain/localisationAvecCoordonnées';
import {
	RechercheLocalisationApiResponse,
} from '~/server/localisations/infra/controllers/RechercheLocalisationApiResponse';

export class LocalisationService {
	constructor(private readonly httpClientService: HttpClientService ) {}
	private DEPARTEMENT_LENGTH = 2;
	private CODE_POSTAL_LENGTH = 5;
	private REGEX_ALL_LETTRES_AVEC_ACCENTS_TIRET_ESPACE_AND_DIGITS = new RegExp(/^[\da-zA-ZÀ-ÖØ-öø-ÿ-\\-\\ ]+$/);
	private REGEX_ALL_DIGITS = new RegExp(/^\d*$/);

	async rechercherLocalisation(recherche: string): Promise<Either<RechercheLocalisationApiResponse> | null> {
		const localisationsLength = recherche.length;
		const queryTooShort = localisationsLength === 1;
		const containsInvalidSymbols = !this.REGEX_ALL_LETTRES_AVEC_ACCENTS_TIRET_ESPACE_AND_DIGITS.test(recherche);
		const allDigits = this.REGEX_ALL_DIGITS.test(recherche);
		const isDepartement = allDigits && recherche.length === this.DEPARTEMENT_LENGTH;
		const isCodePostal = allDigits && recherche.length === this.CODE_POSTAL_LENGTH;

		if(queryTooShort) {
			return null;
		}
		if(containsInvalidSymbols) {
			return null;
		}
		if(allDigits
			&& !isDepartement
			&& !isCodePostal) {
			return null;
		}

		return this.httpClientService.get<RechercheLocalisationApiResponse>(`localisations?recherche=${recherche}`);
	}

	async rechercherCommune(recherche:string): Promise<Either<RésultatsRechercheCommune>> {
		return this.httpClientService.get<RésultatsRechercheCommune>(`communes?q=${recherche}`);
	}
}
