import { Article, ArticleSlug } from '~/server/cms/domain/article';
import { MentionsObligatoires } from '~/server/cms/domain/mentionsObligatoires';
import { MesuresJeunes } from '~/server/cms/domain/mesuresJeunes';
import { Either } from '~/server/errors/either';

export interface CmsRepository {
  getArticleBySlug(slug: ArticleSlug): Promise<Either<Article>>
  getMentionObligatoire(mentionsObligatoires: MentionsObligatoires): Promise<Either<Article>>
  getMesuresJeunes() : Promise<Either<MesuresJeunes>>
}
