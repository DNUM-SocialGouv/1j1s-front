# Standards d'équipe

Ahoy 👋
Afin de garder une base de code homogène, merci de respecter ces quelques standards.


## Git

### Commits

Nous suivons [conventional commits](https://conventionalcommits.org/)
Les types de commit sont donc :
* **feat** : nouvelle fonctionnalité
* **fix** : correction d'un bug
* **build** : changements du système de build ou de dépendances
* **chore** : autre changement qui ne modifie ni fichier src, ni fichier test
* **ci** : changement à la configuration de la CI
* **docs** : changement sur la documentation
* **style** : changement n'affectant pas le sens du code (espace, point-virgule, format, etc.)
* **refactor** : changement qui ne corrige pas de bug ou n'ajoute pas une nouvelle fonctionnalité
* **perf** : changement qui améliore les performances
* **test** : ajoute ou corrige un test
* **revert** : annule un précédent changement

Les messages de commit sont rédigés en français et doivent être autoportants. Chaque commit doit assurer que :
* l'application fonctionne
* le linter passe
* les tests passent

Dès que cela est possible, préciser le contexte pour chaque commit, en lettres minuscules. Cela peut être une fonctionnalité, un composant transverse, de l'interface ou une exigence non fonctionnelle. 

Liste des contextes de **fonctionnalités** autorisées (non exhaustive) :
- emplois
- stages
- alternance
- jobs étudiants
- jobs d'été
- emplois europe
- formations
- metiers (pour découvrir les métiers)
- évènement
- cej (pour contrat engagement jeune)
- aides
- logement
- mentorat
- entreprendre
- accompagnement
- services jeunes
- bénévolat
- actualités
- employeur
- sitemap
- robots

_exemple : `feat(sitemap): ajout des offres de stages au sitemap`_

Exemple de composants transverses (non exhaustive) :
- header
- footer
- nav

- _exemple : `refactor(nav): génération du menu à partir d'un fichier de configuration`_

Dans le cas de changement de style, préférer :
- ui

_exemple : `feat(ui): mise à jour du style des champs texte`_

Exigences non fonctionnelles (non exhaustive) :
- meilisearch
- deps

_exemple : `chore(deps): mise à jour des dépendances`_


## Branching

Pour une parfaite intégration avec Jira, une branche liée à une user story doit comporter le numéro du ticket. Ex :
_exemple :`feat/UNJ1S-1307-Afficher-les-statistiques-d-une-formation-avec-InserJeunes`_

Les branches peuvent être mergées selon 2 méthodes :
* squash
* rebase and merge
Dans les 2 cas, les titres et descriptions des commit finaux doivent respecter nos [standards](#commits). A chaque commit, l'application doit donc fonctionner, les tests et le linter passer.


### Versioning

Nous respectons le [Semantic Versioning](https://semver.org)
Une fois une branche mergée dans main, une Pull Request de release est automatiquement ouverte avec un commit de release pour :
* monter la version dans les `package.json` et `package-lock.json` selon les changements apportés par les précédents commits,
* ajouter un tag de version de la forme `vX.Y.Z`
* mettre à jour le changelog en reprenant les messages de commits précédents


## Stratégie de test

Nous favorisons des tests unitaires autant que possible, rapides à exécuter. Les tests de composants via React Testing Library complètent ces tests afin de tester l'affichage, par l'**arbre d'accessibilité**
* tests unitaires autant que possible
* tests d'intégration sur les endpoints API
* tests de composants via React Testing Library sur les composants comportant de la logique d'affichage, de la validation (formulaires) et récupération de données
* tests end-to-end pour simuler un workflow complet utilisateur sur une fonctionnalité. Exemple : recherche d'une offre d'emploi puis consultation du détail d'une offre


## Code

### Langue
* les objets métiers sont en **français**
* les intitulés de test sont en **français**
* Le reste du code est en **anglais**

_exemple : `getJobÉtudiant`, `OffreEmploi`, `it("récupère la liste des alternances", () => ...)`_


### Fonctions

* privilégier les fonctions nommées et avec le constructeur `function` au lieu des arrow functions `() => `
* nommer la callback des useEffect
* préciser le type de sortie de fonction

```javascript
useEffect(function myFunction() {
  /*  contenu de la fonction */
}, []);
```

```javascript
function mapOffreStage(response: Strapi.CollectionType.OffreStage): OffreDeStage {
  return { ... };
}
```


### Nommage des fichiers et dossiers

* composant, style : PascalCase, `ButtonPrimary.tsx`, `ButtonPrimary.module.scss`
* tout le reste : camelCase, `httpClient.service.ts`, `offreEmploi.ts`, `offreEmploi.repository.ts`

Plus d'info sur [l'arborescence des dossiers](./architecture#structure)


### Nommage des collections

Une variable représentant une collection sera suffixée par le mot `List` afin d'éviter le pluriel, parfois en conflit avec des mots invariables

_exemple: `const offreEmploiList: Array<OffreEmploi> = [...]`
