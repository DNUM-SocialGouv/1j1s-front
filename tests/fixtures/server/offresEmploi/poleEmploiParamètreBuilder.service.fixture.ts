import {
  PoleEmploiParamètreBuilderService,
} from '~/server/offres/infra/repositories/pole-emploi/poleEmploiParamètreBuilder.service';

export function aPoleEmploiParamètreBuilderService(): PoleEmploiParamètreBuilderService {
  return {
    buildCommonParamètresRecherche: jest.fn,
  } as unknown as PoleEmploiParamètreBuilderService;
}
