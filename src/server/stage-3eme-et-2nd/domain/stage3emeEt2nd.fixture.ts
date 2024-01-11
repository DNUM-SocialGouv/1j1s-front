import { ResultatRechercheStage3emeEt2nd, Stage3emeEt2nd, Stage3emeEt2ndFiltre } from './stage3emeEt2nd';

export function aResultatRechercheStage3emeEt2nd(override?: Partial<ResultatRechercheStage3emeEt2nd>): ResultatRechercheStage3emeEt2nd {
	return {
		nombreDeResultats: 2,
		resultats: [
			aStage3emeEt2nd({
				adresse: {
					codeDepartement: '75',
					codePostal: '75000',
					rueEtNumero: '1 rue de la Boulangerie',
					ville: 'Paris',
				},
				domaine: 'Boulangerie',
				nomEntreprise: 'La Boulangerie',
			}),
			aStage3emeEt2nd({
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

export function aStage3emeEt2nd(override?: Partial<Stage3emeEt2nd>): Stage3emeEt2nd {
	return {
		accessiblePersonnesEnSituationDeHandicap: true,
		adresse: {
			codeDepartement: '75',
			codePostal: '75001',
			rueEtNumero: '1 Rue de la Lune',
			ville: 'Paris',
		},
		domaine: 'Boulangerie',
		modeDeContact: 'Candidature en personne',
		nomEntreprise: 'La Boulangerie',
		nombreDeSalaries: '1-9',
		...override,
	};
}

export function aStage3emeEt2ndFiltre(override?: Partial<Stage3emeEt2ndFiltre>): Stage3emeEt2ndFiltre {
	return {
		codeMetier: undefined,
		distanceCommune: '10',
		latitudeCommune: '2',
		longitudeCommune: '3',
		...override,
	};
}
