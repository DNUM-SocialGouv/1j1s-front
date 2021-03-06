import { Either } from '~/server/errors/either';
import {
  OffreEmploi,
  OffreEmploiFiltre,
  OffreEmploiId,
  R├ęsultatsRechercheOffreEmploi,
} from '~/server/offresEmploi/domain/offreEmploi';

export interface OffreEmploiRepository {
  getOffreEmploi(id: OffreEmploiId): Promise<Either<OffreEmploi>>
  searchOffreEmploi(offreEmploiFiltre: OffreEmploiFiltre): Promise<Either<R├ęsultatsRechercheOffreEmploi>>
}
