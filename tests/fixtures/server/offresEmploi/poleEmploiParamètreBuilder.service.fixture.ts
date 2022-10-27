import {
  PoleEmploiParamètreBuilderService,
} from '~/server/offres/infra/repositories/pole-emploi/poleEmploiParamètreBuilder.service';

export function aPoleEmploiParamTreBuilderService(): PoleEmploiParamètreBuilderService {
  return {
    buildCommonParamètresRecherche: jest.fn,
  } as unknown as PoleEmploiParamètreBuilderService;
}
