import { aDemandeDeContactAccompagnement } from '~/server/demande-de-contact/domain/demandeDeContact.fixture';
import { buildDemandeDeContactMail } from '~/server/demande-de-contact/infra/repositories/accompagnement/demandeDeContactMail.builder';
import { aMail, aMailWithoutCommentaire, aMailWithoutEmailAddress } from '~/server/mail/domain/mail.fixture';

describe('DemandeDeContactMailBuilder', () => {
	describe('buildDemandeDeContactMail', () => {
		describe('quand la demande comporte tous les champs', () => {
			it('construit l’email à envoyer', () => {
				const demandeDeContactAccompagnement = aDemandeDeContactAccompagnement();

				const result = buildDemandeDeContactMail(demandeDeContactAccompagnement);

				expect(result).toEqual(aMail());
			});
		});

		describe('quand la demande ne comporte pas d’email', () => {
			it('construit l’email à envoyer sans replyTo', () => {
				const demandeDeContactAccompagnement = aDemandeDeContactAccompagnement();
				delete demandeDeContactAccompagnement.email;

				const result = buildDemandeDeContactMail(demandeDeContactAccompagnement);

				expect(result).toEqual(aMailWithoutEmailAddress());
			});
		});

		describe('quand la demande ne comporte pas de commentaire', () => {
			it('construit l’email à envoyer avec un texte de remplacement pour le commentaire', () => {
				const demandeDeContactAccompagnement = aDemandeDeContactAccompagnement();
				delete demandeDeContactAccompagnement.commentaire;

				const result = buildDemandeDeContactMail(demandeDeContactAccompagnement);

				expect(result).toEqual(aMailWithoutCommentaire());
			});
		});
	});
});
