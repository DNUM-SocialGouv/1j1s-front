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
      ],
    },
    upload: {
      serverBaseUrl: 'https://mysterious-cove-34282.herokuapp.com',
      target: 'lhci',
      token: 'a6148b25-d912-4550-82b1-24eb96fe60ec',
    },
  },
};
