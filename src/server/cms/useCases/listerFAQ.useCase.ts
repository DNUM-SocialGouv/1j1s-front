import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { Question } from '~/server/cms/domain/FAQ.type';
import { Either } from '~/server/errors/either';


export class ListerFAQUseCase {
	constructor(private cmsRepository: CmsRepository) {}

	handle(): Promise<Either<Array<Question>>> {
		return this.cmsRepository.getAllFAQ();
	}
}
