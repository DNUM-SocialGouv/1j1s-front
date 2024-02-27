import { Either } from '~/server/errors/either';
import { MentionObligatoire } from '~/server/mentions-obligatoires/domain/mentionObligatoire';
import { MentionObligatoireRepository } from '~/server/mentions-obligatoires/domain/mentionObligatoire.repository';

import { TypeDeMentionObligatoire } from '../domain/typeDeMentionObligatoire';

export class ConsulterMentionObligatoireUseCase {
	constructor(private mentionObligatoireRepository: MentionObligatoireRepository) {}

	async handle(typeDeMentionObligatoire: TypeDeMentionObligatoire): Promise<Either<MentionObligatoire>> {
		return this.mentionObligatoireRepository.getMentionObligatoire(typeDeMentionObligatoire);
	}
}
