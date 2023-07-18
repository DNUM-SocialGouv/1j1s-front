import { StrapiRepository } from '~/server/cms/infra/repositories/strapi.repository';
import { createFailure, Failure, Success } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';
import { aFicheMetier } from '~/server/fiche-metier/domain/ficheMetier.fixture';
import { FicheMetierRepository } from '~/server/fiche-metier/domain/ficheMetier.repository';
import {
	aStrapiCollectionFicheMetier,
	aStrapiFicheMetierNomMetierList, aStrapiPage2FicheMetierNomMetierList,
} from '~/server/fiche-metier/infra/strapiFicheMetier.fixture';
import { StrapiFicheMetierRepository } from '~/server/fiche-metier/infra/strapiFicheMetier.repository';
import { anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';
import {
	anAuthenticatedHttpClientService,
	anAxiosResponse,
} from '~/server/services/http/publicHttpClient.service.fixture';
import { aFicheMetierNomMetierList } from '~/server/sitemap/domain/sitemap.fixture';

describe('strapiFicherMetierRepository', () => {
	let httpClientService: PublicHttpClientService;
	let authenticatedHttpClientService: AuthenticatedHttpClientService;
	let strapiCmsRepository: StrapiRepository;
	let strapiFicheMetierRepository: FicheMetierRepository;
	const expectedFailure = ErreurMétier.CONTENU_INDISPONIBLE;

	beforeEach(() => {
		httpClientService = anAuthenticatedHttpClientService();
		const errorManagementService = anErrorManagementService({ handleFailureError: jest.fn(() => createFailure(expectedFailure)) });
		strapiCmsRepository = new StrapiRepository(httpClientService, authenticatedHttpClientService, errorManagementService);
		strapiFicheMetierRepository = new StrapiFicheMetierRepository(strapiCmsRepository);
	});

	describe('getFicheMetierByNom', () => {
		const nomMetier = 'Mon super metier';
		const expectedFicheMetier = aFicheMetier();

		it('appelle l‘endpoint avec les bons paramètres', async () => {
			jest.spyOn(httpClientService, 'get');

			await strapiFicheMetierRepository.getFicheMetierByNom(nomMetier);

			expect(httpClientService.get).toHaveBeenCalledWith(`fiche-metiers?filters[nom_metier][$eq]=${encodeURIComponent(nomMetier)}&populate=deep&pagination[pageSize]=100&pagination[page]=1`);
		});

		describe('Si une fiche métier est trouvée', () => {
			it('récupère la fiche métier selon le nom', async () => {
				(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse(aStrapiCollectionFicheMetier()));

				const result = await strapiFicheMetierRepository.getFicheMetierByNom(nomMetier) as Success<FicheMétier>;

				expect(result.result).toEqual(expectedFicheMetier);
			});
		});

		describe('Si aucune fiche métier n‘est trouvée', () => {
			it('retourne une erreur', async () => {
				jest.spyOn(httpClientService, 'get').mockRejectedValue(anHttpError(404));

				const result = await strapiFicheMetierRepository.getFicheMetierByNom(nomMetier) as Failure;

				expect(result.errorType).toEqual(expectedFailure);
			});
		});
	});
	
	describe('listAllFicheMetierNomMetier', () => {
		it('liste tous les noms métier des fiches metier', async () => {
			jest.spyOn(httpClientService, 'get')
				.mockResolvedValueOnce(anAxiosResponse(aStrapiFicheMetierNomMetierList()))
				.mockResolvedValueOnce(anAxiosResponse(aStrapiPage2FicheMetierNomMetierList()));
			const expected = aFicheMetierNomMetierList();

			const { result } = await strapiFicheMetierRepository.listAllFicheMetierNomMetier() as Success<Array<string>>;

			expect(result).toEqual(expected);
			expect(httpClientService.get).toHaveBeenNthCalledWith(1, 'fiche-metiers?fields[]=nom_metier&pagination[pageSize]=100&pagination[page]=1');
			expect(httpClientService.get).toHaveBeenNthCalledWith(2, 'fiche-metiers?fields[]=nom_metier&pagination[pageSize]=100&pagination[page]=2');
		});
	});
});
