import { Article, ArticleSlug } from '~/server/cms/domain/article';
import { MentionsObligatoires } from '~/server/cms/domain/mentionsObligatoires';
import { MesuresJeunes } from '~/server/cms/domain/mesuresJeunes';
import { Either } from '~/server/errors/either';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';

export interface CmsRepository {
  getArticleBySlug(slug: ArticleSlug): Promise<Either<Article>>
  getFicheMetierByNom(nom: string): Promise<Either<FicheMétier>>
  getMentionObligatoire(mentionsObligatoires: MentionsObligatoires): Promise<Either<Article>>
  getMesuresJeunes() : Promise<Either<MesuresJeunes>>
}
