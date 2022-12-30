import { Either } from '~/server/errors/either';
import { Mail } from '~/server/mail/domain/mail';

export interface MailRepository {
  send(mail: Mail, context: string[]): Promise<Either<void>>
}
