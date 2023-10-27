import { aStrapiCmsRepository } from '~/server/cms/infra/repositories/strapi.repository.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { aQuestion, aQuestionEtReponse } from '~/server/faq/domain/FAQ.fixture';
import { aStrapiQuestion, aStrapiQuestionEtReponse, aStrapiQuestionSlug } from '~/server/faq/infra/strapiFAQ.fixture';
import { StrapiFAQRepository } from '~/server/faq/infra/strapiFAQ.repository';

const RESOURCE_FAQ = 'faqs';

describe('Strapi FAQ Repository', () => {
	describe('getAllFAQ', () => {
		it('appelle le service strapi avec les bons paramètres', async () => {
			const strapiService = aStrapiCmsRepository();
			jest.spyOn(strapiService, 'getCollectionType').mockResolvedValue(createSuccess([aStrapiQuestion()]));
			const strapiFAQRepository = new StrapiFAQRepository(strapiService);
			const query= 'fields[0]=problematique&fields[1]=slug';

			await strapiFAQRepository.getAllFAQ();

			expect(strapiService.getCollectionType).toHaveBeenCalledWith(RESOURCE_FAQ, query);
		});

		describe('quand la liste des questions est trouvée', () => {
			it('renvoie la liste de questions', async () => {
				const strapiService = aStrapiCmsRepository();
				const strapiFAQRepository = new StrapiFAQRepository(strapiService);
				const strapiQuestions = [
					aStrapiQuestion(),
					aStrapiQuestion({ problematique: 'Que faire dans la vie ?', slug: 'que-faire-dans-la-vie' }),
				];
				jest.spyOn(strapiService, 'getCollectionType').mockResolvedValue(createSuccess(strapiQuestions));
				const expectedQuestions = createSuccess([
					aQuestion(),
					aQuestion({
						problématique: 'Que faire dans la vie ?',
						slug: 'que-faire-dans-la-vie',
					})]);

				const result = await strapiFAQRepository.getAllFAQ();

				expect(result).toStrictEqual(expectedQuestions);
			});
		});

		describe('quand la récupération de la liste des questions est en échec', () => {
			it('relais l’échec du strapi service', async () => {
				const strapiService = aStrapiCmsRepository();
				const strapiFAQRepository = new StrapiFAQRepository(strapiService);
				const expectedStrapiFailure = createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
				jest.spyOn(strapiService, 'getCollectionType').mockResolvedValue(expectedStrapiFailure);

				const result = await strapiFAQRepository.getAllFAQ();

				expect(result).toStrictEqual(expectedStrapiFailure);
			});
		});
	});

	describe('getFAQBySlug', () => {
		it('appelle le service strapi avec les bons paramètres', async () => {
			const strapiService = aStrapiCmsRepository();
			jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValueOnce(createSuccess(aStrapiQuestionEtReponse()));
			const strapiFAQRepository = new StrapiFAQRepository(strapiService);
			const slug = 'slugName';
			const query= 'filters[slug][$eq]=slugName';

			await strapiFAQRepository.getFAQBySlug(slug);

			expect(strapiService.getFirstFromCollectionType).toHaveBeenCalledWith(RESOURCE_FAQ, query);
		});

		describe('quand la question est trouvée', () => {
			it('renvoie la question', async () => {
				const strapiService = aStrapiCmsRepository();
				jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValueOnce(createSuccess(aStrapiQuestionEtReponse()));
				const strapiFAQRepository = new StrapiFAQRepository(strapiService);
				const expectedQuestionEtReponse = aQuestionEtReponse();

				const result = await strapiFAQRepository.getFAQBySlug('slugName');

				expect(result).toStrictEqual(createSuccess(expectedQuestionEtReponse));
			});
		});

		describe('quand la récupération est en échec', () => {
			it('relais l’échec du strapi service', async () => {
				const strapiService = aStrapiCmsRepository();
				const expectedFailure = createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
				jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValueOnce(expectedFailure);
				const strapiFAQRepository = new StrapiFAQRepository(strapiService);

				const result = await strapiFAQRepository.getFAQBySlug('slugName');

				expect(result).toStrictEqual(expectedFailure);
			});
		});
	});

	describe('listAllFAQSlug', () => {
		it('appelle le service strapi avec les bons paramètres', async () => {
			const strapiService = aStrapiCmsRepository();
			jest.spyOn(strapiService, 'getCollectionType').mockResolvedValueOnce(createSuccess([aStrapiQuestionSlug()]));
			const strapiFAQRepository = new StrapiFAQRepository(strapiService);
			const query= '[fields][0]=slug';

			await strapiFAQRepository.listAllFAQSlug();

			expect(strapiService.getCollectionType).toHaveBeenCalledWith(RESOURCE_FAQ, query);
		});

		describe('quand les slugs sont trouvés', () => {
			it('renvoie les slugs', async () => {
				const strapiCmsRepository = aStrapiCmsRepository();
				const strapiFAQRepository = new StrapiFAQRepository(strapiCmsRepository);
				jest.spyOn(strapiCmsRepository, 'getCollectionType').mockResolvedValue(createSuccess([
					aStrapiQuestionSlug(),
					aStrapiQuestionSlug({ slug: 'comment-constituer-un-dossier-locatif-jeune' }),
				]));
				const expectedSlugs = ['Comment-constituer-un-dossier-locatif ?', 'comment-constituer-un-dossier-locatif-jeune'];

				const result = await strapiFAQRepository.listAllFAQSlug();

				expect(result).toStrictEqual(createSuccess(expectedSlugs));
			});
		});

		describe('quand la récupération des slugs est en échec', () => {
			it('relais l’échec du strapi service', async () => {
				const strapiService = aStrapiCmsRepository();
				const strapiFAQRepository = new StrapiFAQRepository(strapiService);
				const expectFailure = createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
				jest.spyOn(strapiService, 'getCollectionType').mockResolvedValue( expectFailure);

				const result = await strapiFAQRepository.listAllFAQSlug();

				expect(result).toStrictEqual(expectFailure);
			});
		});
	});
});
