import { unOffreEmploiService } from '@tests/fixtures/client/services/offreEmploiService.fixture';

export const aDependenciesContainer = () => {
  return {
    offreEmploiService: unOffreEmploiService(),
  };
};
