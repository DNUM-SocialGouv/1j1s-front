import { Either } from '~/server/errors/either';
import { FAQQuestion } from '~/server/faq/domain/FAQ';

import { FAQRepository } from '../domain/FAQ.repository';


export class ListerFAQUseCase {
	constructor(private faqRepository: FAQRepository) {}

	handle(): Promise<Either<Array<FAQQuestion>>> {
		return this.faqRepository.getAllFAQ();
	}
}
