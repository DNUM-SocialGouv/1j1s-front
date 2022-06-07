import {
  Alternance,
  AlternanceBase,
  AlternanceMatcha,
  AlternancePeJob,
  IdeaType,
} from '~/server/alternances/domain/alternance';
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

export function mapAlternance(response: AlternanceResponse): AlternanceBase[] {
  const alternanceFromPoleEmploiList = response.peJobs.results.map((peJob) => {
    const ville = mapNomVille(peJob.place.city);
    const niveauRequis = 'Alternance' as string;
    const typeDeContrats = [peJob.job.contractType];
    const étiquetteList = [ville, niveauRequis, ...typeDeContrats].filter((tag: string |undefined) => tag !== undefined) as string[];

    return {
      adresse: peJob.place.fullAddress,
      description: peJob.job.description,
      entreprise: {
        logo: peJob.company.logo || undefined,
        nom: peJob.company.name,
      },
      id: peJob.job.id,
      ideaType: peJob.ideaType,
      intitulé: peJob.title,
      niveauRequis,
      typeDeContrats,
      ville,
      étiquetteList,
    };

  });

  const alternanceFromMatchaList = response.matchas.results.map((matcha) => {
    const ville = mapNomVille(matcha.place.city);
    const niveauRequis = matcha.diplomaLevel;
    const typeDeContrats = matcha.job.contractType;
    const étiquetteList = [ville, niveauRequis, ...typeDeContrats].filter((tag: string |undefined) => tag !== undefined) as string[];

    return {
      adresse: matcha.place.fullAddress,
      description: matcha.job.romeDetails?.definition,
      entreprise: {
        logo: matcha.company.logo || undefined,
        nom: matcha.company.name,
      },
      id: matcha.job.id,
      ideaType: matcha.ideaType,
      intitulé: matcha.title,
      niveauRequis,
      typeDeContrats,
      ville,
      étiquetteList,
    };
  });

  return [...alternanceFromPoleEmploiList, ...alternanceFromMatchaList];
}

export function mapNomVille(ville: string | null): string | undefined {
  if (ville === null) return undefined;
  const villeFormatté = ville.split(' - ');
  return `${villeFormatté[1]} (${villeFormatté[0]})`;
}


function mapContactMatcha(contact: MatchasContactResponse): AlternanceMatcha.Contact {
  return {
    nom: contact.name,
    téléphone: contact.phone,
  };
}

function mapContactPeJob(contact: PeJobsContactResponse): AlternancePeJob.Contact {
  return {
    info: contact.info,
    téléphone: contact.phone,
  };
}

export function mapOffreAlternance(ideaType: IdeaType, response: AlternanceDetailResponse): Alternance {
  if (isAlternanceDetailResponseMatcha(response)) {
    const alternance: MatchasResultResponse = response.matchas[0];
    const ville = mapNomVille(alternance.place.city);
    const niveauRequis = alternance.diplomaLevel;
    const typeDeContrats = alternance.job.contractType;
    const étiquetteList = [ville, niveauRequis, ...typeDeContrats].filter((tag: string |undefined) => tag !== undefined) as string[];
    const alternanceMatcha: AlternanceMatcha = {
      adresse: alternance.place.fullAddress,
      competencesDeBase: alternance.job.romeDetails.competencesDeBase.flatMap((compétence) => compétence.libelle),
      contact: mapContactMatcha(alternance.contact),
      description: alternance.job.romeDetails.definition,
      duréeContrat: alternance.job.dureeContrat,
      débutContrat: alternance.job.jobStartDate,
      entreprise: {
        logo: alternance.company.logo || undefined,
        nom: alternance.company.name,
      },
      id: alternance.job.id,
      ideaType: alternance.ideaType,
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
    const ville = mapNomVille(alternance.place.city);
    const niveauRequis = 'Alternance' as string;
    const typeDeContrats = [alternance.job.contractType];
    const étiquetteList = [ville, niveauRequis, ...typeDeContrats].filter((tag: string |undefined) => tag !== undefined) as string[];
    const alternancePeJob: AlternancePeJob = {
      adresse: alternance.place.fullAddress,
      contact: mapContactPeJob(alternance.contact),
      description: alternance.job.description,
      duréeContrat: alternance.job.duration,
      entreprise: {
        logo: alternance.company.logo || undefined,
        nom: alternance.company.name,
      },
      id: alternance.job.id,
      ideaType: alternance.ideaType,
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
