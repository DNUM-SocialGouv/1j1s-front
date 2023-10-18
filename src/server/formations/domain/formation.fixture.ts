import { Formation, NiveauRequis, RésultatRechercheFormation } from '~/server/formations/domain/formation';

export const aRésultatRechercheFormationList = (): Array<RésultatRechercheFormation> => [
	aResultatRechercheFormation(),
	{
		codeCertification: '888',
		id: '456__',
		nomEntreprise: 'La Bonne Alternance',
		tags: ['Paris', 'Autre'],
		titre: 'Développeur web',
	},
];

export const aResultatRechercheFormation = (override?: Partial<RésultatRechercheFormation>):  RésultatRechercheFormation => ({
	adresse: '1 rue de la République',
	codeCertification: '999',
	codePostal: '75001',
	id: '123__cleMinistereEducatif-123456',
	nomEntreprise: 'La Bonne Alternance',
	tags: ['Paris', NiveauRequis['NIVEAU_4']],
	titre: 'Développeur web',
	...override,
});

export const aFormation = (overrides?: Partial<Formation>): Formation => ({
	adresse: {
		adresseComplète: '1 rue de la République 75001 Paris',
		codePostal: '75001',
	},
	description: 'Description de la formation',
	nomEntreprise: 'La Bonne Alternance',
	nombreHeuresAuCentre: undefined,
	nombreHeuresEnEntreprise: undefined,
	objectif: 'Objectifs de la formation',
	tags: ['Paris'],
	titre: 'Développeur web',
	...overrides,
});
