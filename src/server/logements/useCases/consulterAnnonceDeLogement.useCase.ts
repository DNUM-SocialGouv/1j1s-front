import { Either } from '~/server/errors/either';
import { AnnonceDeLogement } from '~/server/logements/domain/annonceDeLogement';
import { AnnonceDeLogementRepository } from '~/server/logements/domain/annonceDeLogement.repository';

export class ConsulterAnnonceLogementUseCase {
	constructor(private annonceDeLogementRepository: AnnonceDeLogementRepository) {
	}

	async handle(slug: string): Promise<Either<AnnonceDeLogement>> {
		return this.annonceDeLogementRepository.getAnnonceDeLogementBySlug(slug);
	}
}
