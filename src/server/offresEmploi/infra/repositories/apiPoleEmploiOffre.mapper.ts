import { OffreEmploi, RésultatsRechercheOffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import {
  OffreEmploiResponse,
  RésultatsRechercheOffreEmploiResponse,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.response';
import TypeDeContrat = OffreEmploi.TypeDeContrat;

export function mapRésultatsRechercheOffreEmploi(response: RésultatsRechercheOffreEmploiResponse): RésultatsRechercheOffreEmploi {
  return {
    nombreRésultats: getNombreRésultats(response.filtresPossibles),
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
    urlOffreOrigine: offreEmploiResponse.origineOffre.urlOrigine,
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

function mapTypeContrat(typeContrat: OffreEmploiResponse.TypeContrat): TypeDeContrat {
  switch (typeContrat) {
    case 'CDD':
      return OffreEmploi.CONTRAT_CDD;
    case 'CDI':
      return OffreEmploi.CONTRAT_CDI;
    case 'MIS':
      return OffreEmploi.CONTRAT_INTÉRIMAIRE;
    case 'SAI':
      return OffreEmploi.CONTRAT_SAISONNIER;
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

function getNombreRésultats(filtrePossibleResponseList: RésultatsRechercheOffreEmploiResponse.FiltresPossibles[] | undefined): number {
  if (!filtrePossibleResponseList?.length) return 0;

  const maxNombreRésultatList = filtrePossibleResponseList.flatMap((filtrePossibleResponse) => sumRésultatsAgrégation(filtrePossibleResponse.agregation));
  return Math.max(...maxNombreRésultatList);
}
