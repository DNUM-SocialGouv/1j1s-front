---
sidebar_label: Le tracking, comment ça marche ?
sidebar_position: 1
---

# Le tracking

_20 Avril 2023_

## Introduction 

Le tracking est un suivi et une analyse du comportement et des centres d'intérêts des utilisateurs sur notre produit.

## Comment ça marche ?

Le tracking (ou analytics) est décomposé en 2 catégories de tags :

* impression = arrivée sur une page ou passage d'étape d'un formulaire.
* événements = interactions utilisateurs sur des call to actions

Les fonctions correspondantes se trouvent dans
l'[`AnalyticsService`](https://github.com/DNUM-SocialGouv/1j1s-front/blob/main/src/client/services/analytics/analytics.service.ts) et sont exposées aux composants depuis le
hook [`useAnalytics`](https://github.com/DNUM-SocialGouv/1j1s-front/blob/main/src/client/hooks/useAnalytics.ts) qui s'occupe par défaut d'envoyer les analytics d'une page selon
une configuration qui lui est envoyée. D'ailleurs, la configuration à envoyer de chaque page se trouve dans le dossier
de la page en question, dans un fichier de la forme `*.analytics.ts`.