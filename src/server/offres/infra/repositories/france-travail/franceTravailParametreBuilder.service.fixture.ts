import {
	FranceTravailParametreBuilderService,
} from './franceTravailParametreBuilder.service';

export function aFranceTravailParametreBuilderService(): FranceTravailParametreBuilderService {
	return {
		buildCommonParamètresRecherche: jest.fn,
	} as unknown as FranceTravailParametreBuilderService;
}
