import { ErreurMetier } from '~/server/errors/erreurMetier.types';

import { createFailure, createSuccess, Either } from '../../../errors/either';
import { Offre, OffreFiltre, RésultatsRechercheOffre } from '../../domain/offre';
import { aBarmanOffre, aRésultatEchantillonOffre, aRésultatsRechercheOffre } from '../../domain/offre.fixture';
import { OffreRepository } from '../../domain/offre.repository';

export function searchOffreRepositoryMockResults(filtre: OffreFiltre): Either<RésultatsRechercheOffre> {
	if (filtre.page === 1 && !filtre.motClé) {
		return createSuccess(aRésultatEchantillonOffre());
	}
	if (filtre.page === 1 && filtre.motClé === 'barman') {
		return createSuccess(aRésultatsRechercheOffre({
			nombreRésultats: 1,
			résultats: [aBarmanOffre()],
		}));
	}
	if (filtre.page === 67) {
		return createFailure(ErreurMetier.DEMANDE_INCORRECTE);
	}

	return createSuccess(aRésultatsRechercheOffre());
}

export function getOffreRepositoryMockResults(): Either<Offre> {
	return createSuccess(aBarmanOffre());
}

export class MockOffreRepository implements OffreRepository {
	paramètreParDéfaut: string | undefined;

	get(): Promise<Either<Offre>> {
		return Promise.resolve(getOffreRepositoryMockResults());
	}

	search(filtre: OffreFiltre): Promise<Either<RésultatsRechercheOffre>> {
		return Promise.resolve(searchOffreRepositoryMockResults(filtre));
	}
}
