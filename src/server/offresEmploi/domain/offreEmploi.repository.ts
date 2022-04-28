import {
  OffreEmploi,
  OffreEmploiFiltre,
  RésultatsRechercheOffreEmploi,
} from '~/server/offresEmploi/domain/offreEmploi';

export interface OffreEmploiRepository {
  getOffreEmploi(id: string): Promise<OffreEmploi>
  searchOffreEmploi(offreEmploiFiltre: OffreEmploiFiltre): Promise<RésultatsRechercheOffreEmploi>;
}
