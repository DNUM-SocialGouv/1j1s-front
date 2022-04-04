This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Démarrage de l'application

Premièrement :

Installer nodejs [https://nodejs.org/fr/](https://nodejs.org/fr/)
Installer docker [https://docs.docker.com/desktop/](https://docs.docker.com/desktop/)
Installer docker-compose [https://docs.docker.com/compose/](https://docs.docker.com/compose/)

```bash
docker-compose up

npm run dev
```

[http://localhost:3000](http://localhost:3000) pour la partie web.

[http://localhost:3000/api/emplois](http://localhost:3000/api/emplois) pour la partie api.

## Démarrage de l'application en mode build

Premièrement :
```bash
npm run build
```
Deuxièmement :
```bash
next start
```
[http://localhost:3000](http://localhost:3000) pour ouvrir l'application builder avec next.

## Conventions de développement

Nous respectons les conventions proposées par la fabrique :
[https://socialgouv.github.io/support/#/./developpement](https://socialgouv.github.io/support/#/./developpement)

- [ ] Utiliser la licence Apache-2.0 pour les codes sources
- [x] Standardiser le code avec nos linters : https://github.com/SocialGouv/linters
- [x] Maintenir son projet à jour avec notre config renovate : https://github.com/SocialGouv/renovate-config cf la FAQ
- [ ] Conventionner les commits GIT : https://conventionalcommits.org/
- [ ] Conventionner le versionning : https://semver.org
- [ ] Conventionner les commentaires : https://conventionalcomments.org/
- [x] Releaser sur GitHub/npm : avec semantic-release cf la FAQ. A continuer => [https://github.com/semantic-release/semantic-release/blob/master/docs/usage/getting-started.md#getting-started](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/getting-started.md#getting-started)
- [ ] Récupérer les erreurs applicatives dans notre sentry [https://docs.sentry.io/platforms/node/typescript/](https://docs.sentry.io/platforms/node/typescript/)
  - [ ] == QUESTION ==> Avec Scalingo, pas de sentry on log dans ELK ? [https://ibm-cloud-architecture.github.io/b2m-nodejs/logging/](https://ibm-cloud-architecture.github.io/b2m-nodejs/logging/)
- [ ] Utiliser DashLord pour monitorer les bonnes pratiques.
- [x] Le système de design de l'état doit être utilisé par défaut. une implémentation React existe ici : [https://www.npmjs.com/package/@dataesr/react-dsfr](https://www.npmjs.com/package/@dataesr/react-dsfr)

## Recommendations et bonne utilisations de NextJs
- Data fetching [https://nextjs.org/docs/basic-features/data-fetching/overview](https://nextjs.org/docs/basic-features/data-fetching/overview)
- Going to prod [https://nextjs.org/docs/going-to-production](https://nextjs.org/docs/going-to-production)
