import { Article } from '~/server/cms/domain/article';
import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { MentionsObligatoires } from '~/server/cms/domain/mentionsObligatoires';
import { Either } from '~/server/errors/either';

export class ConsulterPageFooterUseCase {
  constructor(private cmsRepository: CmsRepository) {}

  async handle(pageFooter: MentionsObligatoires): Promise<Either<Article>> {
    return this.cmsRepository.getMentionObligatoire(pageFooter);
  }
}
