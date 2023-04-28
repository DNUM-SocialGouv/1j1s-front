---
sidebar_label: La recherche indexée, comment ça marche ?
sidebar_position: 3
---

# la recherche indexée

_20 Avril 2023_

## Introduction 

Les pages permettant de rechercher des résultats indexés présentent un formulaire qui, une fois soumis, met à jour les paramètres de recherche dans l'url et requête les données indexées dans Meilisearch.

## Comment ça marche ?

Les pages permettant de rechercher des résultats indexés s'appuient sur la librairie `@meilisearch/instant-meilisearch`
et son composant `InstantSearch`. Les résultats récupérés proviennent de Meilisearch, des objets chargés par
l'[ETL](https://github.com/DNUM-SocialGouv/1j1s-etl) à partir d'un flux. L'URL est complètement manipulée par la
librairie. Chaque changement dans un filtre lance une requête HTTP pour mettre à jour les résultats en conséquence. 

## Les pages concernées 

- [stages](https://www.1jeune1solution.gouv.fr/stages) 
- [annonces de logement](https://www.1jeune1solution.gouv.fr/logements/annonces) 
- [fiches métier](https://www.1jeune1solution.gouv.fr/decouvrir-les-metiers) 
- [événements](https://www.1jeune1solution.gouv.fr/evenements) 

# Que faire si...

## Une recherche de contenu indexé est indisponible
Votre conteneur Docker comprenant Meilisearch est-il bien lancé et configuré ?

## Une recherche de contenu indexé mène vers une page non trouvée
Appelez-vous le même Meilisearch que votre CMS ? Les 2 devraient être relié à votre conteneur Docker
Avez-vous saisi du contenu dans Meilisearch ?
Si oui, cliquez sur `refresh` sur l'index sur votre Strapi.