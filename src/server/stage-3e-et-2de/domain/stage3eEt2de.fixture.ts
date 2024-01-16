import { ModeDeContact } from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de';

import { ResultatRechercheStage3eEt2de, Stage3eEt2de, Stage3eEt2deFiltre } from './stage3eEt2de';

export function aResultatRechercheStage3eEt2de(override?: Partial<ResultatRechercheStage3eEt2de>): ResultatRechercheStage3eEt2de {
	return {
		nombreDeResultats: 2,
		resultats: [
			aStage3eEt2de({
				adresse: {
					codeDepartement: '75',
					codePostal: '75000',
					rueEtNumero: '1 rue de la Boulangerie',
					ville: 'Paris',
				},
				domaine: 'Boulangerie',
				nomEntreprise: 'La Boulangerie',
			}),
			aStage3eEt2de({
				adresse: {
					codeDepartement: '75',
					codePostal: '75000',
					rueEtNumero: '1 rue de la Pâtisserie',
					ville: 'Paris',
				},
				domaine: 'Pâtisserie',
				nomEntreprise: 'La Pâtisserie',
			}),
		],
		...override,
	};
}

export function aStage3eEt2de(override?: Partial<Stage3eEt2de>): Stage3eEt2de {
	return {
		accessiblePersonnesEnSituationDeHandicap: true,
		adresse: {
			codeDepartement: '75',
			codePostal: '75001',
			rueEtNumero: '1 Rue de la Lune',
			ville: 'Paris',
		},
		appellationCodes: ['11573', '11574'],
		domaine: 'Boulangerie',
		modeDeContact: ModeDeContact.IN_PERSON,
		nomEntreprise: 'La Boulangerie',
		nombreDeSalaries: '1-9',
		siret: '12345678912345',
		...override,
	};
}

export function aStage3eEt2deFiltre(override?: Partial<Stage3eEt2deFiltre>): Stage3eEt2deFiltre {
	return {
		codeMetier: undefined,
		distanceCommune: '10',
		latitudeCommune: '2',
		longitudeCommune: '3',
		...override,
	};
}
