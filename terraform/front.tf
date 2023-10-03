module "front_app" {
  source  = "scalingo-community/app/scalingo"
  version = "0.3.1"

  stack = "scalingo-20"

  name = var.nom_de_l_application

  containers = {
    web = {
      size   = terraform.workspace == "production" ? "XL" : "M"
      amount = terraform.workspace == "production" ? 2 : 1
      autoscaler = terraform.workspace == "production" ? {
        min_containers = 2
        max_containers = 10
        metric         = "cpu"
        target         = 0.8
      } : null
    }
  }

  github_integration = {
    repo_url            = "https://github.com/DNUM-SocialGouv/1j1s-front"
    branch              = var.branche_git
    auto_deploy_enabled = (terraform.workspace == "default") ? true : false
  }

  environment = local.envs_du_fichier_env

  addons = [
    {
      provider          = "redis"
      plan              = terraform.workspace == "production" ? "redis-business-256" : "redis-starter-256"
      database_features = ["redis-rdb"]
    }
  ]

  domain         = var.nom_de_domaine
  domain_aliases = terraform.workspace == "production" ? ["1jeune1solution.gouv.fr"] : null

  log_drains = (var.logstash_uri != null) ? [
    {
      type = "elk"
      url  = sensitive(var.logstash_uri)
    }
  ] : null
}
