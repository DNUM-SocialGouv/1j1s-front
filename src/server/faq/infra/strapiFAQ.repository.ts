import { CmsService } from '~/server/cms/domain/cmsService';
import { createSuccess, Either, isSuccess } from '~/server/errors/either';
import { FAQQuestion, FAQQuestionEtReponse, FAQSlug } from '~/server/faq/domain/FAQ';
import { FAQRepository } from '~/server/faq/domain/FAQ.repository';
import {
	FAQResponseStrapiQuestion,
	FAQResponseStrapiQuestionEtReponse,
	FAQResponseStrapiQuestionSlug,
} from '~/server/faq/infra/strapiFAQ';
import { mapQuestion, mapQuestionReponse } from '~/server/faq/infra/strapiFAQ.mapper';

const RESOURCE_FAQ = 'faqs';

export class StrapiFAQRepository implements FAQRepository {
	constructor(private readonly strapiService: CmsService) {
	}

	async getFAQBySlug(slug: string): Promise<Either<FAQQuestionEtReponse>> {
		const query = `filters[slug][$eq]=${slug}`;
		const strapiQuestionEtReponse = await this.strapiService.getFirstFromCollectionType<FAQResponseStrapiQuestionEtReponse>(RESOURCE_FAQ, query);

		if(isSuccess(strapiQuestionEtReponse))
			return createSuccess(mapQuestionReponse(strapiQuestionEtReponse.result));

		return strapiQuestionEtReponse;
	}

	async getAllFAQ(): Promise<Either<Array<FAQQuestion>>> {
		const query = 'fields[0]=problematique&fields[1]=slug';
		const strapiQuestions = await this.strapiService.getCollectionType<FAQResponseStrapiQuestion>(RESOURCE_FAQ, query);

		if (isSuccess(strapiQuestions))
			return createSuccess(strapiQuestions.result.map((strapiQuestion) => mapQuestion(strapiQuestion)));

		return strapiQuestions;
	}

	async listAllFAQSlug(): Promise<Either<Array<FAQSlug>>> {
		const query = 'fields[0]=slug';
		const strapiQuestionSlugs = await this.strapiService.getCollectionType<FAQResponseStrapiQuestionSlug>(RESOURCE_FAQ, query);

		if (isSuccess(strapiQuestionSlugs)) {
			return createSuccess(strapiQuestionSlugs.result.map((strapiQuestionSlug) => strapiQuestionSlug.slug));
		}

		return strapiQuestionSlugs;
	}

}

