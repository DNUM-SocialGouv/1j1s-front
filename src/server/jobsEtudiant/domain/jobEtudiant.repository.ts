import { JobEtudiant } from "~/server/jobsEtudiant/domain/jobEtudiant";

export interface JobEtudiantRepository {
  getJobEtudiantList(): Promise<JobEtudiant[]>;
}
