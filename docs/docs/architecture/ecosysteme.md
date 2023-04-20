---
sidebar_label: Flux
sidebar_position: 2
---

# 1j1s-front dans l'écosystème 1j1s

_20 Avril 2023_

## Schéma

![Big picture](../assets/1j1s-front-ecosysteme.png)

Le front interagit majoritairement avec les services suivants :
* [le CMS (Strapi)](https://github.com/DNUM-SocialGouv/1j1s-main-cms)
* Meilisearch pour les résultats indexés (offres de stage, annonces de logement et fiches métier)
* Des [APIs externes](#services-externes)


## Services externes

* [Pôle Emploi](https://pole-emploi.io/data/api/) : recherche d'emplois, jobs étudiants, jobs d'été
* [La Bonne Alternance](https://api.gouv.fr/documentation/api-la-bonne-alternance) : recherche d'alternance et de formations en apprentissage
* [API Engagement](https://api.gouv.fr/les-api/api-engagement) : recherche de missions de bénévolat et service civique
* [API Adresse](https://adresse.data.gouv.fr/api-doc/adresse) : recherche de localisation (communes)
* [API Découpage administratif](https://geo.api.gouv.fr/decoupage-administratif) : recherche de localisation (départements et régions)
* [API Établissements publics](https://api.gouv.fr/documentation/api_etablissements_publics) : recherche de structures proposant un accompagnement (agence pole emploi, infos jeunes, missions locales)
* [Onisep](https://opendata.onisep.fr/) : recherche de métiers
* [Tipimail](https://docs.tipimail.com/fr/integrate/api) : envoie d'email
* [Eulerian](https://eulerian.wiki/doku.php?id=fr:quickonboarding:start) : analyse d'utilisation du site
* [Sentry](https://sentry.fabrique.social.gouv.fr/) : surveille les anomalies du site
