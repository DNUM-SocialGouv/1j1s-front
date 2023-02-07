import { createFailure, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { Offre, OffreFiltre, OffreId, RésultatsRechercheOffre } from '~/server/offres/domain/offre';
import { OffreRepository } from '~/server/offres/domain/offre.repository';
import { HttpClientService } from '~/server/services/http/httpClientService';

const caller = '1jeune1solution';

export interface AlternanceFilter {
	romes: string
}

export class ApiLaBonneAlternanceRepository implements OffreRepository {
	constructor(private httpClientService: HttpClientService) {}


	paramètreParDéfaut: string | undefined;

	// FIXME
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	get(id: OffreId): Promise<Either<Offre>> {
		return Promise.resolve(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
	}

	search(filtre: AlternanceFilter): Promise<Either<RésultatsRechercheOffre>> {
		this.httpClientService.get(`/jobs?caller=${caller}&romes=${filtre.romes}`);
		return Promise.resolve(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
	}
}
