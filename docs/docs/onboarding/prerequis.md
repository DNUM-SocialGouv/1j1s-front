---
sidebar_label: Prérequis d'installation
sidebar_position: 1
---

# Installation pour le développement sur 1j1s-front

_20 Avril 2023_

## Introduction
Ce document relate les différents prérequis permettant l'installation du projet.

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