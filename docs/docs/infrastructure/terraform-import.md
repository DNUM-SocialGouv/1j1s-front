---
sidebar_label: Import des ressources TF
sidebar_position: 1
---

# Comment nous avons importé les ressource Terraform

:::danger
Ces étapes ont été réalisées une fois pour toutes lors de l'initialisation du code Terraform du projet.
Elles ont été documentées ici seulement pour garder mémoire du processus et pour aider à débugger plus tard si nécessaire. 

__Tenter de reproduire ces étapes sur les `states` déjà initialisés pourraient avoir des effets inattendus et provoquer des problèmes graves.__
:::

:::info Pré-requis
- **curl** (déjà pré-installés sur votre environnement normalement)
- **jq** (Instructions d'installation ici : https://stedolan.github.io/jq/download/)
:::

## 1. Scalingo

### Correspondances entre Ressources Terraform et routes d'API

| Resource Terraform             | Route(s) d'API *                            | Identifiant unique pour l'import |
|--------------------------------|---------------------------------------------|----------------------------------|
| scalingo_app                   | `/v1/apps`                                  | `id` or `name`                   |
| scalingo_container_type        | `/v1/apps/[:app]/containers`                | `app_name:container_name`        |
| scalingo_addon                 | `/v1/apps/[:app]/addons`                    | 
| scalingo_scm_repo_link         | `/v1/apps/[:app]/scm_repo_link`             | `app_name`
| scalingo_domain                | `/v1/apps/[:app]/domains`                   | `app_name:domain_id`
| scalingo_collaborator          | `/v1/apps/[:app]/collaborators`             | `app_id:email`                   |
| scalingo_log_drain             | `/v1/apps/[:app]/log_drains`                | `app_name#drain_url`             |
| scalingo_autoscaler            | `/v1/apps/[:app]/autoscalers`               | `app_name:autoscaler_id`         |
| scalingo_notification_platform | _TODO: à compléter quand on les importera_  |
| scalingo_notifier              | _TODO: à compléter quand on les importera_  |
| scalingo_alert                 | _TODO: à compléter quand on les importera_  |

\* toujours préfixée(s) par `https://$SCALINGO_API_URL` sauf mention contraire

### Initialiser les variables d'environnements

:::tip Obtenir un Token d'API Scalingo
Si vous n'avez pas encore créé un token d'API Scalingo vous pouvez le faire ici sur la [page dédiée du dashboard](https://dashboard.scalingo.com/account/tokens). Les tokens que vous créez avec votre compte individuel n'ont évidemment accès qu'aux applications pour lesquelles des droits vous ont déjà été accordés. Pour jouer avec un token qui ait accès à toutes les applications Scalingo du compte "1j1s", il vous faut demander ce token "maître" à vos collègues qui l'ont déjà.
:::

```shell
export SCALINGO_API_TOKEN="<Mettre votre clé d'API Scalingo ici>"
export SCALINGO_REGION=osc-fr1
export SCALINGO_API_URL="api.$SCALINGO_REGION.scalingo.com"

# Obtenir un token valable 1h,
# Lorsque celui sera expiré, il suffit de réexécuter cette commande seulement
export SCALINGO_BEARER=`curl -s \
   -H "Accept: application/json" \
   -u ":$SCALINGO_API_TOKEN" \
   -X POST https://auth.scalingo.com/v1/tokens/exchange \
   | jq -r '.token'`
```

### Lister les applications qui vous sont accessibles

Normalement cette liste devrait être identique à ce que vous voyez [depuis le dashboard](https://dashboard.scalingo.com/apps).

```shell
curl -s -H "Accept: application/json" -H "Authorization: Bearer $SCALINGO_BEARER" \
   https://$SCALINGO_API_URL/v1/apps \
   | jq '.apps[].name'
```

### Choisir l'application qu'on veut importer 

Pour éviter de répéter le nom de l'application dans les prochaines commandes, vous pouvez le stocker dans une variable d'env : 

```shell
export SCALINGO_APP_NAME="<nom de l'application>"
```

### Module Terraform

```shell
export TF_MODULE=front_app
```

### Importer l'application

```shell
terraform import module.$TF_MODULE.scalingo_app.app $SCALINGO_APP_NAME
```

### Types de conteneurs

Récupèrons d'abord la liste des types de conteneurs qui sont présents sur notre application.

```shell
curl -s -H "Accept: application/json" -H "Authorization: Bearer $SCALINGO_BEARER" \
   https://$SCALINGO_API_URL/v1/apps/$SCALINGO_APP_NAME/containers \
   | jq '.containers[].name'
```
En général il y a au moins le process `web`, alors on peut d'abord importer celui-ci, puis importer les autres sur le même modèle.

```shell
terraform import "module.$TF_MODULE.scalingo_container_type.containers[\"<containerType>\"]" ${SCALINGO_APP_NAME}:web
```

### Autoscalers

```shell
curl -s -H "Accept: application/json" -H "Authorization: Bearer $SCALINGO_BEARER" \
   https://$SCALINGO_API_URL/v1/apps/$SCALINGO_APP_NAME/autoscalers \
   | jq '.autoscalers[] | .container_type + " => " + .id'
```

```shell
terraform import "module.$TF_MODULE.scalingo_autoscaler.autoscalers[\"<containerType>\"]" ${SCALINGO_APP_NAME}:<autoscalerId>
```

### Addons (et notamment les bases de données)

Récupèrons d'abord la liste des addons qui sont présents sur notre application.

```shell
curl -s -H "Accept: application/json" -H "Authorization: Bearer $SCALINGO_BEARER" \
   https://$SCALINGO_API_URL/v1/apps/$SCALINGO_APP_NAME/addons \
   | jq '.addons[]|.addon_provider.id+" ("+.plan.name+") => "+.id'

# => "redis (redis-business-256) => ad-********-****-****-****-************"
```
Pour chaque ligne : le *premier élément* (ici "`redis`") est à mettre dans l'emplacement `addonProvider`, le *dernier élement* (qui ressemble à un uuid) est à mettre dans l'emplacement `addonId`.
Le plan est donné à titre informatif mais n'est pas utilisé pour l'import.

```shell
terraform import "module.$TF_MODULE.scalingo_addon.addons[\"<addonProvider>\"]" ${SCALINGO_APP_NAME}:<addonId>
```

### Collaborateurs

:::info
Il a été décidé de ne pas gérer les collaborateurs avec Terraform pour l'instant. Ces commandes d'imports n'ont pas été utilisées.
:::

```shell
# List addons
curl -s -H "Accept: application/json" -H "Authorization: Bearer $SCALINGO_BEARER" \
   https://$SCALINGO_API_URL/v1/apps/$SCALINGO_APP_NAME/collaborators \
   | jq '.collaborators[].email'
```
Pour l'import des collaborateurs nous avons besoin de l'APP_ID, il s'obtient ainsi :

```shell
export APP_ID=`curl -s -H "Accept: application/json" -H "Authorization: Bearer $SCALINGO_BEARER" \
   https://$SCALINGO_API_URL/v1/apps/$SCALINGO_APP_NAME \
   | jq -r '.app.id'`
```

```shell
curl -s -H "Accept: application/json" -H "Authorization: Bearer $SCALINGO_BEARER" \
   https://$SCALINGO_API_URL/v1/apps/$SCALINGO_APP_NAME/collaborators \
   | jq -r '.collaborators[].email' \
   | while IFS= read -r email ; do \
      terraform import "module.$TF_MODULE.scalingo_collaborator.collaborators[\"$email\"]" $APP_ID:$email; \
     done
```

### Log drains
```shell
curl -s -H "Accept: application/json" -H "Authorization: Bearer $SCALINGO_BEARER" \
   https://$SCALINGO_API_URL/v1/apps/$SCALINGO_APP_NAME/log_drains \
   | jq '.drains[].url'
```

```shell
terraform import "module.$TF_MODULE.scalingo_log_drain.log_drain[\"elk\"]" ${SCALINGO_APP_NAME}#<drain_url>
```

### Github Repo Link

Ce n'est même pas la peine de les lister car il ne peut y en avoir qu'un seul par application, mais si vous souhaitez vérifier sa présence avant d'importer vous pouvez utiliser la commande suivante :

```shell
curl -s -H "Accept: application/json" -H "Authorization: Bearer $SCALINGO_BEARER" \
   https://$SCALINGO_API_URL/v1/apps/$SCALINGO_APP_NAME/scm_repo_link \
   | jq '"scm_type = " + .scm_repo_link.scm_type'
```

```shell
terraform import "module.$TF_MODULE.scalingo_scm_repo_link.scm_repo_link[\"<scm_type>\"]" ${SCALINGO_APP_NAME}
```

### Nom de domaine principal

```shell
curl -s -H "Accept: application/json" -H "Authorization: Bearer $SCALINGO_BEARER" \
   https://$SCALINGO_API_URL/v1/apps/$SCALINGO_APP_NAME/domains \
   | jq '.domains[] | .name + " => " + .id + (if .canonical then " [!!CANONICAL!!]" else " [alias]" end)'

terraform import "module.$TF_MODULE.scalingo_domain.canonical_domain[\"<domainName>\"]" ${SCALINGO_APP_NAME}:domainId

# S'il y a des alias
terraform import "module.$TF_MODULE.scalingo_domain.domain_aliases[\"<domainName>\"]" ${SCALINGO_APP_NAME}:domainId
```

### Autres noms de domaine (alias)

```shell
curl -s -H "Accept: application/json"    -H "Authorization: Bearer $SCALINGO_BEARER"    https://$SCALINGO_API_URL/v1/apps/$SCALINGO_APP_NAME/domains | jq

terraform import "module.$TF_MODULE.scalingo_domain.canonical_domain[\"<domainName>\"]" app_id:domain_id
```

## 2. Cloudflare

### Domaine du site

```shell
export CLOUDFLARE_API_TOKEN="<Mettre votre Token API Cloudflare ici>"
export CLOUDFLARE_ZONE_ID="<Mettre votre Zone ID ici>"

curl -s -H "Content-Type: application/json" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/dns_records \
  | jq '.result[] | "[" + .type +"] " + .name + " => " + .id'

```

```shell
terraform import "cloudflare_record.domaine[\"<domainName>\"]" $CLOUDFLARE_ZONE_ID/<recordId>

terraform import "cloudflare_record.domaine_analytics_eulerian[\"<domainName>\"]" $CLOUDFLARE_ZONE_ID/<recordId>
```

### Domaine pour l'analytics

## 3. StatusCake

:::info
Les clés d'API StatusCake se génèrent facilement sur [la page "My Account"](https://app.statuscake.com/User.php)
:::

```shell
export STATUSCAKE_API_TOKEN="<Mettre votre clé d'API StatusCake ici>"

curl -s -H "Authorization: Bearer ${STATUSCAKE_API_TOKEN}" \
   https://api.statuscake.com/v1/uptime \
   | jq '.data[] | "[" + .test_type + "] " + .name + " => " + .id'

# => "[HTTP] 1j1s-******* => 12456789"
#    "[HEAD] https://********.gouv.fr => 987654321"
```

```shell
terraform import statuscake_uptime_check.http_check "<uptime_check_id>"
```