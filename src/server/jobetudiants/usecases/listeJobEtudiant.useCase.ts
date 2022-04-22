import { JobEtudiantRepository } from "../domain/jobEtudiant.repository";

export class ListeJobEtudiantUseCase {
  constructor(private jobEtudiantRepository: JobEtudiantRepository) {}

  async handle() {
    return await this.jobEtudiantRepository.getJobEtudiantList();
  }
}
