import { Article, ArticleSlug } from '~/server/cms/domain/article';
import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { Either } from '~/server/errors/either';

export class ConsulterArticleUseCase {
	constructor(private cmsRepository: CmsRepository) {}
	
	async handle(slug: ArticleSlug): Promise<Either<Article>> {
		return this.cmsRepository.getArticleBySlug(slug);
	}
}
