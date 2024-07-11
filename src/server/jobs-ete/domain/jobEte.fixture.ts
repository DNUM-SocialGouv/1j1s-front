import { DomaineCode } from '~/server/offres/domain/offre';
import { anOffreÉchantillonFiltre } from '~/server/offres/domain/offre.fixture';

import { JobEteFiltre } from './jobEte';

export function aJobEteFiltre(overrides?: Partial<JobEteFiltre>): JobEteFiltre {
	return {
		...anOffreÉchantillonFiltre(),
		grandDomaineList: [DomaineCode.A],
		...overrides,
	};
}
