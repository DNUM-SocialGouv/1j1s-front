module.exports = {
	ci: {
	  	assert: {
			assertMatrix: [
			  	{
				  	assertions: {
						'categories:accessibility': ['error', { minScore: 1 }],
				  	},
					matchingUrlPattern: '.*',
			  	},
			],
		},
		collect: {
			numberOfRuns: 1,
			settings: {
				onlyCategories: [
					'accessibility',
				],
			  	skipAudits: [
					'color-contrast',
				],
			},
			url: [
				'http://localhost:3000/',
				'http://localhost:3000/emplois',
				'http://localhost:3000/apprentissage',
				'http://localhost:3000/jobs-etudiants',
				'http://localhost:3000/service-civique',
				'http://localhost:3000/benevolat',
				'http://localhost:3000/stages',
				'http://localhost:3000/stages?offre-de-stage%5Bpage%5D=3',
				'http://localhost:3000/contrat-engagement-jeune',
				'http://localhost:3000/mes-aides',
				'http://localhost:3000/mentorat',
				'http://localhost:3000/creer-mon-cv',
				'http://localhost:3000/espace-jeune',
				'http://localhost:3000/je-deviens-mentor',
				'http://localhost:3000/les-entreprises-s-engagent',
				'http://localhost:3000/immersions',
				'http://localhost:3000/mesures-employeurs',
				'http://localhost:3000/je-recrute-afpr-poei',
				'http://localhost:3000/logements/annonces',
				'http://localhost:3000/logements/aides-logement',
				'http://localhost:3000/formations/apprentissage',
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
