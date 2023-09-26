import { Either } from '~/server/errors/either';
import { FAQ } from '~/server/faq/domain/FAQ';

import { FAQRepository } from '../domain/FAQ.repository';


export class ListerFAQUseCase {
	constructor(private faqRepository: FAQRepository) {}

	handle(): Promise<Either<Array<FAQ.Question>>> {
		return this.faqRepository.getAllFAQ();
	}
}
