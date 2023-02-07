export const aFormulaireÉtape1StoredValue = () => {
	return {
		descriptionEmployeur: 'test description',
		emailEmployeur: 'oui@non.com',
		logoEmployeur: '',
		nomEmployeur: 'Octo',
		siteEmployeur: '',
	};
};

export const aFormulaireÉtape2StoredValue = () => {
	return {
		dateDebut: '2123-01-20',
		descriptionOffre: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Auctor eu augue ut lectus arcu bibendum. Curabitur gravida arcu ac tortor dignissim convallis aenean. Adipiscing commodo elit at imperdiet. Ipsum a arcu cursus vitae congue. Sed euismod nisi porta lorem. Facilisis gravida neque convallis a cras semper auctor neque vitae. Ante in nibh mauris cursus. In iaculis nunc sed augue lacus. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum.',
		domaineStage: 'achats',
		dureeStage: '30',
		lienCandidature: 'oui@non.com',
		nomOffre: 'Nom Offre',
		remunerationStage: '1',
		teletravail: true,
	};
};

export const aFormulaireÉtape3StoredValue = () => {
	return {
		adresse: '127 rue de Grenelle',
		codePostal: '75007',
		departement: '',
		pays: 'France',
		region: '',
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
			adresse: '127 rue de Grenelle',
			codePostal: '75007',
			pays: 'FR',
			ville: 'Paris',
		},
		remunerationBase: '1',
		teletravailPossible: false,
		titre: 'Nom Offre',
		urlDeCandidature: 'mailto:oui@non.com',
	};
};
