import { StrapiRepository } from '~/server/cms/infra/repositories/strapi.repository';
import { Either } from '~/server/errors/either';
import { FAQResponse, Question } from '~/server/faq/domain/FAQ';
import { FAQRepository } from '~/server/faq/domain/FAQ.repository';
import { flatMapSlug, mapQuestion, mapQuestionRéponse } from '~/server/faq/infra/strapiFAQ.mapper';

export const RESOURCE_FAQ = 'faqs';

export class StrapiFAQRepository implements FAQRepository {
	constructor(private readonly strapiRepository: StrapiRepository) {
	}

	// TODO (BRUJ 26-09-2023): revoir les types de sortie
	async getFAQBySlug(slug: string): Promise<Either<Question.QuestionRéponse>> {
		const query = `filters[slug][$eq]=${slug}`;
		return await this.strapiRepository.getFirstFromCollectionType<FAQResponse.Réponse, Question.QuestionRéponse>(RESOURCE_FAQ, query, mapQuestionRéponse);
	}

	async getAllFAQ(): Promise<Either<Array<Question>>> {
		const query = 'fields[0]=problematique&fields[1]=slug';
		return await this.strapiRepository.getCollectionType<FAQResponse.FAQ, Question>(RESOURCE_FAQ, query, mapQuestion);
	}

	async listAllFAQSlug(): Promise<Either<Array<string>>> {
		const query = '[fields][0]=slug';
		return await this.strapiRepository.getCollectionType<FAQResponse.FAQ, string>(RESOURCE_FAQ, query, flatMapSlug);
	}
}

