import { Alternance } from '~/server/alternances/domain/alternance';
import { AlternanceResponse } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';

export function mapAlternance(response: AlternanceResponse): Alternance[] {
  const alternanceFromPoleEmploiList = response.peJobs.results.map((peJob) => {
    const ville = mapNomVille(peJob.place.city);
    const niveauRequis = 'Alternance' as string;
    const typeDeContrats = [peJob.job.contractType];
    const étiquetteList = [ville, niveauRequis, ...typeDeContrats].filter((tag: string |undefined) => tag !== undefined) as string[];

    return {
      description: peJob.job.description,
      entreprise: {
        logo: peJob.company.logo || undefined,
        nom: peJob.company.name,
      },
      id: peJob.job.id,
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
      description: matcha.job.romeDetails?.definition,
      entreprise: {
        logo: matcha.company.logo || undefined,
        nom: matcha.company.name,
      },
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

export function mapNomVille(ville: string | null): string | undefined {
  if (ville === null) return undefined;
  const villeFormatté = ville.split(' - ');
  return `${villeFormatté[1]} (${villeFormatté[0]})`;
}
