import { MeiliSearch, SearchResponse } from 'meilisearch';

import { createSuccess } from '~/server/errors/either';
import {
  FicheMétier,
  FicheMetierFiltresRecherche,
  FicheMetierNestedField,
  FicheMetierNestedFieldStatut, FicheMétierResult } from '~/server/fiche-metier/domain/ficheMetier';
import { FicheMetierRepository } from '~/server/fiche-metier/domain/ficheMetier.repository';
import {
  FicheMétierHttp, FicheMétierHttpNestedField,
  FicheMétierHttpNestedFieldStatut,
} from '~/server/fiche-metier/infra/repositories/ficheMetierMeilisearch.response';

export class FicheMetierMeilisearchRepository implements FicheMetierRepository {
  constructor(private client: MeiliSearch) {}

  async rechercher(filtres: FicheMetierFiltresRecherche = { motCle: '' }) {
    const result: SearchResponse<FicheMétierHttp> = await this.client.index('fiche-metier').search(filtres.motCle);
	  return createSuccess(mapFichesMetierResult(result));
  }
}

function mapFichesMetierResult(fichesMetiersHttpResponse: SearchResponse<FicheMétierHttp>): FicheMétierResult {
  return {
    estimatedTotalResults: fichesMetiersHttpResponse.estimatedTotalHits,
	  limit: fichesMetiersHttpResponse.limit,
    offset: fichesMetiersHttpResponse.offset,
    processingTimeMs: fichesMetiersHttpResponse.processingTimeMs,
	  results: mapFichesMetier(fichesMetiersHttpResponse.hits),
  };
}

function mapFichesMetier(fichesMetiersHttp: FicheMétierHttp[]): FicheMétier[] {
  return fichesMetiersHttp.map((ficheMetierHttp) => ({
    accesMetier: ficheMetierHttp.acces_metier,
    accrocheMetier: ficheMetierHttp.accroche_metier,
    centresInteret: ficheMetierHttp.centres_interet && mapFicheMetierNestedFieldList(ficheMetierHttp.centres_interet),
    competences: ficheMetierHttp.competences,
    conditionTravail: ficheMetierHttp.condition_travail,
    formationsMinRequise: ficheMetierHttp.formations_min_requise && mapFicheMetierNestedFieldList(ficheMetierHttp.formations_min_requise),
    id: ficheMetierHttp.id,
    idOnisep: ficheMetierHttp.identifiant,
    natureTravail: ficheMetierHttp.nature_travail,
    niveauMinAcces: ficheMetierHttp.niveau_min_acces && mapFicheMetierNestedFieldList(ficheMetierHttp.niveau_min_acces),
    nomMetier: ficheMetierHttp.nom_metier,
    secteursActivite: ficheMetierHttp.secteurs_activite && mapFicheMetierNestedFieldList(ficheMetierHttp.secteurs_activite),
    statuts: ficheMetierHttp.statuts && mapFicheMetierNestedFieldStatutList(ficheMetierHttp.statuts),
    vieProfessionnelle: ficheMetierHttp.vie_professionnelle,
  }));
}

function mapFicheMetierNestedFieldStatutList(nestedFieldStatutList: FicheMétierHttpNestedFieldStatut[]): FicheMetierNestedFieldStatut[] {
  return nestedFieldStatutList.map((field) => ({
    ...mapFicheMetierNestedField(field),
    idIdeo: field.id_ideo1,
  }));
}

function mapFicheMetierNestedFieldList(nestedFieldList: FicheMétierHttpNestedField[]): FicheMetierNestedField[] {
  return nestedFieldList.map((field) => mapFicheMetierNestedField(field));
}

function mapFicheMetierNestedField(nestedField: FicheMétierHttpNestedField): FicheMetierNestedField {
  return {
    id: nestedField.id,
    idOnisep: nestedField.identifiant,
    libelle: nestedField.libelle,
  };
}

