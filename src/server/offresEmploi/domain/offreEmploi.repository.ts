import { OffreEmploiFiltre, RésultatsRechercheOffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

export interface OffreEmploiRepository {
  searchOffreEmploi(offreEmploiFiltre: OffreEmploiFiltre): Promise<RésultatsRechercheOffreEmploi>;
}
