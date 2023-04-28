---
sidebar_label: Aide au développement
sidebar_position: 100
---

# Que faire si...
_20 Avril 2023_


## Les pages de contenu ne s'affichent pas
Votre projet CMS en local est-il lancé et correctement configuré ?
Vos variables d'environnement sont-elles configurées pour appeler le CMS local ?

## `npm ci` ne fonctionne pas ou `npm install` change votre `package-lock.json`
Vous avez probablement un processeur arm (mac m1 ou m2 par exemple).
Certaines de nos bibliothèques de composantes ont des versions non optimales.
Lancez alors un `npm install`, sans commiter les changements de `package-lock.json` au risque de bloquer la production.
