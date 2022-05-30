import { Alternance } from '~/server/alternances/domain/alternance';
import { AlternanceResponse } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';

export function mapMaBonneAlternanceResponse(response: AlternanceResponse) {
  const alternanceFromPoleEmploiList = response.peJobs.results.map<Alternance>((peJob) => ({
    description: peJob.job.description,
    entreprise: {
      nom: peJob.company.name,
    },
    id: peJob.job.id,
    intitulé: peJob.title,
  }));

  const alternanceFromMatchaList = response.matchas.results.map((matcha) => ({
    description: matcha.job.romeDetails?.definition,
    entreprise: {
      nom: matcha.company.name,
    },
    id: matcha.job.id,
    intitulé: matcha.title,
  }));

  return [...alternanceFromPoleEmploiList, ...alternanceFromMatchaList];
}
