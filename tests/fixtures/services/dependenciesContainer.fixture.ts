import { unOffreEmploiService } from '@tests/fixtures/services/offreEmploiService.fixture';

export const aDependenciesContainer = () => {
  return {
    offreEmploiService: unOffreEmploiService(),
  };
};
