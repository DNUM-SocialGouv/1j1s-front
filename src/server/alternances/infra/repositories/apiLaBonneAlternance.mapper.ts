import { Alternance } from '~/server/alternances/domain/alternance';
import { AlternanceResponse } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';

export function mapAlternance(response: AlternanceResponse): Alternance[] {
  const alternanceFromPoleEmploiList = response.peJobs.results.map((peJob) => ({
    description: peJob.job.description,
    entreprise: {
      logo: peJob.company.logo || undefined,
      nom: peJob.company.name,
    },
    id: peJob.job.id,
    intitulé: peJob.title,
  }));

  const alternanceFromMatchaList = response.matchas.results.map((matcha) => ({
    description: matcha.job.romeDetails?.definition,
    entreprise: {
      logo: matcha.company.logo || undefined,
      nom: matcha.company.name,
    },
    id: matcha.job.id,
    intitulé: matcha.title,
  }));

  return [...alternanceFromPoleEmploiList, ...alternanceFromMatchaList];
}
