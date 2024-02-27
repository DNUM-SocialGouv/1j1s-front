import { Article } from '~/server/cms/domain/article';
import { Either } from '~/server/errors/either';
import { MentionObligatoireRepository } from '~/server/mentions-obligatoires/domain/mentionObligatoire.repository';

import { TypeDeMentionObligatoire } from '../domain/typeDeMentionObligatoire';

export class ConsulterMentionObligatoireUseCase {
	constructor(private mentionObligatoireRepository: MentionObligatoireRepository) {}

	async handle(typeDeMentionObligatoire: TypeDeMentionObligatoire): Promise<Either<Article>> {
		return this.mentionObligatoireRepository.getMentionObligatoire(typeDeMentionObligatoire);
	}
}
