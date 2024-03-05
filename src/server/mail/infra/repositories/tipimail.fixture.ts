import { TipimailRequest } from '~/server/mail/infra/repositories/tipimail';

export function aTipimailRequest(): TipimailRequest {
	return {
		headers: {
			'X-TM-DOMAIN': '1jeune1solution.gouv.fr',
			'X-TM-TAGS': ['accompagnement', 'mission_locale'],
		},
		msg: {
			from: {
				address: 'contact-1j1s@sg.social.gouv.fr',
				personalName: '1jeune1solution',
			},
			replyTo: {
				address: 'john.doe@email.com',
				personalName: 'John Doe',
			},
			subject: 'Demande de contact 1jeune1solution',
			text: `Cette demande de contact a été renseignée depuis le site 1jeune1solution https://www.1jeune1solution.gouv.fr/accompagnement :
			
Afin d'apporter une réponse à cette demande, veiller à utiliser l'adresse mail ou le numéro de téléphone du demandeur renseignés dans ce mail. Merci de ne pas répondre à ce message directement.

    • Prénom : John
    • Nom : Doe
    • Adresse email : john.doe@email.com
    • Téléphone : 0606060606
    • Age : 23
    • Ville : Paris (75006)
    • Commentaire : Merci de me recontacter`,
		},
		to: [
			{
				address: 'email@missionlocaledeparis.fr',
				personalName: 'Mission locale pour l‘insertion professionnelle et sociale des jeunes (16-25 ans) - Paris - 1er 2e 3e 4e 9e 10e et 11e',
			},
		],
	};
}

export function aTipimailRequestWithRedirection(): TipimailRequest {
	return {
		headers: {
			'X-TM-DOMAIN': '1jeune1solution.gouv.fr',
			'X-TM-TAGS': ['accompagnement', 'mission_locale'],
		},
		msg: {
			from: {
				address: 'contact-1j1s@sg.social.gouv.fr',
				personalName: '1jeune1solution',
			},
			replyTo: {
				address: 'john.doe@email.com',
				personalName: 'John Doe',
			},
			subject: 'Demande de contact 1jeune1solution',
			text: `Cette demande de contact a été renseignée depuis le site 1jeune1solution https://www.1jeune1solution.gouv.fr/accompagnement :
			
Afin d'apporter une réponse à cette demande, veiller à utiliser l'adresse mail ou le numéro de téléphone du demandeur renseignés dans ce mail. Merci de ne pas répondre à ce message directement.

    • Prénom : John
    • Nom : Doe
    • Adresse email : john.doe@email.com
    • Téléphone : 0606060606
    • Age : 23
    • Ville : Paris (75006)
    • Commentaire : Merci de me recontacter`,
		},
		to: [
			{
				address: 'redirect@email.com',
				personalName: 'Mission locale pour l‘insertion professionnelle et sociale des jeunes (16-25 ans) - Paris - 1er 2e 3e 4e 9e 10e et 11e',
			},
		],
	};
}
