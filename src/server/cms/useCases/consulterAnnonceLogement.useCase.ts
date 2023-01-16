import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';
import { CmsIndexRepository } from '~/server/cms/domain/cmsIndex.repository';
import { Either } from '~/server/errors/either';


export class ConsulterAnnonceLogementUseCase {
	constructor(private cmsIndexRepository: CmsIndexRepository) {}

	async handle(slug: string): Promise<Either<AnnonceDeLogement>> {
		return this.cmsIndexRepository.getAnnonceDeLogementBySlug(slug);
	}
}
