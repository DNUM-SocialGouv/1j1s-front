import { Article, ArticleSlug } from '~/server/cms/domain/article';
import { EspaceJeune } from '~/server/cms/domain/espaceJeune';
import { MentionsObligatoires } from '~/server/cms/domain/mentionsObligatoires';
import { Either } from '~/server/errors/either';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';

import { MesuresEmployeurs } from './mesuresEmployeurs';

export interface CmsRepository {
  getArticleBySlug(slug: ArticleSlug): Promise<Either<Article>>
  getFicheMetierByNom(nom: string): Promise<Either<FicheMétier>>
  getMentionObligatoire(mentionsObligatoires: MentionsObligatoires): Promise<Either<Article>>
  getEspaceJeune() : Promise<Either<EspaceJeune>>
  getMesuresEmployeurs() : Promise<Either<MesuresEmployeurs>>
}
