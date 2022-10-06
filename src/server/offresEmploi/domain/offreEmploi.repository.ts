import { Either } from '~/server/errors/either';
import {
  OffreEmploi,
  OffreEmploiId,
  OffreFiltre,
  RésultatsRechercheOffreEmploi,
} from '~/server/offresEmploi/domain/offreEmploi';

export interface OffreEmploiRepository {
  getOffreEmploi(id: OffreEmploiId): Promise<Either<OffreEmploi>>
  searchOffreEmploi(offreEmploiFiltre: OffreFiltre): Promise<Either<RésultatsRechercheOffreEmploi>>
}
