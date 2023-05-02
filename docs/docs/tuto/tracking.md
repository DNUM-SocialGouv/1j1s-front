---
sidebar_label: Le tracking, comment ça marche ?
sidebar_position: 1
---

# Le tracking

_28 Avril 2023_

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

# La solution utilisée 

## Technologie utilisée : Eulerian

L'ensemble des sites ministériels basculent sur la technologie Eulerian. La coupure de leur ancienne solution de tracking est prévue pour le 16/03/2023. 

https://github.com/EulerianTechnologies/nextjs-eulerian-analytics

## Chargement de la librairie Eulerian

1. Script à positionner idéalement au plus haut dans le **head**

2. Toujours le placer avant les scripts de mesure de page, d'interaction/événement, de conversion

3. Remplacer '**mon.domainedetracking.com**' par le  domaine de mesure correspondant au site qui doit être mesuré


ex : 
```js
script type="text/javascript"
    (function(e,a){var i=e.length,y=5381,k='script',s=window,v=document,o=v.createElement(k);for(;i;){i-=1;y=(y*33)^e.charCodeAt(i)}y='_EA_'+(y>>>=0);
    (function(e,a,s,y){s[a]=s[a]||function(){(s[y]=s[y]||[]).push(arguments);s[y].eah=e;};}(e,a,s,y));i=new Date/1E7|0;o.ea=y;y=i%26;o.async=1;o.src='//'+e+'/'+String.fromCharCode(97+y,122-y,65+y)+(i%1E3)+'.js?2';s=v.getElementsByTagName(k)[0];s.parentNode.insertBefore(o,s);})
('mon.domainedetracking.com','EA_push');
```


## Intégrer le service dans Tarte au citron

https://eulerian.wiki/doku.php?id=fr:modules:collect:gdpr:tarteaucitron&s[]=tarteaucitron

## Méthode générale d'envoi de donnnées vers Eulerian 

Consignes d'implémentation :

- Le script est placé dans une fonction anonyme auto-invoquée
- Une variable EA_datalayer de type Array est créée au scope global window
- Invoquer la méthode EA_datalayer.push() dans laquelle :
    1. Le premier argument sera le nom de la variable
    2. Le second argument sera la valeur de la variable
            Exemple :
            `data.push('key', 'value');`
- Une fois la construction de window.EA_datalayer finalisée, invoquer la fonction EA_push() dans laquelle nous passerons fnialement EA_data en argument.

ex : 
```js
"script type=""text/javascript"
(function(){

        // Création d'un datalayer au scope global :
        window.EA_datalayer = [];

        // Données à envoyer (dimensions/métriques) à posser dans le datalayer :
        window.EA_datalayer.push('dimension_personnalisee_X', '{{valeur X}}'); // etc.
        window.EA_datalayer.push('metrique_personnalisee_Y', {{valeur Y}}); // etc.
    
        // Envoi des données :
        window.EA_push(window.EA_datalayer);

})();
```

## Gestion des domaines

- Obtenir le sous domaine de tracking pour l'environnement de recette qui sera sous la forme **xxxx.recette.1jeune1solution.gouv.fr**
Lancer les demandes d'enregistrement CNAME pour les sous domaines de tracking, à transmettre à la DNUM. 
Ca sera sous la forme :
    - yssn.1jeune1solution.gouv.fr. CNAME minsante.ent.et-gv.fr.
    - yssn.1jeune1solution.gouv.fr. CAA 0 issue "letsencrypt.org"
    - recette.1jeune1solution.gouv.fr. CNAME recette.1jeune1solution.gouv.fr.cdn.cloudflare.net.
    - xxxx.recette.1jeune1solution.gouv.fr. CNAME minsante.ent.et-gv.fr.
    - xxxx.recette.1jeune1solution.gouv.fr. CAA 0 issue "letsencrypt.org"

- Ajouter un enregistrement CNAME pour les review apps : *.review.1jeune1solution.gouv.fr CNAME scalingo.review.1jeune1solution.gouv.fr.cdn.cloudflare.net
- Modifier la variable d'environnement NEXT_PUBLIC_ANALYTICS_ENVIRONMENT en recette avec le nouveau sous domaine de tracking sous la forme xxxx.recette.1jeune1solution.gouv.fr
- Une fois les enregistrements CNAME effectués et la recette sous sa nouvelle URL https://recette.1jeune1solution.gouv.fr, le tracking peut être recetté en l'activant via la variable d'environnement NEXT_PUBLIC_ANALYTICS_EULERIAN_FEATURE alors valorisée à 1.
- Mettre à jour les CSP


# Point de blocage éventuels 

## Erreur CSP
**Erreur rencontrée :** "refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'self' yssn.recette.1jeune1solution.gouv.fr". Either the 'unsafe-inline' keyword, a hash ('sha256-XXXXX...'), or a nonce ('nonce-...') is required to enable inline execution."

**Action :** désactiver la csp / utiliser « unsafe-inline » ?