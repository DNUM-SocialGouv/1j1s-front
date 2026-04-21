export const CRAWLER_PRODUCTION_MODE = `User-agent: *
Allow: /
Allow: /emplois/

User-agent: *
Disallow: /benevolat/
Disallow: /emplois-europe/
Disallow: /jobs-etudiants/
Disallow: /logements/annonces/
Disallow: /service-civique/
Disallow: /stages/`;

export const CRAWLER_NOT_PRODUCTION_MODE = `User-agent: *
Disallow: /`;
