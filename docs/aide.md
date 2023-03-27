# Aide au développement


## Les pages de contenu ne s'affichent pas
Votre projet CMS en local est-il lancé et correctement configuré ?
Vos variables d'environnement sont-elles configurées pour appeler le CMS local ?

## Une recherche de contenu indexé (stage, annonce de logement, fiche métier) est indisponible
Votre conteneur Docker comprenant Meilisearch est-il bien lancé et configuré ?

## Une recherche de contenu indexé (stage, annonce de logement, fiche métier) mène vers une page non trouvée
Appelez-vous le même Meilisearch que votre CMS ? Les 2 devraient être relié à votre conteneur Docker
Avez-vous saisi du contenu dans Meilisearch ?
Si oui, cliquez sur `refresh` sur l'index sur votre Strapi.

## `npm ci` ne fonctionne pas ou `npm install` change votre `package-lock.json`
Vous avez probablement un processeur arm (mac m1 ou m2 par exemple).
Certaines de nos bibliothèques de composantes ont des versions non optimales.
Lancez alors un `npm install`, sans commiter les changements de `package-lock.json` au risque de bloquer la production.
