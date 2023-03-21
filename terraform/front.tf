module "front_app" {
  source = "github.com/josephpage/terraform-scalingo-app"

  stack = "scalingo-20"

  name = terraform.workspace == "default" ? "1j1s-front" : "1j1s-front-${terraform.workspace}"

  containers = {
    web = {
      size : terraform.workspace == "production" ? "XL" : "M"
      amount : 1
      autoscaler = terraform.workspace == "production" ? {
        min_containers = 2
        max_containers = 10
        metric         = "cpu"
        target         = 0.8
      } : null
    }
  }

  github_integration = {
    repo_url = "https://github.com/DNUM-SocialGouv/1j1s-front"
    branch   = var.branche_git
  }

  environment = merge(
    var.front_variables_environnement_communes,
    local.envs_du_fichier_env
  )

  addons = [
    {
      provider = "redis"
      plan     = terraform.workspace == "production" ? "redis-business-256" : "redis-sandbox"
    }
  ]

  domain         = var.front_nom_de_domaine
  domain_aliases = terraform.workspace == "production" ? ["1jeune1solution.gouv.fr"] : null

  additionnal_collaborators = (
    terraform.workspace == "production"
    ? local.production_team_emails
    : local.nonproduction_team_emails
  )

  log_drains = (var.logstash_uri != null) ? [
    {
      type = "elk"
      url  = "${var.logstash_uri}"
    }
  ] : null
}
