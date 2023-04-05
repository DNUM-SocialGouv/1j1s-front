# Installation pour le développement sur 1j1s-front

## Pré-requis

* [npm](https://www.npmjs.com/) version 9, [nvm](https://github.com/nvm-sh/nvm) recommandé
* [NodeJS](https://nodejs.org/fr/), version 18
* [Docker](https://docs.docker.com/desktop/)
* [docker-compose](https://docs.docker.com/compose/)
* [CMS principal](https://github.com/DNUM-SocialGouv/1j1s-main-cms)


## Pour aller plus loin dans l'écosystème 1j1s (optionnel)

* [Projet test de performances](https://github.com/DNUM-SocialGouv/1j1s-test-charge)
* [Projet test lighthouse automatisé](https://github.com/DNUM-SocialGouv/1j1s-front-lighthouse-report)
* [Projet chargement de données](https://github.com/DNUM-SocialGouv/1j1s-stage-orchestrateur-transform-load)


## Pré-requis pour avoir un environnement local pleinement fonctionnel 

Il faut avoir :
1. lancé le projet 1j1s-main-cms et peuplé les données via les scripts `npm run docker:populate` et `npm run docker:start`  (voir documentation sur le repo concerné)
2. synchronisé la configuration sur l'interface d'administration du CMS / Strapi (`Settings -> Config sync -> Interface`-> Cliquer sur "Import")
3. dans Strapi (`Content-Manager -> Collection Types -> User`), récupéré les credentials de l'utilisateur 1j1s avec role formulaire pour renseigner la variable d'environnement `STRAPI_AUTH` du projet 1j1s-front
5. lancé meilisearch et renseigné la master key avec la même valeur que la variable d'env `NEXT_PUBLIC_STAGE_SEARCH_ENGINE_API_KEY`
Exemple : pour - MEILI_MASTER_KEY=${MEILI_MASTER_KEY:-masterKey}  dans docker-compose.yml du projet 1j1s-main-cms -> il faut avoir NEXT_PUBLIC_STAGE_SEARCH_ENGINE_API_KEY=masterKey dans .env du projet 1j1s-front
6. indexé les collections du CMS via le plugin Meilisearch = cocher les collections à indexer (logements, offre de stages, fiches metiers...) sur interface Strapi

## Lancer le projet

1. Lancez redis dans votre terminal via `docker-compose up -d redis`
2. `nvm use` pour spécifier la version de node utilisée (si nécessaire)
3. Installez les dépendances avec `npm ci`
4. Copiez le `.env.test` vers `.env` puis éditez les valeurs à votre convenance
5. Lancez le projet en mode développement avec `npm run dev`
6. Ouvrez votre navigateur sur [http://localhost:3000](http://localhost:3000)


### Commandes utiles

| Commande               | Fonction                                               |
|------------------------|--------------------------------------------------------|
| npm run lint           | Vérifie le formatage du code                           |
| npm run lint:fix       | Formater le code                                       |
| npm run test           | Lance les tests                                        |
| npm run tw             | Lance les tests avec un watcher                        |
| npm run test:coverage  | Lance les tests en indiquant le test coverage          |
| npm run dev            | Lance le site en mode développeur (avec hot reload)    |
| npm run start          | Lance le site en mode fixe (sans hot reload)           |
| npm run build          | build le site comme en production                      |
| npm run analyze        | Analyze la taille du site et des packages              |
| npm run analyze:server | Analyze la taille du site et des packages côté serveur |
| npm run e2e            | Lance les tests cypress (nécessite que le site tourne) |
| npm run e2e:open       | Lance les tests cypress (nécessite que le site tourne) |
