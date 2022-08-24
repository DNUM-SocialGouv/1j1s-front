import { Alternance, RésultatsRechercheAlternance } from '~/server/alternances/domain/alternance';
import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';
import {
  AlternanceFromMatcha,
} from '~/server/alternances/infra/repositories/alternance.type';
import {
  AlternanceMatchasResponse,
  AlternanceResponse,
} from '~/server/alternances/infra/repositories/responses/alternanceResponse.type';
import {
  MatchasContactResponse,
  MatchasResultResponse,
} from '~/server/alternances/infra/repositories/responses/matchasResponse.type';
import { RechercheMetierResponse } from '~/server/alternances/infra/repositories/responses/rechercheMetierResponse.type';
import { mapDateDébutContrat } from '~/server/utils/mapDateDébutContrat.mapper.utils';

export function mapRésultatsRechercheAlternance(response: AlternanceResponse): RésultatsRechercheAlternance {
  const alternanceFromPoleEmploiList = response.peJobs.results.map((peJob) => {
    const ville = mapNomVille(peJob.place?.city);
    const niveauRequis = 'Alternance' as string;
    const typeDeContrats = peJob.job.contractType ? [peJob.job.contractType] : [];
    const étiquetteList = [ville, niveauRequis, ...typeDeContrats].filter((tag: string |undefined) => tag !== undefined) as string[];

    return {
      adresse: peJob.place?.fullAddress,
      description: peJob.job.description,
      entreprise: {
        logo: peJob.company?.logo || undefined,
        nom: peJob.company?.name || undefined,
      },
      from: peJob.ideaType,
      id: peJob.job.id,
      intitulé: peJob.title,
      niveauRequis,
      typeDeContrats,
      ville,
      étiquetteList,
    };
  });

  const alternanceFromMatchaList = response.matchas.results.map((matcha) => {
    const ville = mapNomVille(matcha.place?.city);
    const niveauRequis = matcha.diplomaLevel || undefined;
    const typeDeContrats = matcha.job?.contractType ?? [];
    const étiquetteList = [ville, niveauRequis, ...typeDeContrats].filter((tag: string |undefined) => tag !== undefined) as string[];

    return {
      adresse: matcha.place?.fullAddress,
      description: matcha.job.romeDetails?.definition,
      entreprise: {
        logo: matcha.company?.logo || undefined,
        nom: matcha.company?.name || undefined,
      },
      from: matcha.ideaType,
      id: matcha.job.id,
      intitulé: matcha.title,
      niveauRequis,
      typeDeContrats,
      ville,
      étiquetteList,
    };
  });

  return {
    nombreRésultats: alternanceFromPoleEmploiList.length + alternanceFromMatchaList.length,
    résultats: [...alternanceFromPoleEmploiList, ...alternanceFromMatchaList],
  };
}

export function mapNomVille(ville: string | undefined | null): string | undefined {
  if (!ville) return undefined;
  const villeFormatté = ville.split(' - ');
  return `${villeFormatté[1]} (${villeFormatté[0]})`;
}

export function mapContact(contact: MatchasContactResponse | undefined): Alternance.Contact | undefined {
  if (!contact) return undefined;
  return {
    nom: contact.name,
    téléphone: contact.phone,
  };
}

export function mapOffreAlternance(response: AlternanceMatchasResponse): AlternanceFromMatcha {
  const alternance: MatchasResultResponse = response.matchas[0];
  const ville = mapNomVille(alternance.place?.city);
  const niveauRequis = alternance.diplomaLevel;
  const typeDeContrats = alternance.job.contractType ?? [];
  const étiquetteList = [ville, niveauRequis, ...typeDeContrats].filter((tag: string |undefined) => tag !== undefined) as string[];
  return {
    adresse: alternance.place?.fullAddress,
    competencesDeBase: alternance.job.romeDetails?.competencesDeBase ? alternance.job.romeDetails.competencesDeBase?.flatMap((compétence) => compétence.libelle) : undefined,
    contact: mapContact(alternance.contact),
    description: alternance.job.romeDetails?.definition ? alternance.job.romeDetails.definition : undefined,
    duréeContrat: alternance.job.dureeContrat,
    débutContrat: mapDateDébutContrat(alternance.job.jobStartDate),
    entreprise: {
      logo: alternance.company?.logo || undefined,
      nom: alternance.company?.name || undefined,
    },
    from: alternance.ideaType,
    id: alternance.job.id,
    intitulé: alternance.title,
    niveauRequis,
    rythmeAlternance: alternance.job.rythmeAlternance,
    typeDeContrats,
    ville,
    étiquetteList,
  };
}

export function mapMétierRecherchéList(response: RechercheMetierResponse): MétierRecherché[] {
  return response.labelsAndRomes.map((rechercheMétier) => ({
    codeROMEList: rechercheMétier.romes,
    intitulé: rechercheMétier.label,
  }));
}
