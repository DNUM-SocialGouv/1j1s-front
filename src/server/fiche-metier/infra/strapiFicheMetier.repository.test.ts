import { aStrapiCmsRepository } from '~/server/cms/infra/repositories/strapi.repository.fixture';
import { createSuccess, Success } from '~/server/errors/either';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';
import { aFicheMetier } from '~/server/fiche-metier/domain/ficheMetier.fixture';
import { flatMapNomMetier, mapFicheMetier } from '~/server/fiche-metier/infra/strapiFicheMetier.mapper';
import {
	RESOURCE_FICHE_METIER,
	StrapiFicheMetierRepository,
} from '~/server/fiche-metier/infra/strapiFicheMetier.repository';
import { aFicheMetierNomMetierList } from '~/server/sitemap/domain/sitemap.fixture';


describe('strapiFicheMetierRepository', () => {
	describe('getFicheMetierByNom', () => {
		const nomMetier = 'Mon super metier';
		const expectedFicheMetier = aFicheMetier();

		it('appelle le service strapi avec les bons paramètres', async () => {
			const strapiCmsRepository = aStrapiCmsRepository();
			const strapiFicheMetierRepository = new StrapiFicheMetierRepository(strapiCmsRepository);

			await strapiFicheMetierRepository.getFicheMetierByNom(nomMetier);

			const query = `filters[nom_metier][$eq]=${encodeURIComponent(nomMetier)}&populate=deep`;

			expect(strapiCmsRepository.getFirstFromCollectionType).toHaveBeenCalledWith(RESOURCE_FICHE_METIER, query, mapFicheMetier);
		});

		describe('Si une fiche métier est trouvée', () => {
			it('récupère la fiche métier selon le nom', async () => {
				const strapiCmsRepository = aStrapiCmsRepository({
					getFirstFromCollectionType: jest.fn().mockResolvedValue(createSuccess(expectedFicheMetier)),
				});
				const strapiFicheMetierRepository = new StrapiFicheMetierRepository(strapiCmsRepository);

				const result = await strapiFicheMetierRepository.getFicheMetierByNom(nomMetier) as Success<FicheMétier>;

				expect(result.result).toEqual(expectedFicheMetier);
			});
		});
	});

	describe('getListNomsMetiers', () => {
		it('liste tous les noms métier des fiches metier', async () => {
			const expected = aFicheMetierNomMetierList();
			const strapiCmsRepository = aStrapiCmsRepository({ getCollectionTypeDeprecated: jest.fn().mockResolvedValue(createSuccess(expected)) });
			const strapiFicheMetierRepository = new StrapiFicheMetierRepository(strapiCmsRepository);


			const { result } = await strapiFicheMetierRepository.getAllNomsMetiers() as Success<Array<string>>;

			expect(result).toEqual(expected);
			expect(strapiCmsRepository.getCollectionTypeDeprecated).toHaveBeenCalledTimes(1);
			expect(strapiCmsRepository.getCollectionTypeDeprecated).toHaveBeenCalledWith(RESOURCE_FICHE_METIER, 'fields[]=nom_metier', flatMapNomMetier);
		});
	});
});
