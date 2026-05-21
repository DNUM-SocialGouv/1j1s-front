data "cloudflare_zone" "zone" {
  zone_id = "6150db30a41adef4af3b396df6c4b315"
}

resource "cloudflare_dns_record" "domaine" {
  for_each = toset(var.nom_de_domaine != null ? [var.nom_de_domaine] : [])

  zone_id = data.cloudflare_zone.zone.id
  name    = trimsuffix(var.nom_de_domaine, ".1jeune1solution.gouv.fr")
  content   = module.front_app.origin_domain
  type    = "CNAME"
  ttl     = 1
  proxied = contains(["default", "production"], terraform.workspace) ? true : false
  tags    = ["app:front", "env:${local.nom_environnement}"]
}

resource "cloudflare_dns_record" "domaine_racine" {
  for_each = toset(terraform.workspace == "production" ? ["1jeune1solution.gouv.fr"] : [])

  zone_id = data.cloudflare_zone.zone.id
  name    = "1jeune1solution.gouv.fr"
  content   = module.front_app.origin_domain
  type    = "CNAME"
  ttl     = 1
  proxied = true
  tags    = ["app:front", "env:${local.nom_environnement}"]
}

resource "cloudflare_dns_record" "domaine_analytics_eulerian" {
  for_each = toset(var.nom_de_domaine_analytics != null ? [var.nom_de_domaine_analytics] : [])

  zone_id = data.cloudflare_zone.zone.id
  name    = trimsuffix(var.nom_de_domaine_analytics, ".1jeune1solution.gouv.fr")
  content   = var.eulerian_domaine
  type    = "CNAME"
  ttl     = 1
  proxied = false
  comment = "Used for tracking by Eulerian"
  tags    = ["app:front", "env:${local.nom_environnement}", "eulerian", "analytics"]
}

moved {
  from = cloudflare_record.domaine
  to   = cloudflare_dns_record.domaine
}

moved {
  from = cloudflare_record.domaine_racine
  to   = cloudflare_dns_record.domaine_racine
}

moved {
  from = cloudflare_record.domaine_analytics_eulerian
  to   = cloudflare_dns_record.domaine_analytics_eulerian
}
