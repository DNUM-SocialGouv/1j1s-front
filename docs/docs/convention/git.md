---
sidebar_label: Git
sidebar_position: 1
---

# Standards d'équipe liés à Git

_20 Avril 2023_

Ahoy 👋
Afin de garder une base de code homogène, merci de respecter ces quelques standards.

## Commits

### Convention

Nous allons nous baser sur la convention "[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)".

### Langue

Il a été convenu de rédiger les commits en français car le projet n'est pas à destination internationale.
Celui-ci est destiné en premier lieu au gouvernement français. Les messages de chaque commit doivent être autoportants.

### Contextes d'un commit

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

Chaque commit doit assurer que :
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

### Contenu du message
Un message de commit doit contenir a minima un titre court formaté contenant un préfixe cité dans la convention ci-dessus. Si une description supplémentaire est nécessaire, celle-ci sera ajoutée dans un sous-message de commit.

### Exemples de nommage
_exemple : `feat(sitemap): ajout des offres de stages au sitemap`_

Exemple de composants transverses (non exhaustive) :
- header
- footer
- nav

_exemple : `refactor(nav): génération du menu à partir d'un fichier de configuration`_

Dans le cas de changement de style, préférer :
- ui

_exemple : `feat(ui): mise à jour du style des champs texte`_

Exigences non fonctionnelles (non exhaustive) :
- meilisearch
- deps

_exemple : `chore(deps): mise à jour des dépendances`_


## Stratégie pour les branches

Pour une parfaite intégration avec Jira, une branche liée à une user story doit comporter le numéro du ticket. Ex :
_exemple :`feat/UNJ1S-1307-Afficher-les-statistiques-d-une-formation-avec-InserJeunes`_

Les branches peuvent être mergées selon 2 méthodes :
* squash
* rebase and merge
Dans les 2 cas, les titres et descriptions des commit finaux doivent respecter nos [standards](#commits). A chaque commit, l'application doit donc fonctionner, les tests et le linter passer.


## Stratégie de Versioning

Nous respectons le [Semantic Versioning](https://semver.org)
Une fois une branche mergée dans main, une Pull Request de release est automatiquement ouverte avec un commit de release pour :
* monter la version dans les `package.json` et `package-lock.json` selon les changements apportés par les précédents commits,
* ajouter un tag de version de la forme `vX.Y.Z`
* mettre à jour le changelog en reprenant les messages de commits précédents
