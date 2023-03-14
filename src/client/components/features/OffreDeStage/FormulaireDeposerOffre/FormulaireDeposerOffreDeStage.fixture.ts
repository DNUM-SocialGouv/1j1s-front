import { Domaines } from '~/server/cms/domain/offreDeStage.type';

import { OffreDeStageDéposée } from './FormulaireDeposerOffreDeStage.type';

export const aFormulaireÉtapeEntreprise = (): OffreDeStageDéposée.Entreprise => {
	return {
		descriptionEmployeur: 'test description',
		emailEmployeur: 'oui@non.com',
		logoEmployeur: '',
		nomEmployeur: 'Octo',
		siteEmployeur: '',
	};
};

export const aFormulaireÉtapeStage = (): OffreDeStageDéposée.Stage => {
	return {
		dateDebut: '2123-01-20',
		descriptionOffre: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Auctor eu augue ut lectus arcu bibendum. Curabitur gravida arcu ac tortor dignissim convallis aenean. Adipiscing commodo elit at imperdiet. Ipsum a arcu cursus vitae congue. Sed euismod nisi porta lorem. Facilisis gravida neque convallis a cras semper auctor neque vitae. Ante in nibh mauris cursus. In iaculis nunc sed augue lacus. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum.',
		domaineStage: 'achats' as Domaines,
		dureeStage: '30',
		lienCandidature: 'oui@non.com',
		nomOffre: 'Nom Offre',
		remunerationStage: '1',
		teletravail: 'true',
	};
};

export const aFormulaireÉtapeLocalisation = (): OffreDeStageDéposée.Localisation => {
	return {
		adresse: '34 avenue de l’Opéra',
		codePostal: '75000',
		departement: 'Paris',
		pays: 'FR',
		region: 'Ile-de-France',
		ville: 'Paris',
	};
};

export const aFormulaireEnvoyéPostedValue = () => {
	return {
		dateDeDebut: '2123-01-20',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Auctor eu augue ut lectus arcu bibendum. Curabitur gravida arcu ac tortor dignissim convallis aenean. Adipiscing commodo elit at imperdiet. Ipsum a arcu cursus vitae congue. Sed euismod nisi porta lorem. Facilisis gravida neque convallis a cras semper auctor neque vitae. Ante in nibh mauris cursus. In iaculis nunc sed augue lacus. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum.',
		domaine: 'achats',
		duree: '30',
		employeur: {
			description: 'test description',
			email: 'oui@non.com',
			nom: 'Octo',
		},
		localisation: {
			adresse: '34 avenue de l’Opéra',
			codePostal: '75000',
			departement: 'Paris',
			pays: 'FR',
			region: 'Ile-de-France',
			ville: 'Paris',
		},
		remunerationBase: 1,
		teletravailPossible: true,
		titre: 'Nom Offre',
		urlDeCandidature: 'mailto:oui@non.com',
	};
};
