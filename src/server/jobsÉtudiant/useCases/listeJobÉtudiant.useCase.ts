import { JobÉtudiantRepository } from '~/server/jobsÉtudiant/domain/jobÉtudiant.repository';

export class ListeJobÉtudiantUseCase {
  constructor(private jobÉtudiantRepository: JobÉtudiantRepository) {}

  async handle() {
    return await this.jobÉtudiantRepository.getJobÉtudiantList();
  }
}
