import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { createSuccess, Either, isSuccess } from '~/server/errors/either';
import { FAQ } from '~/server/faq/domain/FAQ';
import { FAQRepository } from '~/server/faq/domain/FAQ.repository';
import { FAQResponseStrapi } from '~/server/faq/infra/strapiFAQ';
import { mapQuestion, mapQuestionRéponse } from '~/server/faq/infra/strapiFAQ.mapper';

const RESOURCE_FAQ = 'faqs';

export class StrapiFAQRepository implements FAQRepository {
	constructor(private readonly strapiService: CmsRepository) {
	}

	async getFAQBySlug(slug: string): Promise<Either<FAQ.QuestionEtReponse>> {
		const query = `filters[slug][$eq]=${slug}`;
		const strapiQuestionEtReponse = await this.strapiService.getFirstFromCollectionType<FAQResponseStrapi.QuestionEtReponse>(RESOURCE_FAQ, query);

		if(isSuccess(strapiQuestionEtReponse))
			return createSuccess(mapQuestionRéponse(strapiQuestionEtReponse.result));

		return strapiQuestionEtReponse;
	}

	async getAllFAQ(): Promise<Either<Array<FAQ.Question>>> {
		const query = 'fields[0]=problematique&fields[1]=slug';
		const strapiQuestions = await this.strapiService.getCollectionType<FAQResponseStrapi.Question>(RESOURCE_FAQ, query);

		if (isSuccess(strapiQuestions))
			return createSuccess(strapiQuestions.result.map((strapiQuestion) => mapQuestion(strapiQuestion)));

		return strapiQuestions;
	}

	async listAllFAQSlug(): Promise<Either<Array<FAQ.Slug>>> {
		const query = '[fields][0]=slug';
		const strapiQuestionSlugs = await this.strapiService.getCollectionType<FAQResponseStrapi.QuestionSlug>(RESOURCE_FAQ, query);

		if (isSuccess(strapiQuestionSlugs)) {
			return createSuccess(strapiQuestionSlugs.result.map((strapiQuestionSlug) => strapiQuestionSlug.slug));
		}

		return strapiQuestionSlugs;
	}

}

