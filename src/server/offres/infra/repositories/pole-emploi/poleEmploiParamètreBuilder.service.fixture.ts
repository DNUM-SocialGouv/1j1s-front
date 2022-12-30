import {
	PoleEmploiParamètreBuilderService,
} from './poleEmploiParamètreBuilder.service';

export function aPoleEmploiParamètreBuilderService(): PoleEmploiParamètreBuilderService {
	return {
		buildCommonParamètresRecherche: jest.fn,
	} as unknown as PoleEmploiParamètreBuilderService;
}
