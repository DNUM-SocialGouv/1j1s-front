---
sidebar_label: Lancer le front
sidebar_position: 2
---

# Lancer le projet 1j1s-front

_20 Avril 2023_

## Étapes 
1. Lancez redis dans votre terminal via `docker-compose up -d redis`
2. `nvm use` pour spécifier la version de node utilisée (si nécessaire)
3. Installez les dépendances avec `npm ci`
4. Copiez le `.env.test` vers `.env` puis éditez les valeurs à votre convenance
5. Lancez le projet en mode développement avec `npm run dev`
6. Ouvrez votre navigateur sur [http://localhost:3000](http://localhost:3000)


### Commandes utiles

| Commande                | Fonction                                                                 |
|-------------------------|--------------------------------------------------------------------------|
| npm run lint            | Vérifie le formatage du code                                             |
| npm run lint:fix        | Formater le code                                                         |
| npm run test            | Lance les tests                                                          |
| npm run test:watch      | Lance les tests avec un watcher                                          |
| npm run test:coverage   | Lance les tests en indiquant le test coverage                            |
| npm run dev             | Lance le site en mode développeur (avec hot reload)                      |
| npm run start           | Lance le site en mode fixe (sans hot reload)                             |
| npm run build           | build le site comme en production                                        |
| npm run analyze         | Analyze la taille du site et des packages                                |
| npm run analyze:server  | Analyze la taille du site et des packages côté serveur                   |
| npm run e2e             | Lance les tests cypress (nécessite que le site tourne)                   |
| npm run e2e:open        | Lance les tests cypress (nécessite que le site tourne)                   |
| npm run storybook       | Lance la documentation interactive des composants / assets Sass en local |
| npm run build:storybook | Build une version statique de la documentation storybook                 |
