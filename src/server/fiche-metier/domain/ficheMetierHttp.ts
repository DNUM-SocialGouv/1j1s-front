import {
  FicheMétier,
  FicheMetierNestedField,
  FicheMetierNestedFieldStatut,
} from '~/server/fiche-metier/domain/ficheMetier';

export interface FicheMétierHttp {
  acces_metier: string
  accroche_metier: string
  centres_interet: FicheMétierHttpNestedField[],
  competences: string
  condition_travail: string
  formations_min_requise: FicheMétierHttpNestedField[]
  id: string
  identifiant: string
  nature_travail: string
  niveau_acces_min: FicheMétierHttpNestedField[]
  nom_metier: string
  secteurs_activite: FicheMétierHttpNestedField[],
  statuts: FicheMétierHttpNestedFieldStatut[],
  vie_professionnelle: string
}

export interface FicheMétierHttpNestedField {
  id: number
  identifiant: string
  libelle: string
}

export interface FicheMétierHttpNestedFieldStatut extends FicheMétierHttpNestedField {
  id_ideo1: string
}

export function mapFicheMetier(ficheMetierHttp: Partial<FicheMétierHttp>): Partial<FicheMétier> {
  return {
    accesMetier: ficheMetierHttp.acces_metier,
    accrocheMetier: ficheMetierHttp.accroche_metier,
    centresInteret: ficheMetierHttp.centres_interet && mapFicheMetierNestedFieldList(ficheMetierHttp.centres_interet),
    competences: ficheMetierHttp.competences,
    conditionTravail: ficheMetierHttp.condition_travail,
    formationsMinRequise: ficheMetierHttp.formations_min_requise && mapFicheMetierNestedFieldList(ficheMetierHttp.formations_min_requise),
    id: ficheMetierHttp.id,
    idOnisep: ficheMetierHttp.identifiant,
    natureTravail: ficheMetierHttp.nature_travail,
    niveauAccesMin: ficheMetierHttp.niveau_acces_min && mapFicheMetierNestedFieldList(ficheMetierHttp.niveau_acces_min),
    nomMetier: ficheMetierHttp.nom_metier,
    secteursActivite: ficheMetierHttp.secteurs_activite && mapFicheMetierNestedFieldList(ficheMetierHttp.secteurs_activite),
    statuts: ficheMetierHttp.statuts && mapFicheMetierNestedFieldStatutList(ficheMetierHttp.statuts),
    vieProfessionnelle: ficheMetierHttp.vie_professionnelle,
  };
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
