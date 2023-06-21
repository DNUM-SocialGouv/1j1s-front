import { createSuccess } from '~/server/errors/either';
import { FormationInitiale } from '~/server/formations-initiales/domain/formationInitiale';
import {
	FormationInitialeApiResponse,
	OnisepFormationInitialeRepository,
} from '~/server/formations-initiales/infra/onisepFormationInitiale.repository';
import {
	anAuthenticatedHttpClientService,
	anAxiosResponse,
} from '~/server/services/http/publicHttpClient.service.fixture';

function aFormationInitiale(override?: Partial<FormationInitiale>): FormationInitiale {
	return {
		libelle: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
		...override,
	};
}

function aFormationInitialeResponse(override?: Partial<FormationInitialeApiResponse>): FormationInitialeApiResponse {
	return {
		code_nsf: '110',
		code_rncp: '',
		'domainesous-domaine': 'mécanique/automatismes | sciences/chimie | électricité, électronique, robotique/électronique | électricité, électronique, robotique/électrotechnique | mécanique/mécanique (généralités) | sciences/physique | électricité, électronique, robotique/télécommunications',
		duree: '1 an',
		libelle_formation_principal: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
		libelle_niveau_de_certification: 'niveau 5 (bac + 2)',
		libelle_type_formation: 'classe préparatoire scientifique et technologique',
		niveau_de_certification: '3',
		niveau_de_sortie_indicatif: 'Bac + 2',
		sigle_formation: '',
		sigle_type_formation: 'CPGE',
		tutelle: "Ministère chargé de l'Enseignement supérieur et de la Recherche",
		url_et_id_onisep: 'http://www.onisep.fr/http/redirection/formation/slug/FOR.3311',
		...override,
	};
}

describe('onisep formation initiales repository', () => {
	describe('search', () => {
		it('doit appeler l’api onisep avec les bons paramètres', async () => {
			// GIVEN
			const httpClient = anAuthenticatedHttpClientService();
			const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient);

			// WHEN
			await formationInitialeRepository.search();

			// THEN
			expect(httpClient.get).toHaveBeenCalledWith('/dataset/5fa591127f501/search');
		});

		it('doit retourner les formations initiales', async() => {
			// GIVEN
			const httpClient = anAuthenticatedHttpClientService();
			const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient);
			const responseFromApi = anAxiosResponse([aFormationInitialeResponse()]);
			const expectedFormationsInitiales = createSuccess([aFormationInitiale()]);
			jest.spyOn(httpClient, 'get').mockResolvedValueOnce(responseFromApi);

			// WHEN
			const formationsInitiales = await formationInitialeRepository.search();

			// THEN
			expect(formationsInitiales).toStrictEqual(expectedFormationsInitiales);
		});

		describe('en cas d’erreur', () => {
			it.todo('doit logguer les informations de l’erreur');
			it.todo('doit retourner une erreur métier correspondant');
		});
	});
});
