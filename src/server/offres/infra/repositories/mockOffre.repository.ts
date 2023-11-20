import { ErreurMetier } from '~/server/errors/erreurMetier.types';

import { createFailure, createSuccess, Either } from '../../../errors/either';
import { Offre, OffreFiltre, RésultatsRechercheOffre } from '../../domain/offre';
import { aBarmanOffre, aRésultatsRechercheOffre } from '../../domain/offre.fixture';
import { OffreRepository } from '../../domain/offre.repository';

export class MockOffreRepository implements OffreRepository {
	paramètreParDéfaut: string | undefined;

	get(): Promise<Either<Offre>> {
		return Promise.resolve(createSuccess(aBarmanOffre()));
	}

	search(filtre: OffreFiltre): Promise<Either<RésultatsRechercheOffre>> {
		if (filtre.page === 67) {
			return Promise.resolve(createFailure(ErreurMetier.DEMANDE_INCORRECTE));
		}
		return Promise.resolve(createSuccess(aRésultatsRechercheOffre()));
	}
}
