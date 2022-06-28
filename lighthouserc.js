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
      token: '883e14e0-d128-4850-a70a-249f51f09ee0',
    },
  },
};
