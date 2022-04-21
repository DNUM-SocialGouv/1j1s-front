import { JobEtudiant } from "./jobEtudiant";

export interface JobEtudiantRepository {
  getJobEtudiantList(): Promise<JobEtudiant[]>;
}
