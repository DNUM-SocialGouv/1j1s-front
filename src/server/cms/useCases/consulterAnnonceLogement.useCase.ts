import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';
import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { Either } from '~/server/errors/either';

export class ConsulterAnnonceLogementUseCase {
	constructor(private cmsRepository: CmsRepository) {}

	async handle(slug: string): Promise<Either<AnnonceDeLogement>> {
		return this.cmsRepository.getAnnonceDeLogementBySlug(slug);
	}
}
