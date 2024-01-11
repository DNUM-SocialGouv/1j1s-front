import { ResultatRechercheStage3eme, Stage3eme, Stage3emeFiltre } from './stage3eme';

export function aResultatRechercheStage3eme(override?: Partial<ResultatRechercheStage3eme>): ResultatRechercheStage3eme {
	return {
		nombreDeResultats: 2,
		resultats: [
			aStage3eme({
				adresse: {
					codeDepartement: '75',
					codePostal: '75000',
					rueEtNumero: '1 rue de la Boulangerie',
					ville: 'Paris',
				},
				domaine: 'Boulangerie',
				nomEntreprise: 'La Boulangerie',
			}),
			aStage3eme({
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

export function aStage3eme(override?: Partial<Stage3eme>): Stage3eme {
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

export function aStage3emeFiltre(override?: Partial<Stage3emeFiltre>): Stage3emeFiltre {
	return {
		codeMetier: undefined,
		distanceCommune: '10',
		latitudeCommune: '2',
		longitudeCommune: '3',
		...override,
	};
}
