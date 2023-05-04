module.exports = {
	ci: {
		collect: {
			settings: {
				onlyCategories: [
					'performance',
					'accessibility',
					'best-practices',
					'seo',
				],
			},
			url: [
				'https://www.1jeune1solution.gouv.fr/',
				'https://www.1jeune1solution.gouv.fr/emplois',
				'https://www.1jeune1solution.gouv.fr/apprentissage',
				'https://www.1jeune1solution.gouv.fr/jobs-etudiants',
				'https://www.1jeune1solution.gouv.fr/service-civique',
				'https://www.1jeune1solution.gouv.fr/benevolat',
				'https://www.1jeune1solution.gouv.fr/stages',
				'https://www.1jeune1solution.gouv.fr/stages?offre-de-stage%5Bpage%5D=3',
				'https://www.1jeune1solution.gouv.fr/contrat-engagement-jeune',
				'https://www.1jeune1solution.gouv.fr/mes-aides',
				'https://www.1jeune1solution.gouv.fr/mentorat',
				'https://www.1jeune1solution.gouv.fr/creer-mon-cv',
				'https://www.1jeune1solution.gouv.fr/espace-jeune',
				'https://www.1jeune1solution.gouv.fr/je-deviens-mentor',
				'https://www.1jeune1solution.gouv.fr/les-entreprises-s-engagent',
				'https://www.1jeune1solution.gouv.fr/immersions',
				'https://www.1jeune1solution.gouv.fr/mesures-employeurs',
				'https://www.1jeune1solution.gouv.fr/je-recrute-afpr-poei',
				'https://www.1jeune1solution.gouv.fr/logements/annonces',
				'https://www.1jeune1solution.gouv.fr/logements/aides-logement',
				'https://www.1jeune1solution.gouv.fr/formations/apprentissage',
			],
		},
		server: {
			deleteOldBuildsCron: {
				maxAgeInDays: 10,
			},
		},
		upload: {
			serverBaseUrl: 'https://1j1s-front-lighthouse-report.osc-fr1.scalingo.io',
			target: 'lhci',
			token: 'a9ce962a-1745-41f9-9f73-4d3727b3e910',
		},
	},
};
