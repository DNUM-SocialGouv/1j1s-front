locals {
  production_team = var.equipe_plateforme
  production_team_emails = flatten([
    for member_key, member in local.production_team : [member.email]
  ])

  nonproduction_team = concat(var.equipe_application, var.equipe_plateforme)
  nonproduction_team_emails = flatten([
    for member_key, member in local.nonproduction_team : [member.email]
  ])

  # Parse le fichier .env et retourne une map de clé/valeur de variables d'environnement
  envs_du_fichier_env = (var.front_fichier_env_secret != null) ? {
    for tuple in regexall("(.*)=[\"']?(.+)[\"']?", file(var.front_fichier_env_secret)) : tuple[0] => sensitive(tuple[1])
  } : {}
}
