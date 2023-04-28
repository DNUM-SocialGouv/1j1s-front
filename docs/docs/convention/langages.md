---
sidebar_label: Langages
sidebar_position: 2
---

# Standards d'équipe liés au Code

_20 Avril 2023_

## Choix du langage
* les objets métiers sont en **français**
* les intitulés de test sont en **français**
* Le reste du code est en **anglais**

_exemple : `getJobÉtudiant`, `OffreEmploi`, `it("récupère la liste des alternances", () => ...)`_

## Principes généraux
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

Plus d'info sur [l'arborescence des dossiers](../architecture/architecture#structure)


### Nommage des collections

Une variable représentant une collection sera suffixée par le mot `List` afin d'éviter le pluriel, parfois en conflit avec des mots invariables

_exemple: `const offreEmploiList: Array<OffreEmploi> = [...]`

## Stratégie de test

Nous favorisons des tests unitaires autant que possible, rapides à exécuter. Les tests de composants via React Testing Library complètent ces tests afin de tester l'affichage, par l'**arbre d'accessibilité**
* tests unitaires autant que possible
* tests d'intégration sur les endpoints API
* tests de composants via React Testing Library sur les composants comportant de la logique d'affichage, de la validation (formulaires) et récupération de données
* tests end-to-end pour simuler un workflow complet utilisateur sur une fonctionnalité. Exemple : recherche d'une offre d'emploi puis consultation du détail d'une offre