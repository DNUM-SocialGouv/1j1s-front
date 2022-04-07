import { OffreEmploiRepository } from "../../../offreemplois/domain/OffreEmploiRepository";
import { JobEtudiant } from "../../domain/JobEtudiant";
import { JobEtudiantRepository } from "../../domain/JobEtudiantRepository";
import { ClientService } from "../../../services/http/ClientService";
import { ApiTokenRepository } from "../../../tokens/infra/ApiTokenRepository";

export class ApiPoleEmploiJobEtudiantRepository
  implements JobEtudiantRepository
{
  constructor(
    private readonly httpClientService: ClientService,
    private readonly apiTokenRepository: ApiTokenRepository
  ) {}

  async listeJobEtudiant(): Promise<JobEtudiant[]> {
    const token = await this.apiTokenRepository.getToken();

    const response = await this.httpClientService.get<JobEtudiantResponse>(
      "https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres/search?natureContrat=E1&tempsPlein=false&range=0-49",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
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
