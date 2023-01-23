import { DemandeDeContactAccompagnement } from '~/server/demande-de-contact/domain/demandeDeContact';
import { Mail } from '~/server/mail/domain/mail';

const AUCUN_EMAIL = 'non renseigné';
const AUCUN_COMMENTAIRE = 'aucun commentaire';

export function buildDemandeDeContactMail(demandeDeContactAccompagnement: DemandeDeContactAccompagnement): Mail {
	const mail: Mail = {
		msg: {
			from: {
				address: 'contact-1j1s@sg.social.gouv.fr',
				personalName: '1jeune1solution',
			},
			subject: 'Demande de contact 1jeune1solution',
			text: `Cette demande de contact a été renseignée depuis le site 1jeune1solution https://www.1jeune1solution.gouv.fr/accompagnement :
    • Prénom : ${demandeDeContactAccompagnement.prénom} 
    • Nom : ${demandeDeContactAccompagnement.nom} 
    • Adresse email : ${demandeDeContactAccompagnement.email || AUCUN_EMAIL}
    • Téléphone : ${demandeDeContactAccompagnement.téléphone}
    • Age : ${demandeDeContactAccompagnement.age}
    • Ville : ${demandeDeContactAccompagnement.commune}
    • Commentaire : ${demandeDeContactAccompagnement.commentaire || AUCUN_COMMENTAIRE}`,
		},
		to: [
			{
				address: demandeDeContactAccompagnement.établissement.email,
				personalName: demandeDeContactAccompagnement.établissement.nom,
			},
		],
	};

	if (demandeDeContactAccompagnement.email) {
		mail.msg.replyTo = {
			address: demandeDeContactAccompagnement.email,
			personalName: `${demandeDeContactAccompagnement.prénom} ${demandeDeContactAccompagnement.nom}`,
		};
	}

	return mail;
}
