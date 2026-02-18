import {
	FranceTravailParametreBuilderService,
} from './franceTravailParametreBuilder.service';

export function aFranceTravailParametreBuilderService(): FranceTravailParametreBuilderService {
	return {
		buildCommonParamètresRecherche: vi.fn,
	} as unknown as FranceTravailParametreBuilderService;
}
