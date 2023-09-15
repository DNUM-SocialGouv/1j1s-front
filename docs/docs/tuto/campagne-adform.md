---
sidebar_label: Une campagne de com' Adform, comment on fait ?
sidebar_position: 4
---

# Le marketing avec Adform

_05 septembre 2023_

## Introduction

Quand on fait une campagne de com, on veut tracker où les utilisateurs arrivent, d'où ils viennent, etc.

## Comment ça marche ?

Le [`MarketingService`](https://github.com/DNUM-SocialGouv/1j1s-front/blob/main/src/client/services/marketing/marketing.service.ts)
initialise le service, le configure et l'ajoute au gestionnaire de cookies à l'instanciation dans le conteneur d'injection.
Ce service est commun à toutes les campagnes de com'.
À ce service s'ajoute le hook [`useMarketing`](https://github.com/DNUM-SocialGouv/1j1s-front/blob/main/src/client/hooks/useMarketing.ts).
Ce hook doit être appelé sur chaque page trackée dans la campagne et prend en paramètre le _page name_ fournit par Adform.

E.g. [pour la campagne apprentissage](https://github.com/DNUM-SocialGouv/1j1s-front/blob/b27b2a8249540c4b710d857de9e66c08bcaeee2f/src/pages/choisir-apprentissage/index.page.tsx#L25C2-L25C2) : 
```tsx
// src/pages/choisir-apprentissage/index.page.tsx

const PAGE_NAME = '2023-04-1jeune1solution.gouv.fr-PageArrivee-ChoisirApprentissage';

export default function ApprentissageJeunes(props) {
  useMarketing(PAGE_NAME);
  // ...
}
```
Il est ensuite possible d'activer le tracking au début de la campagne en activant simplement le feature flip associé : 
```shell
NEXT_PUBLIC_CAMPAGNE_ADFORM_FEATURE=1
```
