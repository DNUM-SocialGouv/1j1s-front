data "cloudflare_zone" "zone" {
  account_id = "6150db30a41adef4af3b396df6c4b315"
  name       = "1jeune1solution.gouv.fr"
}

resource "cloudflare_record" "domaine" {
  for_each = toset(var.front_nom_de_domaine != null ? [var.front_nom_de_domaine] : [])

  zone_id = data.cloudflare_zone.zone.id
  name    = trimsuffix(var.front_nom_de_domaine, ".1jeune1solution.gouv.fr")
  value   = module.front_app.origin_domain
  type    = "CNAME"
  ttl     = 1
  proxied = contains(["default", "production"], terraform.workspace) ? true : false
  tags    = ["app:front", "env:${local.nom_environnement}"]
}

resource "cloudflare_record" "domaine_racine" {
  for_each = toset(terraform.workspace == "production" ? ["1jeune1solution.gouv.fr"] : [])

  zone_id = data.cloudflare_zone.zone.id
  name    = "1jeune1solution.gouv.fr"
  value   = module.front_app.origin_domain
  type    = "CNAME"
  ttl     = 1
  proxied = true
  tags    = ["app:front", "env:${local.nom_environnement}"]
}

resource "cloudflare_record" "domaine_analytics_eulerian" {
  for_each = toset(var.front_nom_de_domaine_analytics != null ? [var.front_nom_de_domaine_analytics] : [])

  zone_id = data.cloudflare_zone.zone.id
  name    = trimsuffix(var.front_nom_de_domaine_analytics, ".1jeune1solution.gouv.fr")
  value   = var.front_eulerian_domaine
  type    = "CNAME"
  ttl     = 1
  proxied = false
  comment = "Used for tracking by Eulerian"
  tags    = ["app:front", "env:${local.nom_environnement}", "eulerian", "analytics"]
}
