---
sidebar_label: 1 - Lancer le front
sidebar_position: 1
---

# Lancer le projet 1j1s-front

_13 Août 2024_

## Pré-requis

Se référer au package.json pour les versions utilisées

* [nvm](https://github.com/nvm-sh/nvm) recommandé
* [npm](https://www.npmjs.com/)
* [NodeJS](https://nodejs.org/fr/)
* Un accès Scalingo au repo [1j1s-front](https://dashboard.scalingo.com/apps/osc-fr1/1j1s-front) (recette)
* Un accès au Keepass du projet, pour les données de recette

## Premier run

1. Lancez la commande `nvm install` et la commande `nvm use` pour spécifier la version de node utilisée
2. Installez les dépendances avec `npm ci`
3. Copiez le `.env.test` vers `.env`
4. Lancez le projet en mode développement avec `npm run dev`
5. Ouvrez votre navigateur sur [http://localhost:3000](http://localhost:3000)

À ce stade, on obtient une application partiellement fonctionnelle :
* Assets : (Articles / Images)
  * ✅ Sont présents : Les assets statiques
  * ❌ Ne sont pas présents : Les assets hébergées sur le CMS
* Pages Formulaires :
  * ✅ S'affichent et proposent des résultats : Les API mockées avec des résultats en mémoire.
  * ❌ Ne s'affiche pas (404 ou 500) : Quand des résultats sont demandées au chargement de la page (API externe, CMS ou contenu indexé via Meilisearch)
  * 🔶 S'affichent et ne proposent pas de résultats : Quand les résultats sont demandées uniquement à l'aide du CTA `Rechercher 🔍`

## Alimenter les ressources externes

1. Écraser le contenu de `.env` avec le contenu Scalingo > 1j1s-front > Environment, on peut s'aider du mode `Bulk edit` 
2. Remplacer les variables suivantes avec les valeurs notées ci-dessous :
   * `ENVIRONMENT=local`
   * `NODE_ENV=local`
   * `SENTRY_ENV=local`
3. Relancer le projet en mode développement avec `npm run dev`

On est à la suite de ces étapes avec un front local branché aux infrastructures de recette, dont le CMS.

Pour les besoins de développement du frontend, on pourra créer du contenu en recette directement et le nettoyer ensuite. 
Les accès au CMS de recette sont sur le Keepass au cas où les développements nécessitent de manipuler les données.

La configuration locale du CMS sera utilisée généralement pour les tâches sensibles concernant les données, ce que l'on retrouvera lors des développements sur le CMS ou sur l'ETL.


