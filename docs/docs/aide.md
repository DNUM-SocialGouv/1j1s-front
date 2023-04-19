# Comment ça marche...

## ... le tracking ?

Le tracking (ou analytics) est décomposé en 2 catégories de tags :

* impression = arrivée sur une page ou passage d'étape d'un formulaire.
* événements = interactions utilisateurs sur des call to actions

Les fonctions correspondantes se trouvent dans
l'[`AnalyticsService`](https://github.com/DNUM-SocialGouv/1j1s-front/blob/main/src/client/services/analytics/analytics.service.ts) et sont exposées aux composants depuis le
hook [`useAnalytics`](https://github.com/DNUM-SocialGouv/1j1s-front/blob/main/src/client/hooks/useAnalytics.ts) qui s'occupe par défaut d'envoyer les analytics d'une page selon
une configuration qui lui est envoyée. D'ailleurs, la configuration à envoyer de chaque page se trouve dans le dossier
de la page en question, dans un fichier de la forme `*.analytics.ts`.

## ... la recherche via API (offres d'emploi, jobs étudiants, jobs d'été, alternances, formations en apprentissage, accompagnement)

Les pages permettant de rechercher des résultats non indexés présentent un formulaire qui, une fois soumis, met
seulement à jour les paramètres de recherche dans l'url. Un composant dédié à chaque recherche écoute ces changements de
paramètres pour, le cas échéant, lancer une nouvelle requête HTTP. Une fois la réponse obtenue, la page des résultats
est mise à jour à l'aide de la réponse, en mode CSR (client side rendering).

## ... la recherche indexée (stages, annonces de logement, fiches métier, événements)

Les pages permettant de rechercher des résultats indexés s'appuient sur la librairie `@meilisearch/instant-meilisearch`
et son composant `InstantSearch`. Les résultats récupérés proviennent de Meilisearch, des objets chargés par
l'[ETL](https://github.com/DNUM-SocialGouv/1j1s-etl) à partir d'un flux. L'URL est complètement manipulée par la
librairie. Chaque changement dans un filtre lance une requête HTTP pour mettre à jour les résultats en conséquence. 
