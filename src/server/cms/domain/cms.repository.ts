import { Actualité } from '~/server/cms/domain/actualité';
import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';
import { Article, ArticleSlug } from '~/server/cms/domain/article';
import { Question, QuestionSlug } from '~/server/cms/domain/FAQ.type';
import { MentionsObligatoires } from '~/server/cms/domain/mentionsObligatoires';
import { OffreDeStage, OffreDeStageDepot } from '~/server/cms/domain/offreDeStage.type';
import { ServiceJeune } from '~/server/cms/domain/serviceJeune';
import { Either } from '~/server/errors/either';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';

import { MesureEmployeur } from './mesureEmployeur';

export interface CmsRepository {
  getActualitéList(): Promise<Either<Actualité[]>>
	getAllFAQ(): Promise<Either<Array<Question>>>
	getAnnonceDeLogementBySlug(slug: string): Promise<Either<AnnonceDeLogement>>
  getArticleBySlug(slug: ArticleSlug): Promise<Either<Article>>
  getServiceJeuneList(): Promise<Either<Array<ServiceJeune>>>
	getFAQBySlug(slug: QuestionSlug): Promise<Either<Question>>
  getFicheMetierByNom(nom: string): Promise<Either<FicheMétier>>
  getMentionObligatoire(mentionsObligatoires: MentionsObligatoires): Promise<Either<Article>>
  getMesuresEmployeurs(): Promise<Either<MesureEmployeur[]>>
	getOffreDeStageBySlug(slug: string): Promise<Either<OffreDeStage>>
  listAllFicheMetierNomMetier(): Promise<Either<Array<string>>>
	listAllAnnonceDeLogementSlug(): Promise<Either<Array<string>>>
  listAllArticleSlug(): Promise<Either<Array<string>>>
	listAllFAQSlug(): Promise<Either<Array<string>>>
	listAllOffreDeStageSlug(): Promise<Either<Array<string>>>
	saveOffreDeStage(offre: OffreDeStageDepot): Promise<Either<void>>
  save<Body, Response>(resource: string, body: Body): Promise<Either<Response>>
}
