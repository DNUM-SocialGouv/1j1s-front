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

1. `nvm install` et `nvm use` pour spécifier la version de node utilisée
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
  * 🔶 S'affichent et ne proposent pas de résultats : Quand les résultats sont demandées uniquement à l'aide du CTA `Recherhcer 🔍`

## Alimenter les ressources externes

Pour les besoins de développement du frontend, on pourra créer du contenu en recette directement et le nettoyer ensuite.

1. Remplacer le contenu de `.env` avec l'environnement Scalingo 1j1s-front, à l'exception de :
   * `ENVIRONMENT=local`
   * `NODE_ENV=local`
   * `SENTRY_ENV=local`
   * `REDIS_URL=http://localhost:6379` ou `REDIS_URL=` remplacer par l'url redis de recette
2. Seulement si le cache est local : Lancer le service de cache avec `docker-compose up -d redis`
3. Relancer le projet en mode développement avec `npm run dev`
4. Les accès au CMS de recette sont sur le Keepass au cas où les développements nécessitent de manipuler les données

La configuration locale du CMS sera utilisée généralement pour les tâches sensibles concernant les données, ce que l'on retrouvera lors des développements sur le CMS ou sur l'ETL.


