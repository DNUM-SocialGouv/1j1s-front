import { CarteActualite } from '~/server/cms/domain/actualite';
import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';
import { Article, ArticleSlug } from '~/server/cms/domain/article';
import { EspaceJeune } from '~/server/cms/domain/espaceJeune';
import { MentionsObligatoires } from '~/server/cms/domain/mentionsObligatoires';
import { OffreDeStage, OffreDeStageDepot } from '~/server/cms/domain/offreDeStage.type';
import { Either } from '~/server/errors/either';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';

import { CarteMesuresEmployeurs } from './mesuresEmployeurs';

export interface CmsRepository {
  getActualitéList(): Promise<Either<CarteActualite[]>>
	getAnnonceDeLogementBySlug(slug: string): Promise<Either<AnnonceDeLogement>>
  getArticleBySlug(slug: ArticleSlug): Promise<Either<Article>>
  getMesureJeune(): Promise<Either<EspaceJeune>>
  getFicheMetierByNom(nom: string): Promise<Either<FicheMétier>>
  getMentionObligatoire(mentionsObligatoires: MentionsObligatoires): Promise<Either<Article>>
  getMesuresEmployeurs(): Promise<Either<CarteMesuresEmployeurs[]>>
	getOffreDeStageBySlug(slug: string): Promise<Either<OffreDeStage>>
  listAllFicheMetierNomMetier(): Promise<Either<Array<string>>>
  listAllArticleSlug(): Promise<Either<Array<string>>>
	saveOffreDeStage(offre: OffreDeStageDepot): Promise<Either<void>>
  save<Body, Response>(resource: string, body: Body): Promise<Either<Response>>
}
