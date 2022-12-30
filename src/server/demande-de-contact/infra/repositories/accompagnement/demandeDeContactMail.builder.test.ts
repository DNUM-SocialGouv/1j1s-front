import { aDemandeDeContactAccompagnement } from '~/server/demande-de-contact/domain/demandeDeContact.fixture';
import { buildDemandeDeContactMail } from '~/server/demande-de-contact/infra/repositories/accompagnement/demandeDeContactMail.builder';
import { aMail } from '~/server/mail/domain/mail.fixture';

describe('DemandeDeContactMailBuilder', () => {
	describe('buildDemandeDeContactMail', () => {
		it('construit l’email à envoyer', () => {
			const demandeDeContactAccompagnement = aDemandeDeContactAccompagnement();

			const result = buildDemandeDeContactMail(demandeDeContactAccompagnement);

			expect(result).toEqual(aMail());
		});
	});
});
