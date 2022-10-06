import { OffreEmploi, RésultatsRechercheOffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import {
  OffreEmploiResponse,
  RésultatsRechercheOffreEmploiResponse,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.response';
import TypeDeContrat = OffreEmploi.TypeDeContrat;
import {
  RésultatsRéférentielCommunesResponse,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';

export const mapRésultatsRechercheOffreEmploiResponse = (response:RésultatsRechercheOffreEmploiResponse): RésultatsRechercheOffreEmploiResponse  => response;

export function mapRésultatsRechercheOffreEmploi(response: RésultatsRechercheOffreEmploiResponse): RésultatsRechercheOffreEmploi {
  return {
    nombreRésultats: getNombreRésultats(response.filtresPossibles),
    résultats: response.resultats.map(mapOffreEmploi),
  };
}

export function mapOffreEmploi(offreEmploiResponse: OffreEmploiResponse): OffreEmploi {
  const lieuTravail = mapLieuTravail(offreEmploiResponse.lieuTravail);
  const expérience = mapExpérience(offreEmploiResponse.experienceExige);
  const typeContrat = mapTypeContrat(offreEmploiResponse.typeContrat);
  const duréeTravail = mapDuréeTravail(offreEmploiResponse.dureeTravailLibelleConverti);
  const étiquetteList = [lieuTravail, expérience, typeContrat && typeContrat.libelléCourt, duréeTravail].filter((tag) => tag !== undefined) as string[];
  return {
    compétenceList: mapCompétenceList(offreEmploiResponse.competences),
    description: offreEmploiResponse.description,
    duréeTravail,
    entreprise: {
      logo: offreEmploiResponse.entreprise?.logo,
      nom: offreEmploiResponse.entreprise?.nom,
    },
    expérience,
    formationList: mapFormationList(offreEmploiResponse.formations),
    id: offreEmploiResponse.id,
    intitulé: offreEmploiResponse.intitule,
    lieuTravail,
    qualitéeProfessionnelleList: mapQualitéeProfessionnelleList(offreEmploiResponse.qualitesProfessionnelles),
    salaire: offreEmploiResponse.salaire?.libelle || offreEmploiResponse.salaire?.commentaire,
    typeContrat,
    urlOffreOrigine: offreEmploiResponse.origineOffre.urlOrigine,
    étiquetteList,
  };
}

function mapDuréeTravail(duréeTravailResponse?: OffreEmploiResponse.DuréeTravail): OffreEmploi.DuréeTravail | undefined {
  switch (duréeTravailResponse) {
    case 'Temps partiel':
      return OffreEmploi.DuréeTravail.TEMPS_PARTIEL;
    case 'Temps plein':
      return OffreEmploi.DuréeTravail.TEMPS_PLEIN;
    default:
      return undefined;
  }
}

function mapTypeContrat(typeContrat: OffreEmploiResponse.TypeContrat): TypeDeContrat | undefined {
  switch (typeContrat) {
    case 'CDD':
      return OffreEmploi.CONTRAT_CDD;
    case 'CDI':
      return OffreEmploi.CONTRAT_CDI;
    case 'MIS':
      return OffreEmploi.CONTRAT_INTÉRIMAIRE;
    case 'SAI':
      return OffreEmploi.CONTRAT_SAISONNIER;
    default:
      return undefined;
  }
}

export function mapFormationList(formationResponse?: OffreEmploiResponse.Formation[]): OffreEmploi.Formation[] {
  if (!formationResponse) {
    return [];
  }
  const formationResponseSanitized = formationResponse.filter((formation) => formation.niveauLibelle !== undefined && formation.commentaire !== undefined);
  return formationResponseSanitized.map((formation) => ({
    ...formation.commentaire && { commentaire : formation.commentaire },
    ...formation.niveauLibelle && { libellé : formation.niveauLibelle },
  }));
}

export function mapCompétenceList(compétenceResponse?: OffreEmploiResponse.Compétence[]): string[] {
  if (!compétenceResponse) return [];

  const compétenceMappée = compétenceResponse.map((compétence) => (compétence.libelle));
  return compétenceMappée.filter((compétence) => !!compétence) as string[];
}

export function mapQualitéeProfessionnelleList(qualitéeProfessionnelleResponse?: OffreEmploiResponse.QualitéeProfessionnelle[]): string[] {
  if (!qualitéeProfessionnelleResponse) {
    return [];
  }
  const qualitéeProfessionnelleMappée = qualitéeProfessionnelleResponse.map((qualitéeProfessionnelle) => (qualitéeProfessionnelle.libelle));
  return qualitéeProfessionnelleMappée.filter((qualitéeProfessionnelle) => !!qualitéeProfessionnelle) as string[];
}

function mapLieuTravail(lieuTravailResponse?: OffreEmploiResponse.LieuTravail): string | undefined {
  if (!lieuTravailResponse) {
    return undefined;
  }
  const lieuTravail = lieuTravailResponse.libelle.split(' - ');
  const ville = lieuTravail[1];
  const département = lieuTravail[0];
  return ville ? `${ville} (${département})` : `${département}`;
}

function mapExpérience(expérienceExigéeResponse?: OffreEmploiResponse.Expérience): OffreEmploi.Expérience | undefined {
  switch (expérienceExigéeResponse) {
    case 'D':
      return OffreEmploi.Expérience.DEBUTANT_ACCEPTE;
    case 'S':
      return OffreEmploi.Expérience.EXPERIENCE_SOUHAITEE;
    case 'E':
      return OffreEmploi.Expérience.EXPERIENCE_EXIGEE;
    default:
      return undefined;
  }
}

function sumRésultatsAgrégation(agrégationResponseList: RésultatsRechercheOffreEmploiResponse.FiltresPossiblesResponse.Agrégation[]): number {
  return agrégationResponseList.reduce((nbRésultats, agrégationResponse) => nbRésultats + agrégationResponse.nbResultats, 0);
}

function getNombreRésultats(filtrePossibleResponseList: RésultatsRechercheOffreEmploiResponse.FiltresPossibles[] | undefined): number {
  if (!filtrePossibleResponseList?.length) return 0;

  const maxNombreRésultatList = filtrePossibleResponseList.flatMap((filtrePossibleResponse) => sumRésultatsAgrégation(filtrePossibleResponse.agregation));
  return Math.max(...maxNombreRésultatList);
}

export function mapCodeInsee(response: RésultatsRéférentielCommunesResponse[], codePostalToFindInRéférentiel: string): string {
  const finded = response.find((response) => response.codePostal === codePostalToFindInRéférentiel);
  return finded ? finded.code : codePostalToFindInRéférentiel;
}
