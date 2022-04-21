Contribuer à 1j1s-front
===

Commencer
---

### Pré-requis
* [NodeJS](https://nodejs.org/fr/), version 16
* [Docker](https://docs.docker.com/desktop/)
* [docker-compose](https://docs.docker.com/compose/)

### Environnement de développement
```bash
docker-compose up
npm run dev
```

* [Front en local](http://localhost:3000)
* [Swagger API](http://localhost:3000/api)

### Environnement de production
```bash
npm run build
npm run start
```
* [Front en local](http://localhost:3000)


### Commandes utiles
| Commande        | Fonction               |
| --------------- | ---------------------- |
| npm run lint    | Formater le code       |
| npm run test    | Exécuter les tests     |
| npm run release | Versionner le code     |


Technologies
---
* Langage : TypeScript
* Framework front : NextJS
* Style : CSS Modules

Standards de développement
---
### Stratégie de test
* tests unitaires autant que possible
* tests d'intégration sur les endpoints API, cas passant
* tests de composants via React Testing Library sur les composants comportant de la logique d'affichage, de la validation (formulaires) et récupérant des données

### Naming

#### Langue
* les objets métiers sont en **français**
* les intitulés de test sont en **français**
* Le reste du code est en **anglais**

_exemple : getJobEtudiant, OffreEmploi, it("récupère la liste des alternances", () => ...)_

#### Collection
Une variable représentant une collection sera suffixée par le mot `List` afin d'éviter le pluriel, parfois en conflit avec des mots invariables

### Code
* inutile d'ajouter le prefix d'attribut **readonly** dans les paramètres de fonctions ou constructor

#### Fichiers et dossiers
* composant, style : PascalCase, `ButtonPrimary.tsx`, `ButtonPrimary.module.css`
* tout le reste : camelCase, `httpClient.service.ts`, `offre-emploi.ts`, `offreEmploi.repository.ts`

### Commits
Nous suivons [conventional commits](https://conventionalcommits.org/)
Les types de commit sont donc :
* **build** : changements du système de build ou de dépendances
* **chore** : autre changement qui ne modifie ni fichier src, ni fichier test
* **ci** : changement à la configuration de la CI
* **docs** : changement sur la documentation
* **style** : changement n'affectant pas le sens du code (espace, point-virgule, format, etc.)
* **refactor** : changement qui ne corrige pas de bug ou n'ajoute pas une nouvelle fonctionnalité
* **perf** : changement qui améliore les performances
* **test** : ajoute ou corrige un test

### Versioning
Nous suivons le [Semantic Versioning](https://semver.org)

### Recommendations de NextJS
* [Data fetching](https://nextjs.org/docs/basic-features/data-fetching/overview)
* [Going to production](https://nextjs.org/docs/going-to-production)
