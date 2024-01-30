import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';

import { Alternance, AlternanceFiltre, ResultatRechercheAlternance } from '../../domain/alternance';
import { anAlternanceMatcha, aResultatRechercherMultipleAlternance } from '../../domain/alternance.fixture';
import { AlternanceRepository } from '../../domain/alternance.repository';

export function searchAlternanceRepositoryMockResults(filtre: AlternanceFiltre): Either<ResultatRechercheAlternance> {
	if (filtre.codeCommune === '11') {
		return createSuccess(aResultatRechercherMultipleAlternance({
			offreList: new Array(11).fill(anAlternanceMatcha()),
		}));
	}
	if (filtre.codeCommune === '12345') {
		return createFailure(ErreurMetier.SERVICE_INDISPONIBLE);
	}
	return createSuccess(aResultatRechercherMultipleAlternance());
}

export function getAlternanceRepositoryMockResults(): Either<Alternance> {
	return createSuccess(anAlternanceMatcha());
}

export class MockAlternanceRepository implements AlternanceRepository {
	paramètreParDéfaut: string | undefined;

	async search(filtre: AlternanceFiltre): Promise<Either<ResultatRechercheAlternance>> {
		return searchAlternanceRepositoryMockResults(filtre);
	}

	async get(): Promise<Either<Alternance>> {
		return getAlternanceRepositoryMockResults();
	}
}
