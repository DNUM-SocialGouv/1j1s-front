import { aDemandeDeContactAccompagnement } from '~/server/demande-de-contact/domain/demandeDeContact.fixture';
import {
	DemandeDeContactAccompagnementRepository,
} from '~/server/demande-de-contact/infra/repositories/accompagnement/demandeDeContactAccompagnement.repository';
import { createSuccess } from '~/server/errors/either';
import { aMail } from '~/server/mail/domain/mail.fixture';
import { aMailRepository } from '~/server/mail/infra/repositories/tipimail.repository.fixture';

describe('DemandeDeContactAccompagnementRepository', () => {
	it('envoie une demande de contact au mailer', async () => {
		const mailRepository = aMailRepository();
		const repository = new DemandeDeContactAccompagnementRepository(mailRepository);
		const expected = createSuccess(undefined);
		const demandeDeContactAccompagnement = aDemandeDeContactAccompagnement();
		const mail = aMail();
		const context = ['accompagnement', 'mission_locale'];

		// when
		const result = await repository.envoyer(demandeDeContactAccompagnement);

		// then
		expect(mailRepository.send).toHaveBeenCalledWith(mail, context);
		expect(result).toEqual(expected);
	});
});
