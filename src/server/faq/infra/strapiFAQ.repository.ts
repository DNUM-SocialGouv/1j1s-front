import { StrapiRepository } from '~/server/cms/infra/repositories/strapi.repository';
import { Either } from '~/server/errors/either';
import { FAQ,FAQResponseStrapi } from '~/server/faq/domain/FAQ';
import { FAQRepository } from '~/server/faq/domain/FAQ.repository';
import { flatMapSlug, mapQuestion, mapQuestionRéponse } from '~/server/faq/infra/strapiFAQ.mapper';

export const RESOURCE_FAQ = 'faqs';

export class StrapiFAQRepository implements FAQRepository {
	constructor(private readonly strapiRepository: StrapiRepository) {
	}

	async getFAQBySlug(slug: string): Promise<Either<FAQ.QuestionEtReponse>> {
		const query = `filters[slug][$eq]=${slug}`;
		return await this.strapiRepository.getFirstFromCollectionType<FAQResponseStrapi.QuestionEtReponse, FAQ.QuestionEtReponse>(RESOURCE_FAQ, query, mapQuestionRéponse);
	}

	async getAllFAQ(): Promise<Either<Array<FAQ.Question>>> {
		const query = 'fields[0]=problematique&fields[1]=slug';
		return await this.strapiRepository.getCollectionType<FAQResponseStrapi.Question, FAQ.Question>(RESOURCE_FAQ, query, mapQuestion);
	}

	async listAllFAQSlug(): Promise<Either<Array<FAQ.Slug>>> {
		const query = '[fields][0]=slug';
		return await this.strapiRepository.getCollectionType<FAQResponseStrapi.QuestionSlug, FAQ.Slug>(RESOURCE_FAQ, query, flatMapSlug);
	}
}

