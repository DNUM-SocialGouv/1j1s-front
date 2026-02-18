import { aStrapiService } from '~/server/cms/infra/repositories/strapi.service.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { aMesuresEmployeursList } from '~/server/mesures-employeurs/domain/mesureEmployeur.fixture';
import {
	aStrapiMesuresEmployeursList,
} from '~/server/mesures-employeurs/infra/strapiMesuresEmployeurs.fixture';
import {
	StrapiMesuresEmployeursRepository,
} from '~/server/mesures-employeurs/infra/strapiMesuresEmployeurs.repository';
import { aLogInformation, anErrorManagementService } from '~/server/services/error/errorManagement.fixture';

describe('StrapiMesuresEmployeursRepository', () => {
	describe('getMesuresEmployeurs', () => {
		it('appelle le service strapi avec les bons paramètres', async () => {
			const resource = 'les-mesures-employeurs';

			const strapiService = aStrapiService();
			vi.spyOn(strapiService, 'getSingleType').mockResolvedValue(createSuccess(aStrapiMesuresEmployeursList()));
			const strapiMesuresEmployeurs = new StrapiMesuresEmployeursRepository(strapiService, anErrorManagementService());
			const query = 'populate=deep';

			await strapiMesuresEmployeurs.getMesuresEmployeurs();

			expect(strapiService.getSingleType).toHaveBeenCalledWith(resource, query);
		});

		describe('quand la récupération est en succès', () => {
			it('quand map vers les mesures employeurs est en succès, renvoie la liste des mesures employeurs', async () => {
				const strapiService = aStrapiService();
				vi.spyOn(strapiService, 'getSingleType').mockResolvedValue(createSuccess(aStrapiMesuresEmployeursList()));
				const strapiMesuresEmployeurs = new StrapiMesuresEmployeursRepository(strapiService, anErrorManagementService());

				const result = await strapiMesuresEmployeurs.getMesuresEmployeurs();

				const resultExpected = createSuccess(aMesuresEmployeursList());
				expect(result).toStrictEqual(resultExpected);
			});

			it('quand map vers les mesures employeurs est échec, appelle le service de management d‘erreur avec l‘erreur et le contexte', async () => {
				const strapiService = aStrapiService();
				vi.spyOn(strapiService, 'getSingleType').mockResolvedValue(createSuccess({ someNonExistentField: '' }));

				const errorManagementService = anErrorManagementService();
				const failureFromErrorManagement = createFailure(ErreurMetier.DEMANDE_INCORRECTE);
				vi.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(failureFromErrorManagement);

				const strapiMesuresEmployeurs = new StrapiMesuresEmployeursRepository(strapiService, errorManagementService);
				const result = await strapiMesuresEmployeurs.getMesuresEmployeurs();

				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(expect.any(Error),
					aLogInformation({
						apiSource: 'Strapi - Mesures Employeurs',
						contexte: 'récupérer les mesures employeurs',
						message: 'impossible de mapper vers les mesures employeurs',
					}));
				expect(result).toStrictEqual(failureFromErrorManagement);
			});
		});

		it('quand la récupération est en échec, relais l‘échec du strapi service', async () => {
			const strapiService = aStrapiService();
			const failureFromStrapi = createFailure(ErreurMetier.SERVICE_INDISPONIBLE);
			vi.spyOn(strapiService, 'getSingleType').mockResolvedValue(failureFromStrapi);
			const strapiMesuresEmployeurs = new StrapiMesuresEmployeursRepository(strapiService, anErrorManagementService());

			const result = await strapiMesuresEmployeurs.getMesuresEmployeurs();

			expect(result).toStrictEqual(failureFromStrapi);
		});
	});
});
