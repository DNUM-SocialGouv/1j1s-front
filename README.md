# 1jeune1solution - front + BFF

## Technologies
* Langage : TypeScript
* Framework front : NextJS
* Style : CSS Modules
* Package Manager : npm
* Gestion éditoriale : [Strapi](https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html) (cms headless)
* Déploiement : [Scalingo](https://doc.scalingo.com/languages/nodejs/start)

## Liens utiles : 
* [Github](https://github.com/orgs/DNUM-SocialGouv/repositories)
* [Admin scalingo](https://1j1s-cms.osc-fr1.scalingo.io/admin)
* [Backlog technique](https://github.com/DNUM-SocialGouv/1j1s-front/projects/1)
* [Backlog fonctionnel](https://jira.sg.social.gouv.fr/secure/RapidBoard.jspa?rapidView=255&projectKey=UNJ1S)
* [Monitoring sentry](https://sentry.fabrique.social.gouv.fr/organizations/incubateur/)

## Conventions de code
* [Contributing](./CONTRIBUTING.md)

### Pré-requis
* [nvm](https://github.com/nvm-sh/nvm) (recommandé)
* [NodeJS](https://nodejs.org/fr/), version 16
* [Docker](https://docs.docker.com/desktop/)
* [docker-compose](https://docs.docker.com/compose/)
* [Projet CMS gestionnaire de contenu](https://github.com/DNUM-SocialGouv/1j1s-cms)
* [Projet CMS stage](https://github.com/DNUM-SocialGouv/1j1s-stage-content-manager)
* [Projet CMS principal](https://github.com/DNUM-SocialGouv/1j1s-main-cms)
* [Projet Infrastructure](https://github.com/DNUM-SocialGouv/1j1s-infrastructure)
* [Projet test de performances](https://github.com/DNUM-SocialGouv/1j1s-test-charge)
* [Projet test lighthouse automatisé](https://github.com/DNUM-SocialGouv/1j1s-front-lighthouse-report)
* [Projet chargement de données](https://github.com/DNUM-SocialGouv/1j1s-stage-orchestrateur-transform-load)

### Environnement de développement
Lancez redis (nécéssaire au démarage du projet) via `docker`, 
fixez votre version de node (si vous avez nvm), 
installez les dépendances,
copiez le `.env.test` vers `.env` puis éditez les valeurs à votre convenance
ensuite lancez le projet en mode développement.

```bash
docker-compose up -d
nvm use
npm ci
cp .env.test .env
$EDITOR .env
npm run dev
```
Vous pouvez ensuite accéder à ces pages
* [Front en local](http://localhost:3000)
* [Documentation API](http://localhost:3000/api)

### Environnement de production
Pour reproduire les comportements de production (cache, prébuild des pages…), vous devez d'abord lancer le build puis démarer le projet en mode classique.

```bash
npm run build
npm run start
```

* [Front en local](http://localhost:3000)


### Commandes utiles
| Commande               | Fonction                                               |
|------------------------|--------------------------------------------------------|
| npm run lint           | Vérifie le formatage du  code                          |
| npm run lint:fix       | Formater le code                                       |
| npm run test           | Lance les tests                                        |
| npm run tw             | Lance les tests avec un watcher                        |
| npm run test:coverage  | Lance les tests en indiquant le test coverage          |
| npm run release        | Versionner le code                                     |
| npm run dev            | Lance le site en mode développeur (avec hot reload)    |
| npm run start          | Lance le site en mode fixe (sans hot reload)           |
| npm run build          | build le site comme en production                      |
| npm run analyze        | Analyze la taille du site et des packages              |
| npm run analyze:server | Analyze la taille du site et des packages côté serveur |
| npm run e2e            | Lance les tests cypress (nécéssite que le site tourne) |
| npm run e2e:open       | Lance les tests cypress (nécéssite que le site tourne) |
