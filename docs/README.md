# Documentation Technique

Ce site Web est construit à l'aide de [Docusaurus 2](https://docusaurus.io/), un générateur de documentation statique moderne.

### Installation

```
$ npm install
```

### Développement local

```
$ npm start
```

Cette commande lance un serveur de développement local et ouvre une fenêtre de navigateur. La plupart des modifications sont reflétées en direct sans avoir à redémarrer le serveur.

### Compilation

```
$ npm build
```

Cette commande génère un contenu statique dans le répertoire `build` et peut être servi en utilisant n'importe quel service d'hébergement de contenu statique.

### Déploiement

La documentation est déployé automatiquement une fois mergée sur la branche main, grâce au workflow Github Actions `Publier la documentation sur les pages GitHub`.
