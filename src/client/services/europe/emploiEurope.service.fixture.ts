import { EmploiEuropeService } from '~/client/services/europe/emploiEurope.service';
import { aResultatRechercheEmploiEuropeList } from '~/server/emplois-europe/domain/emploiEurope.fixture';
import { createSuccess } from '~/server/errors/either';

export function anEmploiEuropeService(override?: Partial<EmploiEuropeService>): EmploiEuropeService {
	return {
		rechercherEmploiEurope: jest.fn().mockResolvedValue(createSuccess(aResultatRechercheEmploiEuropeList())),
		...override,
	};
}
