import { OffreEmploiRepository } from "../../offreemplois/domain/OffreEmploiRepository";
import { JobEtudiantRepository } from "../domain/JobEtudiantRepository";

export class ListeJobEtudiant {
  constructor(private jobEtudiantRepository: JobEtudiantRepository) {}

  async handle() {
    return await this.jobEtudiantRepository.listeJobEtudiant();
  }
}
