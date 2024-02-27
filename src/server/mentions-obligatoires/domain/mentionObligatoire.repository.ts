import { Either } from '~/server/errors/either';
import { MentionObligatoire } from '~/server/mentions-obligatoires/domain/mentionObligatoire';

import { TypeDeMentionObligatoire } from './typeDeMentionObligatoire';

export interface MentionObligatoireRepository {
	getMentionObligatoire(mentionsObligatoires: TypeDeMentionObligatoire): Promise<Either<MentionObligatoire>>
}
