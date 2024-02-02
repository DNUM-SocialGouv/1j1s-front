import { Alternance, AlternanceFiltre, ResultatRechercheAlternance } from '~/server/alternances/domain/alternance';
import { anAlternanceMatcha, aResultatRechercherMultipleAlternance } from '~/server/alternances/domain/alternance.fixture';
import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';
import { createFailure, createSuccess, Either, Success } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';

export function mockedRepositoryReturnsASuccessWhenCodeCommuneIs11(filtre: AlternanceFiltre): Success<ResultatRechercheAlternance> | undefined {
	if (filtre.codeCommune === '11') {
		return createSuccess(aResultatRechercherMultipleAlternance({
			offreList: new Array(11).fill(anAlternanceMatcha()),
		}));
	}
}

export function searchAlternanceRepositoryMockResults(filtre: AlternanceFiltre): Either<ResultatRechercheAlternance> {
	if (filtre.codeCommune === '12345') {
		return createFailure(ErreurMetier.SERVICE_INDISPONIBLE);
	}
	return createSuccess(aResultatRechercherMultipleAlternance());
}

export function getAlternanceRepositoryMockResults(): Either<Alternance> {
	return createSuccess(anAlternanceMatcha());
}

export class MockAlternanceRepository implements AlternanceRepository {
	async search(filtre: AlternanceFiltre): Promise<Either<ResultatRechercheAlternance>> {
		return mockedRepositoryReturnsASuccessWhenCodeCommuneIs11(filtre) ?? searchAlternanceRepositoryMockResults(filtre);
	}

	async get(): Promise<Either<Alternance>> {
		return getAlternanceRepositoryMockResults();
	}
}
