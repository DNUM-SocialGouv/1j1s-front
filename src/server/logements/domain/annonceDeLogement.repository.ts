import { Either } from '~/server/errors/either';

import { AnnonceDeLogement } from './annonceDeLogement';

export interface AnnonceDeLogementRepository {
	getAnnonceDeLogementBySlug(slug: string): Promise<Either<AnnonceDeLogement>>
	listAllAnnonceDeLogementSlug(): Promise<Either<Array<string>>>
}
