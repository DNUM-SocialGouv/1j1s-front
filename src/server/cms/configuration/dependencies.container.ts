import { ConfigurationService } from '~/server/services/configuration.service';

export interface CmsDependencies {
	duréeDeValiditéEnSecondes: () => number
}

const UN_JOUR_EN_SECONDES = 60 * 60 * 24;

export function cmsDependenciesContainer(configurationService: ConfigurationService): CmsDependencies {
	const { IS_REVIEW_APP } = configurationService.getConfiguration();
	const duréeDeValiditéEnSecondes = IS_REVIEW_APP ? 20 : UN_JOUR_EN_SECONDES;

	return {
		duréeDeValiditéEnSecondes: () => duréeDeValiditéEnSecondes,
	};
}
