import { CmsService } from '~/server/cms/domain/cmsService';
import { Either } from '~/server/errors/either';
import { MentionObligatoire } from '~/server/mentions-obligatoires/domain/mentionObligatoire';
import { StrapiMentionObligatoire } from '~/server/mentions-obligatoires/infra/strapiMentionObligatoire';

import { MentionObligatoireRepository } from '../domain/mentionObligatoire.repository';
import { TypeDeMentionObligatoire } from '../domain/typeDeMentionObligatoire';

export class StrapiMentionObligatoireRepository implements MentionObligatoireRepository {
	constructor(private readonly cmsService: CmsService) {}

	async getMentionObligatoire(typeDeMentionObligatoire: TypeDeMentionObligatoire): Promise<Either<MentionObligatoire>> {
		const query = 'populate=deep';
		return this.cmsService.getSingleType<StrapiMentionObligatoire>(typeDeMentionObligatoire, query);
	}
}
