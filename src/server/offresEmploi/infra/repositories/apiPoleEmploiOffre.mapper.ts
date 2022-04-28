import { OffreEmploi, RésultatsRechercheOffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import {
  OffreEmploiResponse,
  RésultatsRechercheOffreEmploiResponse,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.response';

export function mapRésultatsRechercheOffreEmploi(response: RésultatsRechercheOffreEmploiResponse): RésultatsRechercheOffreEmploi {
  return {
    nbRésultats: sumRésultatsFiltrePossible(response.filtresPossibles),
    résultats: response.resultats.map(mapOffreEmploi),
  };
}

export function mapOffreEmploi(offreEmploiResponse: OffreEmploiResponse): OffreEmploi {
  return {
    description: offreEmploiResponse.description,
    duréeTravail: mapDuréeTravail(offreEmploiResponse.dureeTravailLibelleConverti),
    entreprise: {
      logo: offreEmploiResponse.entreprise?.logo,
      nom: offreEmploiResponse.entreprise?.nom,
    },
    expérience: mapExpérience(offreEmploiResponse.experienceExige),
    id: offreEmploiResponse.id,
    intitulé: offreEmploiResponse.intitule,
    lieuTravail: mapLieuTravail(offreEmploiResponse.lieuTravail),
    typeContrat: mapTypeContrat(offreEmploiResponse.typeContrat),
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

function mapTypeContrat(typeContrat: OffreEmploiResponse.TypeContrat): OffreEmploi.TypeContrat {
  switch (typeContrat) {
    case 'CDD':
      return OffreEmploi.TypeContrat.CDD;
    case 'CDI':
      return OffreEmploi.TypeContrat.CDI;
    case 'MIS':
      return OffreEmploi.TypeContrat.MIS;
    case 'SAI':
      return OffreEmploi.TypeContrat.SAI;
  }
}

function mapLieuTravail(lieuTravailResponse?: OffreEmploiResponse.LieuTravail): string | undefined {
  if (!lieuTravailResponse) {
    return undefined;
  }
  const lieuTravail = lieuTravailResponse.libelle.split(' - ');
  const ville = lieuTravail[1];
  const département = lieuTravail[0];
  return `${ville} (${département})`;
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

function sumRésultatsFiltrePossible(filtrePossibleResponseList: RésultatsRechercheOffreEmploiResponse.FiltresPossibles[]): number {
  return filtrePossibleResponseList.reduce((nbRésultats, filtrePossibleResponse) => nbRésultats + sumRésultatsAgrégation(filtrePossibleResponse.agregation), 0);
}
