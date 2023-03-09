import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { FoireAuxQuestions } from '~/server/cms/domain/foireAuxQuestions.type';
import { Either } from '~/server/errors/either';


export class ListerQuestionsFAQUseCase {
	constructor(private cmsRepository: CmsRepository) {}

	handle(): Promise<Either<Array<FoireAuxQuestions>>> {
		return this.cmsRepository.getAllFoireAuxQuestions();
	}
}
