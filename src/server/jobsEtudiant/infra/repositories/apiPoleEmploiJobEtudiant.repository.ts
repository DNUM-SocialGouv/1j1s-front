import { JobEtudiant } from '~/server/jobsEtudiant/domain/jobEtudiant';
import { JobEtudiantRepository } from '~/server/jobsEtudiant/domain/jobEtudiant.repository';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';

export class ApiPoleEmploiJobEtudiantRepository implements JobEtudiantRepository {
  constructor(
    private poleEmploiHttpClientService: PoleEmploiHttpClientService,
  ) {
  }

  async getJobEtudiantList(): Promise<JobEtudiant[]> {
    const response = await this.poleEmploiHttpClientService.get<JobEtudiantResponse>(
      'offres/search?natureContrat=E1&tempsPlein=false&range=0-49',
    );

    return response.data.resultats.map((jobEtudiant) => ({
      id: jobEtudiant.id,
      intitule: jobEtudiant.intitule,
    }));
  }
}

interface JobEtudiantResponse {
  resultats: JobEtudiantDataResponse[];
}

interface JobEtudiantDataResponse {
  id: string;
  intitule: string;
}
