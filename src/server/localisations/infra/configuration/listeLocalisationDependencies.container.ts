import { ApiAdresseRepository } from '~/server/localisations/infra/repositories/apiAdresse.repository';
import { ApiGeoLocalisationRepository } from '~/server/localisations/infra/repositories/apiGeoLocalisation.repository';
import { RechercherLocalisationUseCase } from '~/server/localisations/useCases/rechercherLocalisation.useCase';
import { ConfigurationService } from '~/server/services/configuration.service';
import { buildHttpClientConfigList } from '~/server/services/http/httpClientConfig';

export interface ListeLocalisationDependenciesContainer {
  readonly listeLocalisation: RechercherLocalisationUseCase;
}

export const listeLocalisationDependenciesContainer = (
  configurationService: ConfigurationService,
): ListeLocalisationDependenciesContainer => {
  const { adresseClientService, geoGouvClientService } = buildHttpClientConfigList(configurationService);
  const localisationRepository = new ApiGeoLocalisationRepository(
    geoGouvClientService,
  );
  const localisationAvecCoordonnéesRepository = new ApiAdresseRepository(adresseClientService);

  return {
    listeLocalisation: new RechercherLocalisationUseCase(localisationRepository, localisationAvecCoordonnéesRepository),
  };
};
