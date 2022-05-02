import { JobÉtudiant } from '~/server/jobsÉtudiant/domain/jobÉtudiant';
import { JobÉtudiantRepository } from '~/server/jobsÉtudiant/domain/jobÉtudiant.repository';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';

export class ApiPoleEmploiJobÉtudiantRepository implements JobÉtudiantRepository {
  constructor(
    private poleEmploiHttpClientService: PoleEmploiHttpClientService,
  ) {
  }

  async getJobÉtudiantList(): Promise<JobÉtudiant[]> {
    const response = await this.poleEmploiHttpClientService.get<JobÉtudiantResponse>(
      'offres/search?natureContrat=E1&tempsPlein=false&range=0-49',
    );

    return response.data.resultats.map((jobÉtudiant) => ({
      id: jobÉtudiant.id,
      intitule: jobÉtudiant.intitule,
    }));
  }
}

interface JobÉtudiantResponse {
  resultats: JobÉtudiantDataResponse[];
}

interface JobÉtudiantDataResponse {
  id: string;
  intitule: string;
}
