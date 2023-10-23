import { aStrapiCmsRepository } from '~/server/cms/infra/repositories/strapi.repository.fixture';
import { createFailure, createSuccess, Success } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';
import { aFicheMetier } from '~/server/fiche-metier/domain/ficheMetier.fixture';
import { aStrapiFicheMetier } from '~/server/fiche-metier/infra/strapiFicheMetier.fixture';
import { StrapiFicheMetierRepository } from '~/server/fiche-metier/infra/strapiFicheMetier.repository';


describe('strapiFicheMetierRepository', () => {
	describe('getFicheMetierByNom', () => {
		const nomMetier = 'Mon super metier';

		it('appelle le service strapi avec les bons paramètres', async () => {
			const strapiService = aStrapiCmsRepository();
			jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValueOnce(createSuccess(aStrapiFicheMetier()));
			const strapiFicheMetierRepository = new StrapiFicheMetierRepository(strapiService);
			const resourceFicheMetierStrapi = 'fiche-metiers';

			await strapiFicheMetierRepository.getFicheMetierByNom(nomMetier);

			const query = `filters[nom_metier][$eq]=${encodeURIComponent(nomMetier)}&populate=deep`;

			expect(strapiService.getFirstFromCollectionType).toHaveBeenCalledWith(resourceFicheMetierStrapi, query);
		});

		describe('si une fiche métier est trouvée', () => {
			it('récupère la fiche métier selon le nom', async () => {
				const strapiService = aStrapiCmsRepository();
				jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValue(createSuccess(aStrapiFicheMetier()));
				const strapiFicheMetierRepository = new StrapiFicheMetierRepository(strapiService);

				const result = await strapiFicheMetierRepository.getFicheMetierByNom(nomMetier) as Success<FicheMétier>;

				expect(result.result).toEqual(aFicheMetier());
			});
		});

		describe('si la récupération est en échec,', () => {
			it('relais l’échec du service strapi', async () => {
				const strapiService = aStrapiCmsRepository();
				const strapiFailure = createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
				jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValue(strapiFailure);
				const strapiFicheMetierRepository = new StrapiFicheMetierRepository(strapiService);

				const result = await strapiFicheMetierRepository.getFicheMetierByNom(nomMetier) as Success<FicheMétier>;

				expect(result).toStrictEqual(strapiFailure);
			});
		});
	});

	describe('getAllNomsMetiers', () => {
		it('appelle le service Strapi avec les bons paramètres', async () => {
			const strapiService = aStrapiCmsRepository();
			const strapiFichesMetiers = [aStrapiFicheMetier()];
			jest.spyOn(strapiService, 'getCollectionType').mockResolvedValueOnce(createSuccess(strapiFichesMetiers));
			const strapiFicheMetierRepository = new StrapiFicheMetierRepository(strapiService);
			const resourceFicheMetierStrapi = 'fiche-metiers';

			await strapiFicheMetierRepository.getAllNomsMetiers();

			expect(strapiService.getCollectionType).toHaveBeenCalledTimes(1);
			expect(strapiService.getCollectionType).toHaveBeenCalledWith(resourceFicheMetierStrapi, 'fields[]=nom_metier');
		});

		describe('quand le service strapi retourne une liste de fiches métiers', () => {
			it('retourne la liste de tous les noms métier des fiches metiers', async () => {
				const strapiFichesMetiers = [
					aStrapiFicheMetier({ nom_metier: 'Boulanger' }),
					aStrapiFicheMetier({ nom_metier: 'Fleuriste' }),
				];
				const expectedListeDeNoms = ['Boulanger', 'Fleuriste'];
				const strapiService = aStrapiCmsRepository();
				jest.spyOn(strapiService, 'getCollectionType').mockResolvedValueOnce(createSuccess(strapiFichesMetiers));
				const strapiFicheMetierRepository = new StrapiFicheMetierRepository(strapiService);

				const { result } = await strapiFicheMetierRepository.getAllNomsMetiers() as Success<Array<string>>;

				expect(result).toEqual(expectedListeDeNoms);
			});
		});

		describe('quand le service strapi retourne une erreur', () => {
			it('relais l’erreur', async () => {
				const strapiFailure = createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
				const strapiService = aStrapiCmsRepository();
				jest.spyOn(strapiService, 'getCollectionType').mockResolvedValueOnce(strapiFailure);
				const strapiFicheMetierRepository = new StrapiFicheMetierRepository(strapiService);

				const result = await strapiFicheMetierRepository.getAllNomsMetiers();

				expect(result).toStrictEqual(strapiFailure);
			});
		});

	});
});
