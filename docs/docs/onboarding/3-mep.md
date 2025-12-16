# La première mise en production

Les premières étapes ont été faîtes avec succès et il faut maintenant contribuer ?

C'est parfait, c'est exactement ce qui va se passer : nous allons mettre en production.

## Avant tout...

- Commencer par créer une branche 
- Trouver une action **mineure** à prendre et faire la modification en créant un commit

## Place à l'action

- Pousser la branche avec le commit
- Valider la Pull Request et la merge sur `main`

## Direction : GitHub

Il y a une mise en production en cours, c'est normal ! Tout push sur `main` provoque un déploiement du contenu.

Ça s'appelle une politique "master/main/whatever stable".

## Et s'il faut revenir en arrière ?

Une fois la mise en production réalisée, il faut attendre un peu avant que le changement arrive : CloudFlare doit
détecter que le contenu a été mis à jour et provoquer une invalidation du cache.

Pour revenir en arrière, rien de plus simple :
- Revert le commit qui applique le changement sur `main`

Voilà : c'est comme ça qu'on rollback.
