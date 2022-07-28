1jeune1solution - front
===

## CMS
Le site s'appuie sur un CMS (Strapi) pour une partie de l'éditorial
* [Github](https://github.com/DNUM-SocialGouv/1j1s-cms)
* [Admin](https://1j1s-cms.osc-fr1.scalingo.io/admin)

## Backlog
* [Backlog technique](https://github.com/DNUM-SocialGouv/1j1s-front/projects/1)
* [Backlog fonctionnel](https://jira.sg.social.gouv.fr/secure/RapidBoard.jspa?rapidView=255&projectKey=UNJ1S)


## Monitoring
* [Sentry](https://sentry.fabrique.social.gouv.fr/organizations/incubateur/)

## Conventions de code
* [Contributing](./CONTRIBUTING.md)

## Configuration du projet
### Variables d'environnement

Copiez le .env.test et changez les valeurs des variables dans le .env

```bash
cp .env.test .env
$EDITOR .env
```

#### Variables Liées aux stages

NEXT_PUBLIC_STAGE_CONTENT_MANAGER_BASE_URL: url du cms hébergeant les stages

NEXT_PUBLIC_STAGE_SEARCH_ENGINE_API_KEY: api key d'**affichage** du meilisearch hébergeant les stages

NEXT_PUBLIC_STAGE_SEARCH_ENGINE_BASE_URL: url du meilisearch hébergeant les stages
