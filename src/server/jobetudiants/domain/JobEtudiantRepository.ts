import { JobEtudiant } from "./JobEtudiant";

export interface JobEtudiantRepository {
  listeJobEtudiant(): Promise<JobEtudiant[]>;
}
