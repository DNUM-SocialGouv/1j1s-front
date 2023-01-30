import { Either } from '../../errors/either';
import { CmsIndexRepository } from '../domain/cmsIndex.repository';
import { OffreDeStageDepot } from '../domain/offreDeStage.type';

export class enregistrerOffreDeStageUseCase {
	constructor(private cmsIndexRepository: CmsIndexRepository) {}

	async handle(offre: OffreDeStageDepot): Promise<Either<void>> {
		return this.cmsIndexRepository.saveOffreDeStage(offre);
	}
}
