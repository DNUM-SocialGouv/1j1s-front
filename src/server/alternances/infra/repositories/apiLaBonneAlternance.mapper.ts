import {
  Alternance,
} from '~/server/alternances/domain/alternance';
import {
  AlternanceFromMatcha,
  AlternanceFromPoleEmploi,
  RésultatRechercheAlternance,
} from '~/server/alternances/infra/repositories/alternance.type';
import {
  AlternanceDetailResponse,
  AlternanceResponse,
  isAlternanceDetailResponseMatcha,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import {
  MatchasContactResponse,
  MatchasResultResponse,
} from '~/server/alternances/infra/repositories/matchasResponse.type';
import {
  PeJobsContactResponse,
  PeJobsResultResponse,
} from '~/server/alternances/infra/repositories/peJobsResponse.type';

export function mapAlternance(response: AlternanceResponse): Alternance[] {
  const alternanceFromPoleEmploiList = response.peJobs.results.map((peJob) => {
    const ville = peJob.place && peJob.place.city ? mapNomVille(peJob.place.city) : undefined;
    const niveauRequis = 'Alternance' as string;
    const typeDeContrats = peJob.job.contractType ? [peJob.job.contractType] : [];
    const étiquetteList = [ville, niveauRequis, ...typeDeContrats].filter((tag: string |undefined) => tag !== undefined) as string[];

    return {
      adresse: peJob.place && peJob.place.fullAddress ? peJob.place.fullAddress : undefined,
      description: peJob.job.description,
      entreprise: {
        logo: peJob.company?.logo ?? undefined,
        nom: peJob.company?.name ?? undefined,
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
    const ville = matcha.place && matcha.place.city ? mapNomVille(matcha.place.city) : undefined;
    const niveauRequis = matcha.diplomaLevel ? matcha.diplomaLevel : undefined;
    const typeDeContrats = matcha.job?.contractType ?? [];
    const étiquetteList = [ville, niveauRequis, ...typeDeContrats].filter((tag: string |undefined) => tag !== undefined) as string[];

    return {
      adresse: matcha.place && matcha.place.fullAddress ? matcha.place.fullAddress : undefined,
      description: matcha.job.romeDetails?.definition,
      entreprise: {
        logo: matcha.company?.logo ?? undefined,
        nom: matcha.company?.name ?? undefined,
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

  return [...alternanceFromPoleEmploiList, ...alternanceFromMatchaList];
}

export function mapNomVille(ville: string | undefined): string | undefined {
  if (!ville) return undefined;
  const villeFormatté = ville.split(' - ');
  return `${villeFormatté[1]} (${villeFormatté[0]})`;
}

function mapContact(contact: MatchasContactResponse | PeJobsContactResponse | undefined): Alternance.Contact | undefined {
  if (!contact) return undefined;
  return {
    nom: contact.name,
    téléphone: contact.phone,
  };
}

export function mapDateDébutContrat(débutContrat:string | undefined): string | undefined {
  if (!débutContrat) return undefined;
  const date = new Date(débutContrat);
  return date.toLocaleDateString('fr-FR');
}

export function mapOffreAlternance(response: AlternanceDetailResponse): RésultatRechercheAlternance {
  if (isAlternanceDetailResponseMatcha(response)) {
    const alternance: MatchasResultResponse = response.matchas[0];
    const ville = alternance.place && alternance.place.city ? mapNomVille(alternance.place.city) : undefined;
    const niveauRequis = alternance.diplomaLevel ?? undefined;
    const typeDeContrats = alternance.job.contractType ?? [];
    const étiquetteList = [ville, niveauRequis, ...typeDeContrats].filter((tag: string |undefined) => tag !== undefined) as string[];
    const alternanceMatcha: AlternanceFromMatcha = {
      adresse: alternance.place?.fullAddress ?? undefined,
      competencesDeBase: alternance.job.romeDetails.competencesDeBase.flatMap((compétence) => compétence.libelle),
      contact: mapContact(alternance.contact),
      description: alternance.job.romeDetails.definition,
      duréeContrat: alternance.job.dureeContrat ?? undefined,
      débutContrat: mapDateDébutContrat(alternance.job.jobStartDate),
      entreprise: {
        logo: alternance.company?.logo ?? undefined,
        nom: alternance.company?.name ?? undefined,
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
    return alternanceMatcha;
  }
  else {
    const alternance: PeJobsResultResponse = response.peJobs[0];
    const ville = mapNomVille(alternance.place?.city);
    const niveauRequis = 'Alternance' as string;
    const typeDeContrats = alternance.job.contractType ? [alternance.job.contractType] : [];
    const étiquetteList = [ville, niveauRequis, ...typeDeContrats].filter((tag: string |undefined) => tag !== undefined) as string[];
    const alternancePeJob: AlternanceFromPoleEmploi = {
      adresse: alternance.place?.fullAddress ?? undefined,
      contact: mapContact(alternance.contact),
      description: alternance.job.description,
      duréeContrat: alternance.job.duration ?? undefined,
      entreprise: {
        logo: alternance.company?.logo ?? undefined,
        nom: alternance.company?.name ?? undefined,
      },
      from: alternance.ideaType,
      id: alternance.job.id,
      intitulé: alternance.title,
      niveauRequis,
      typeDeContrats,
      url: alternance.url,
      ville,
      étiquetteList,
    };
    return alternancePeJob;
  }

}
