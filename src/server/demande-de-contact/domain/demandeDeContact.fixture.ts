import { DemandeDeContactAccompagnement } from '~/server/demande-de-contact/domain/demandeDeContact';
import { TypeÉtablissement } from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';

export function aDemandeDeContactAccompagnement(): DemandeDeContactAccompagnement {
	return {
		age: 23,
		codeCommune: '75056',
		commentaire: 'Merci de me recontacter',
		email: 'john.doe@email.com',
		nom: 'Doe',
		nomCommune: 'Paris',
		prénom: 'John',
		téléphone: '0606060606',
		établissement: {
			email: 'email@email.com',
			nom: 'Mission locale pour l‘insertion professionnelle et sociale des jeunes (16-25 ans) - Paris - 5e 12e et 13e arrondissements',
			type: TypeÉtablissement.MISSION_LOCALE,
		},
	};
}
