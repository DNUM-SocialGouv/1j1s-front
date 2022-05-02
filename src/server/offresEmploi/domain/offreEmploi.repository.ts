import {
  OffreEmploi,
  OffreEmploiFiltre,
  OffreEmploiId,
  RésultatsRechercheOffreEmploi,
} from '~/server/offresEmploi/domain/offreEmploi';

export interface OffreEmploiRepository {
  getOffreEmploi(id: OffreEmploiId): Promise<OffreEmploi>
  searchOffreEmploi(offreEmploiFiltre: OffreEmploiFiltre): Promise<RésultatsRechercheOffreEmploi>;
}
