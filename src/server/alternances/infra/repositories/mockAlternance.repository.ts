import { Alternance, AlternanceFiltre, ResultatRechercheAlternance } from '~/server/alternances/domain/alternance';
import { aDetailMatchaAlternance, aRechercheAlternance } from '~/server/alternances/domain/alternance.fixture';
import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';
import { createFailure, createSuccess, Either, Success } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';


export function mockedRepositoryReturnsASuccessWhenCodeCommuneIsNot12345(filtre: AlternanceFiltre): Success<ResultatRechercheAlternance> | undefined {
	if (filtre.codeCommune !== '12345') {
		return createSuccess(aRechercheAlternance());
	}
}

export function searchAlternanceRepositoryMockResults(): Either<ResultatRechercheAlternance> {
	return createFailure(ErreurMetier.SERVICE_INDISPONIBLE);
}

export function getAlternanceRepositoryMockResults(): Either<Alternance> {
	return createSuccess(aDetailMatchaAlternance());
}

export class MockAlternanceRepository implements AlternanceRepository {
	async search(filtre: AlternanceFiltre): Promise<Either<ResultatRechercheAlternance>> {
		return mockedRepositoryReturnsASuccessWhenCodeCommuneIsNot12345(filtre) ?? searchAlternanceRepositoryMockResults();
	}

	async get(): Promise<Either<Alternance>> {
		return getAlternanceRepositoryMockResults();
	}
}
