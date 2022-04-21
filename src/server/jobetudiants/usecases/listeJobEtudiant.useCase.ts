import { OffreEmploiRepository } from "../../offreemplois/domain/offreEmploi.repository";
import { JobEtudiantRepository } from "../domain/jobEtudiant.repository";

export class ListeJobEtudiantUseCase {
  constructor(private jobEtudiantRepository: JobEtudiantRepository) {}

  async handle() {
    return await this.jobEtudiantRepository.getJobEtudiantList();
  }
}
