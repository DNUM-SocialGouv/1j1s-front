# Redirect everything to HTTPS excepts:
# - requests from Let's Encrypt HTTP challenge (/.well-known/acme-challenge/*)
# - requests from Scalingo HTTP verification (/.well-known/scalingo-osc-fr1)
resource "cloudflare_ruleset" "always_use_https" {
  for_each = toset(var.front_nom_de_domaine != null ? [var.front_nom_de_domaine] : [])

  zone_id     = data.cloudflare_zone.zone.id
  name        = "default"
  kind        = "zone"
  phase       = "http_request_dynamic_redirect"

  rules {
    action = "redirect"
    action_parameters {
      from_value {
        status_code = 301
        target_url {
          expression = "concat(\"https://\", http.host, http.request.uri.path)"
        }
        preserve_query_string = true
      }
    }
    expression = format("(%s)", join(" and ", [
      "http.host in {\"${join("\",\"", concat([var.front_nom_de_domaine], var.domaines_aliases))}\"}",
      "not starts_with(http.request.uri.path, \"/.well-known/acme-challenge/\")",
      "not starts_with(http.request.uri.path, \"/.well-known/scalingo-osc-fr1\")",
      "not ssl"
    ]))
    description = "Redirect ${var.front_nom_de_domaine} to HTTPS (except Let's Encrypt and Scalingo)"
    enabled     = true
  }
}

# Disable Cloudflare's default security settings (to allow custom redirects rule)
resource "cloudflare_zone_settings_override" "zone_settings" {
  for_each = toset(terraform.workspace == "production" ? ["production"] : [])

  zone_id = data.cloudflare_zone.zone.id
  settings {
    always_use_https = "off"
  }
}
