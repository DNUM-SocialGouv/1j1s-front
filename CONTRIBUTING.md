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

_exemple : getJobÉtudiant, OffreEmploi, it("récupère la liste des alternances", () => ...)_

#### Collection
Une variable représentant une collection sera suffixée par le mot `List` afin d'éviter le pluriel, parfois en conflit avec des mots invariables

### Code
* inutile d'ajouter le prefix d'attribut **readonly** dans les paramètres de fonctions ou constructor
* privilégier le retour de [ ] pour les list quand ce dernier est null ou undefined
* privilégier les fonctions nommées et avec le constructeur `function`
* nommer la callback des useEffect

```javascript
useEffect(function myFunction() {
  /*  contenu de la fonction */
}, []);
```

### Css
* privilégier un maximum les classes du design système de l'Etat

#### Fichiers et dossiers
* composant, style : PascalCase, `ButtonPrimary.tsx`, `ButtonPrimary.module.css`
* tout le reste : camelCase, `httpClient.service.ts`, `offre-emploi.ts`, `offreEmploi.repository.ts`

### Commits
Nous suivons [conventional commits](https://conventionalcommits.org/)
Les types de commit sont donc :
* **feat** : nouvelle fonctionnalité
* **fix** : correction d'un bug
* **build** : changements du système de build ou de dépendances
* **chore** : autre changement qui ne modifie ni fichier src, ni fichier test
* **ci** : changement à la configuration de la CI
* **docs** : changement sur la documentation
* **style** : changement n'affectant pas le sens du code (espace, point-virgule, format, etc.)
* **refactor** : changement qui ne corrige pas de bug ou n'ajoute pas une nouvelle fonctionnalité
* **perf** : changement qui améliore les performances
* **test** : ajoute ou corrige un test
* **revert** : annule un précédent changement

### Versioning
Nous suivons le [Semantic Versioning](https://semver.org)

Les commits de **merge** sont rédigés en français et sont auto-portants, les numéros de tickets Jira n'apparaissent pas dans l'intitulé

Il est nécessaire d'ajouter un contexte, voir un sous-contexte pour chaque commit, le contexte sera toujours en minuscule:


liste des contextes de **page** autorisées (non exaustive):
- emplois
- stages
- alternance
- jobs étudiants
- emplois europe
- formations
- dem (pour découvrir les métiers)
- évènement
- cej (pour contrat engagement jeune)
- aides
- logement
- mentorat
- entreprendre
- accompagnement
- espace jeune  
- engagement 
- employeur
  
Exemple d'utilisation avec sous-contexte:

- _feat(emplois/recherche): ajout du formulaire de recherche_
- _feat(emplois/résultats): affichage de la liste des résultats_
- _feat(emplois/détails): affichage des détails d'une offre d'emplois_

Dans le cas d'une implémentation transverse on utilisera le contexte **multiple**

_exemple : feat(multiple): sécurisation des appels API_

Pour les contextes de **composant** le nom du composant est à préciser.

Dans le cas d'une modification d'un composant déjà existant il faudra employer le type de commit **chore**.

_exemple : chore(header): modification du composant header_

Si la modification concerne un fix utiliser le type de commit adéquat **fix**

_exemple : fix(header): mis à jour des urls de navigation_


### Recommendations de NextJS
* [Data fetching](https://nextjs.org/docs/basic-features/data-fetching/overview)
* [Going to production](https://nextjs.org/docs/going-to-production)


### A11Y
[MDN Accessibilité](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)

#### Lexique utilisé dans le projet

- aria-expanded: set on an element to indicate if a control is expanded or collapsed, and whether or not its child elements are displayed or hidden
- aria-owns: identifies an element (or elements) in order to define a visual, functional, or contextual relationship between a parent and its child elements when the DOM hierarchy cannot be used to represent the relationship
- aria-haspopup: indicates the availability and type of interactive popup element that can be triggered by the element on which the attribute is set
- aria-autocomplete: indicates whether inputting text could trigger display of one or more predictions of the user's intended value for a combobox, searchbox, or textbox and specifies how predictions will be presented if they are made.
- aria-controls: identifies the element (or elements) whose contents or presence are controlled by the element on which this attribute is set
- aria-activedescendant: identifies the currently active element when focus is on a composite widget, combobox, textbox, group, or application.
- aria-labelledby: identifies the element (or elements) that labels the element it is applied to.
- aria-selected: indicates the current "selected" state of various widgets
