import {
  ApiStrapiMesuresJeunesRepository,
} from '~/server/mesuresJeunes/infra/repositories/apiStrapiMesuresJeunes.repository';
import { RécupérerMesuresJeunesUseCase } from '~/server/mesuresJeunes/useCases/récupérerMesuresJeunesUseCase';
import { StrapiHttpClientService } from '~/server/services/http/strapiHttpClient.service';

export interface MesuresJeunesDependencies {
  récupérerMesuresJeunes: RécupérerMesuresJeunesUseCase
}

export const mesuresJeunesDependenciesContainer = (strapiHttpClientService: StrapiHttpClientService) => {
  const mesuresJeunesRepository = new ApiStrapiMesuresJeunesRepository(strapiHttpClientService);

  return {
    récupérerMesuresJeunes: new RécupérerMesuresJeunesUseCase(mesuresJeunesRepository),
  };
};
