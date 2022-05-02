import { JobÉtudiant } from '~/server/jobsÉtudiant/domain/jobÉtudiant';

export interface JobÉtudiantRepository {
  getJobÉtudiantList(): Promise<JobÉtudiant[]>;
}
