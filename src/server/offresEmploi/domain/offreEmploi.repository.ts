import { Either } from '~/server/errors/either';
import {
  OffreEmploi,
  OffreEmploiFiltre,
  OffreEmploiId,
  RésultatsRechercheOffreEmploi,
} from '~/server/offresEmploi/domain/offreEmploi';

export interface OffreEmploiRepository {
  getOffreEmploi(id: OffreEmploiId): Promise<Either<OffreEmploi>>
  getSampleOffreEmploi(isJobEtudiant: boolean): Promise<Either<RésultatsRechercheOffreEmploi>>
  searchOffreEmploi(offreEmploiFiltre: OffreEmploiFiltre): Promise<Either<RésultatsRechercheOffreEmploi>>
}
