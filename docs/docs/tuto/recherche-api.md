---
sidebar_label: La recherche via API, comment ça marche ?
sidebar_position: 2
---

# la recherche via API

_20 Avril 2023_

## Introduction 

Les pages permettant de rechercher des résultats non indexés présentent un formulaire qui, une fois soumis, met
seulement à jour les paramètres de recherche dans l'url. 


## Comment ça marche ? 

Un composant dédié à chaque recherche écoute ces changements de
paramètres pour, le cas échéant, lancer une nouvelle requête HTTP. Une fois la réponse obtenue, la page des résultats
est mise à jour à l'aide de la réponse, en mode CSR (client side rendering).

## Les pages concernées 

- [offres d'emploi](https://www.1jeune1solution.gouv.fr/emplois?page=1) 
- [jobs étudiants](https://www.1jeune1solution.gouv.fr/jobs-etudiants?page=1) 
- [job d'été](https://www.1jeune1solution.gouv.fr/) 
- [alternances](https://www.1jeune1solution.gouv.fr/apprentissage) 
- [formations en apprentissage](https://www.1jeune1solution.gouv.fr/formations/apprentissage) 
- [accompagnement](https://www.1jeune1solution.gouv.fr/accompagnement) 