import { DemandeDeContactAccompagnement } from '~/server/demande-de-contact/domain/demandeDeContact';
import { DemandeDeContactRepository } from '~/server/demande-de-contact/domain/demandeDeContact.repository';
import { Either } from '~/server/errors/either';
import { MailRepository } from '~/server/mail/domain/mail.repository';

import { buildDemandeDeContactMail } from './demandeDeContactMail.builder';

export class DemandeDeContactAccompagnementRepository implements DemandeDeContactRepository {
  constructor(private mailRepository: MailRepository) {
  }
  
  envoyer(demandeDeContact: DemandeDeContactAccompagnement): Promise<Either<void>> {
    const mail = buildDemandeDeContactMail(demandeDeContact);
    const context = ['accompagnement', 'mission_locale'];

    return this.mailRepository.send(mail, context);
  }
}
