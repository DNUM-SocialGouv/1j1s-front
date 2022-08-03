import {
  RécupérerMesuresJeunesDependenciesContainer,
} from '~/server/mesuresJeunes/infra/configuration/récupérerMesuresJeunesDependencies.container';
import {
  ApiStrapiMesuresJeunesRepository,
} from '~/server/mesuresJeunes/infra/repositories/apiStrapiMesuresJeunes.repository';
import { RécupérerCartesJeunesUseCase } from '~/server/mesuresJeunes/useCases/récupérerCartesJeunes.useCase';
import { StrapiHttpClientService } from '~/server/services/http/strapiHttpClient.service';

export type MesuresJeunesDependencies = RécupérerMesuresJeunesDependenciesContainer

export const mesuresJeunesDependenciesContainer = (strapiHttpClientService: StrapiHttpClientService): MesuresJeunesDependencies => {
  const mesuresJeunesRepository = new ApiStrapiMesuresJeunesRepository(strapiHttpClientService);

  return {
    récupérerMesuresJeunes: new RécupérerCartesJeunesUseCase(mesuresJeunesRepository),
  };
};
