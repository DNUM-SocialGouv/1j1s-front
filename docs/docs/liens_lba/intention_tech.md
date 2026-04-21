# Note d'intention technique : bascule des parcours alternance 1J1S vers les landing pages LBA

**Destinataires** : équipes LBA, DGEFP, hébergeur Scalingo
**Objet** : présenter l'approche technique retenue côté 1J1S pour rediriger les parcours alternance vers les deux landing pages LBA, sans entrer dans le détail du code.
**Version** : 2, 21 avril 2026 (v1 datée du 14 avril 2026, ajustement UTM post test recette)

> **Mise à jour UTM (21 avril 2026)** : suite retour de LBA, les UTM hardcodés côté destination sont désormais :
>
> * Candidats : `utm_source=1j1s&utm_medium=website&utm_campaign=landinglba1j1s`
> * Recruteurs : `utm_source=1j1s&utm_medium=website&utm_campaign=recruteurs_landinglba1j1s`
>
> Par rapport à la v1 (`utm_source=1jeune1solution` seul) : la valeur `utm_source` change, et deux paramètres `utm_medium` + `utm_campaign` sont ajoutés. Conséquence notable : les `utm_campaign` et `utm_medium` présents dans une URL source tierce sont désormais écrasés par les valeurs hardcodées (comportement standard des redirects Next.js, déjà le cas pour `utm_source` en v1). Compromis accepté pour permettre à LBA de mesurer un canal « landing 1J1S » unifié.
>
> L'URL de base reste configurable par environnement via `NEXT_PUBLIC_LBA_LANDING_CANDIDAT_URL` et `NEXT_PUBLIC_LBA_LANDING_RECRUTEUR_URL` (recette LBA vs prod LBA). Les UTM sont systématiquement appendés par le code, impossible à omettre en configuration.

## 1. Objectif

Supprimer les ruptures de navigation actuelles dans le parcours alternance de 1jeune1solution.gouv.fr en faisant atterrir directement les visiteurs sur les landing pages LBA, côté candidats et côté recruteurs, avant la campagne grand public alternance de mai 2026.

## 2. Périmètre

### URLs qui basculent vers la landing candidats
```
https://labonnealternance.apprentissage.beta.gouv.fr/1jeune1solution
```
* `/apprentissage` (racine actuelle de la recherche d'offres)
* `/apprentissage/{id}` (détail d'une offre, indexé Google)
* `/apprentissage/entreprise/{id}` (candidature spontanée, indexé Google)
* `/choisir-apprentissage` (landing découverte candidats)

### URLs qui basculent vers la landing recruteurs
```
https://labonnealternance.apprentissage.beta.gouv.fr/1jeune1solution-recruteurs
```
* `/apprentissage-entreprises` (landing employeurs)
* `/apprentissage/deposer-offre` (widget iframe de dépôt d'offre)

### URL strictement préservée, hors périmètre
* `/formations/apprentissage` (recherche de formations en apprentissage type CFA). Cette page reste hébergée sur 1jeune1solution.gouv.fr et continue de fonctionner normalement. Elle ne sera pas affectée par la bascule.

## 3. Approche technique

### 3.1 Redirections HTTP côté serveur

La bascule repose sur des redirections HTTP **308 (Moved Permanently)** déclenchées par le serveur 1J1S avant tout rendu. Ce choix a trois conséquences :

1. **Indexation des moteurs de recherche**. Google et consorts vont à terme retirer de leur index les URLs 1J1S redirigées et leur substituer les URLs LBA cibles. Les backlinks externes restent fonctionnels, ils suivent la redirection.
2. **Préservation du lien d'autorité SEO**. Le 308 transfère l'essentiel du PageRank de l'URL source vers l'URL cible, contrairement à un 302 temporaire.
3. **Irréversibilité pratique**. Une fois les moteurs mis à jour, un retour arrière demanderait plusieurs semaines pour que l'index se recale. C'est pour cela que nous avons confirmé en amont que les URLs cibles LBA sont stables dans le temps.

### 3.2 Transmission des paramètres de requête

Le serveur transmet automatiquement tous les paramètres de requête reçus sur les URLs sources vers les URLs de destination LBA. Concrètement :

* Si un visiteur arrive sur `1jeune1solution.gouv.fr/apprentissage?utm_campaign=printemps26&region=bretagne`, il est redirigé vers `labonnealternance.apprentissage.beta.gouv.fr/1jeune1solution?utm_source=1jeune1solution&utm_campaign=printemps26&region=bretagne`.
* Aucun filtrage côté 1J1S, aucune liste blanche. Tous les paramètres passent, ce qui garantit que les campagnes en cours et les variantes futures ne seront jamais bloquées.

### 3.3 Identifiant de provenance fixe

Un paramètre `utm_source=1jeune1solution` est ajouté de manière fixe sur toutes les redirections, en plus des paramètres forwardés. Objectif : permettre à LBA de mesurer dans Plausible et Matomo le volume exact basculé depuis 1J1S, indépendamment du referrer HTTP qui peut être absent sur certains navigateurs ou extensions de confidentialité.

### 3.4 Couverture des sous routes indexées

La décision LBA de rediriger également `/apprentissage/{id}` et `/apprentissage/entreprise/{id}` implique une règle de couverture large. Nous capturons l'ensemble des sous routes `/apprentissage/*` avec un motif générique, tout en conservant les règles spécifiques préexistantes qui ont priorité sur ce motif (notamment `/apprentissage/simulation` qui redirige déjà vers le simulateur de salaire LBA et vers travail-emploi.gouv.fr). L'ordre d'évaluation est : règles spécifiques d'abord, motif générique ensuite.

### 3.5 Mise à jour du menu principal

Indépendamment des redirections serveur, les trois entrées du menu principal de 1J1S concernées pointent désormais directement vers les URLs LBA, sans passer par les anciennes URLs 1J1S. Concrètement :

| Entrée de menu | Section | Nouvelle cible |
|---|---|---|
| Contrats d'alternance | Offres | landing candidats LBA |
| Découvrir et trouver sa voie avec l'apprentissage | Formations et orientation | landing candidats LBA |
| Je recrute un apprenti | Je suis employeur | landing recruteurs LBA |

Ces trois entrées ouvrent dans un nouvel onglet et affichent l'icône « nouvelle fenêtre », suivant le pattern déjà utilisé pour l'entrée « Stages d'observation » qui pointe vers stagedeseconde.1jeune1solution.gouv.fr. Le choix de pointer directement depuis le menu, plutôt que de passer par les anciennes URLs 1J1S qui seraient redirigées, évite un aller retour HTTP inutile et améliore l'UX perçue.

L'entrée « Formations en apprentissage » reste inchangée et continue de pointer vers `/formations/apprentissage` sur 1J1S.

## 4. Garanties offertes

| Garantie | Mécanisme |
|---|---|
| Aucun lien mort | Toutes les URLs historiques retournent une redirection 308 vers la landing appropriée, y compris les deep links Google et les partages externes |
| Paramètres de campagne préservés | Forward intégral, zéro filtrage côté 1J1S |
| Mesure du volume basculé | `utm_source=1jeune1solution` injecté systématiquement, visible dans Plausible et Matomo côté LBA |
| Périmètre formations intact | `/formations/apprentissage` et son entrée de menu ne sont pas touchés |
| SEO respectueux | Redirections permanentes 308, pas de chaînage inutile, pas de boucle |

## 5. Étapes de mise en production

1. **Validation des URLs cibles LBA**. Confirmation écrite déjà reçue par LBA que les deux URLs sont stables et resteront en place. Pas de nouvelle action attendue à cette étape.
2. **Mise en ligne côté 1J1S**. Les redirections et la mise à jour du menu sont embarquées dans une mise en production standard du front 1jeune1solution.gouv.fr sur l'infrastructure Scalingo. Pas de manipulation d'infrastructure nécessaire côté Scalingo au sens de DNS ou de proxy : les redirections sont portées par l'application elle-même, côté serveur, avant tout rendu.
3. **Validation fonctionnelle post déploiement**. Vérification manuelle de chaque URL source via requêtes HTTP directes, contrôle des codes 308, contrôle des URLs cibles, contrôle du forward des paramètres et de la présence de `utm_source=1jeune1solution` sur l'URL finale.
4. **Validation côté LBA**. Les équipes LBA confirment que Plausible et Matomo enregistrent bien les visites entrantes avec `utm_source=1jeune1solution` sur les deux landings.
5. **Communication aux moteurs de recherche**. Retrait progressif des URLs redirigées du `sitemap.xml` de 1J1S. Les moteurs recrawlent naturellement et mettent à jour leur index sur les semaines suivantes. Pas d'action de forcing nécessaire.

## 6. Échéance et urgence

Mise en production cible : **au plus tard la semaine du 20 avril 2026**, pour que les landings soient exposées avant le démarrage de la campagne grand public alternance prévue en mai 2026. Demande initiale formulée le 9 avril 2026 par Houssine Gartoum (DGEFP/SDFIMOD/MISI). Date de rédaction de la présente note : 14 avril 2026. Marge restante : une semaine.

## 7. Prérequis côté tiers

### Côté LBA
* Les deux URLs cibles doivent rester opérationnelles et stables. Confirmé.
* Plausible et Matomo doivent être configurés pour ingérer et exposer le paramètre `utm_source` sur ces deux landings. Confirmé.
* Une confirmation post bascule que le volume `utm_source=1jeune1solution` apparaît bien dans les tableaux de bord serait appréciée sous 48h après la mise en production.

### Côté Scalingo
* Aucune manipulation d'infrastructure n'est attendue. Les redirections sont portées par l'application 1J1S, pas par une couche proxy ou un reverse proxy côté Scalingo. La mise en production suit le processus habituel de déploiement Scalingo (push git, build, release).

### Côté DGEFP
* Aucune action technique attendue avant la mise en production. La communication grand public de la campagne alternance peut pointer vers les nouvelles URLs LBA directement, si c'est plus simple, puisque les anciennes URLs 1J1S restent valides par redirection pendant la transition.

## 8. Risques et points de vigilance

* **Cache intermédiaire CDN ou navigateur**. Un 308 est mis en cache agressivement par les clients et certains proxys intermédiaires. En cas d'erreur dans la destination après mise en production, le retour arrière est lent pour les visiteurs qui ont déjà vu la redirection. Mitigation : validation manuelle soigneuse des destinations avant le déploiement.
* **Anciens partages sociaux**. Les liens partagés sur Twitter, LinkedIn ou par email pointant vers une offre précise `/apprentissage/{id}` atterriront désormais sur la landing générique candidats, pas sur le détail de l'offre. C'est la décision LBA, assumée et actée.
* **Suivi d'audience 1J1S**. Les visites sur les parcours alternance ne seront plus comptées dans les outils analytiques côté 1J1S après bascule, puisque le visiteur quitte immédiatement le domaine. La mesure se fait uniquement côté LBA avec `utm_source=1jeune1solution`.
* **Périmètre formations**. Toute action touchant `/formations/apprentissage` serait une erreur. Ce point est documenté et contrôlé.

## 9. Contact

Pour toute question technique côté 1J1S sur la mise en œuvre, contacter l'équipe de développement du front 1jeune1solution.gouv.fr. Pour les questions fonctionnelles ou de calendrier, la demande initiale est portée par Houssine Gartoum (DGEFP/SDFIMOD/MISI).
