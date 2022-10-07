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
        'https://1j1s-front.osc-fr1.scalingo.io/',
        'https://1j1s-front.osc-fr1.scalingo.io/emplois',
        'https://1j1s-front.osc-fr1.scalingo.io/apprentissage',
        'https://1j1s-front.osc-fr1.scalingo.io/jobs-etudiants',
        'https://1j1s-front.osc-fr1.scalingo.io/service-civique',
        'https://1j1s-front.osc-fr1.scalingo.io/benevolat',
        'https://1j1s-front.osc-fr1.scalingo.io/stages',
        'https://1j1s-front.osc-fr1.scalingo.io/stages?offre-de-stage%5Bpage%5D=3',
        'https://1j1s-front.osc-fr1.scalingo.io/contrat-engagement-jeune',
        'https://1j1s-front.osc-fr1.scalingo.io/mes-aides',
        'https://1j1s-front.osc-fr1.scalingo.io/mentorat',
        'https://1j1s-front.osc-fr1.scalingo.io/creer-mon-cv',
        'https://1j1s-front.osc-fr1.scalingo.io/espace-jeune',
        'https://1j1s-front.osc-fr1.scalingo.io/je-deviens-mentor',
        'https://1j1s-front.osc-fr1.scalingo.io/les-entreprises-s-engagent',
        'https://1j1s-front.osc-fr1.scalingo.io/immersions',
        'https://1j1s-front.osc-fr1.scalingo.io/mesures-employeurs',
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
