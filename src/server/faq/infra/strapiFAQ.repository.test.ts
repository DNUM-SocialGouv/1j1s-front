import { aStrapiCmsRepository } from '~/server/cms/infra/repositories/strapi.repository.fixture';
import { createSuccess } from '~/server/errors/either';
import { aListeDeQuestion, aListeFAQSlug, aQuestionEtReponse } from '~/server/faq/domain/FAQ.fixture';
import { flatMapSlug, mapQuestion, mapQuestionRéponse } from '~/server/faq/infra/strapiFAQ.mapper';
import { StrapiFAQRepository } from '~/server/faq/infra/strapiFAQ.repository';

const RESOURCE_FAQ = 'faqs';
describe('getAllFAQ', () => {
	it('appelle le service strapi avec les bons paramètres', async () => {
		const strapiCmsRepository = aStrapiCmsRepository();
		const strapiFAQRepository = new StrapiFAQRepository(strapiCmsRepository);

		await strapiFAQRepository.getAllFAQ();

		const query= 'fields[0]=problematique&fields[1]=slug';
		expect(strapiCmsRepository.getCollectionType).toHaveBeenCalledWith(RESOURCE_FAQ, query, mapQuestion);
	});

	describe('quand la liste des questions est trouvée', () => {
		it('renvoie la liste de questions', async () => {
			const expected = aListeDeQuestion();

			const strapiCmsRepository = aStrapiCmsRepository({ getCollectionType: jest.fn().mockResolvedValue(createSuccess(expected)) });
			const strapiFAQRepository = new StrapiFAQRepository(strapiCmsRepository);

			const result = await strapiFAQRepository.getAllFAQ();
			expect(result).toEqual(createSuccess(expected));
		});
	});
});

describe('getFAQBySlug', () => {
	it('appelle le service strapi avec les bons paramètres', async () => {
		const strapiCmsRepository = aStrapiCmsRepository();
		const strapiFAQRepository = new StrapiFAQRepository(strapiCmsRepository);

		const slug = 'slugName';
		await strapiFAQRepository.getFAQBySlug(slug);

		const query= 'filters[slug][$eq]=slugName';
		expect(strapiCmsRepository.getFirstFromCollectionType).toHaveBeenCalledWith(RESOURCE_FAQ, query, mapQuestionRéponse);
	});

	describe('quand la question est trouvée', () => {
		it('renvoie la question', async () => {
			const expected = aQuestionEtReponse();

			const strapiCmsRepository = aStrapiCmsRepository({ getFirstFromCollectionType: jest.fn().mockResolvedValue(createSuccess(expected)) });
			const strapiFAQRepository = new StrapiFAQRepository(strapiCmsRepository);

			const result = await strapiFAQRepository.getFAQBySlug('sludName');
			expect(result).toEqual(createSuccess(expected));
		});
	});
});

describe('listAllFAQSlug', () => {
	it('appelle le service strapi avec les bons paramètres', async () => {
		const strapiCmsRepository = aStrapiCmsRepository();
		const strapiFAQRepository = new StrapiFAQRepository(strapiCmsRepository);

		await strapiFAQRepository.listAllFAQSlug();

		const query= '[fields][0]=slug';
		expect(strapiCmsRepository.getCollectionType).toHaveBeenCalledWith(RESOURCE_FAQ, query, flatMapSlug);
	});

	describe('quand les slugs sont trouvés', () => {
		it('renvoie les slugs', async () => {
			const expected = aListeFAQSlug();

			const strapiCmsRepository = aStrapiCmsRepository({ getCollectionType: jest.fn().mockResolvedValue(createSuccess(expected)) });
			const strapiFAQRepository = new StrapiFAQRepository(strapiCmsRepository);

			const result = await strapiFAQRepository.listAllFAQSlug();
			expect(result).toEqual(createSuccess(expected));
		});
	});
});
