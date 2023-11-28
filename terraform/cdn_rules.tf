
resource "cloudflare_ruleset" "http_config_settings" {
  kind    = "zone"
  zone_id = data.cloudflare_zone.zone.id
  
  name    = "default"
  phase   = "http_config_settings"
  
  rules {
    action = "set_config"
    action_parameters {
      bic            = true
      security_level = "high"
    }
    description = "Durcir le firewall pour le trafic venant hors de France et d'Europe"
    enabled     = true
    expression  = "(ip.geoip.continent ne \"EU\" or ip.geoip.country ne \"RE\" or ip.geoip.country ne \"MQ\" or ip.geoip.country ne \"PF\" or ip.geoip.country ne \"TF\" or ip.geoip.country ne \"MF\" or ip.geoip.country ne \"PM\" or ip.geoip.country ne \"GF\" or ip.geoip.country ne \"GP\" or ip.geoip.country ne \"YT\" or ip.geoip.country ne \"BL\" or ip.geoip.country ne \"WF\" or ip.geoip.country ne \"NC\")"
    ref         = "4cbb9067af7d4c33b683de2810094bfb"
  }
  rules {
    action = "set_config"
    action_parameters {
      ssl = "off"
    }
    description = "Disable SSL for Let's encrypt challenge"
    enabled     = false
    expression  = "(starts_with(http.request.uri.path, \"/.well-known/acme-challenge/\"))"
    ref         = "f924df408d704b85a74ec344ecc02d0e"
  }
}

resource "cloudflare_ruleset" "ratelimit" {
  kind    = "zone"
  zone_id = data.cloudflare_zone.zone.id

  name    = "default"
  phase   = "http_ratelimit"
  
  rules {
    action      = "managed_challenge"
    description = "API Pole Emploi"
    enabled     = true
    expression  = "(http.request.uri.path in {\"/api/emplois\" \"/api/jobs-etudiants\" \"/api/alternances\"} and http.host eq \"www.1jeune1solution.gouv.fr\" and not cf.bot_management.verified_bot)"
    ratelimit {
      characteristics     = ["ip.src", "cf.colo.id"]
      period              = 600
      requests_per_period = 100
      requests_to_origin  = true
    }
    ref = "d307f89251ab4500af7f7c38ccc04d65"
  }
  rules {
    action      = "block"
    description = "Demandes de contact et entreprises"
    enabled     = true
    expression  = "(http.request.uri.path in {\"/api/etablissements-accompagnement\" \"/api/demandes-de-contact\" \"/api/contacts-poe\" \"/api/entreprises\"})"
    ratelimit {
      characteristics     = ["ip.src", "cf.colo.id"]
      mitigation_timeout  = 3600
      period              = 600
      requests_per_period = 10
      requests_to_origin  = true
    }
    ref = "62745be4870e4bb49510997457e8a921"
  }
  rules {
    action      = "log"
    description = "Requêtes GET"
    enabled     = true
    expression  = "(starts_with(http.request.uri.path, \"/api/\") and http.request.method eq \"GET\")"
    ratelimit {
      characteristics     = ["ip.src", "cf.colo.id"]
      mitigation_timeout  = 3600
      period              = 600
      requests_per_period = 100
      requests_to_origin  = true
    }
    ref = "a32f3ae071774d7880c9b5662ad7b16c"
  }
}

resource "cloudflare_ruleset" "cache_customization" {
  kind    = "zone"
  zone_id = data.cloudflare_zone.zone.id
  
  name    = "default"
  phase   = "http_request_cache_settings"
  
  rules {
    action = "set_cache_settings"
    action_parameters {
      browser_ttl {
        default = 86400
        mode    = "override_origin"
      }
      cache = true
      cache_key {
        ignore_query_strings_order = false
      }
      edge_ttl {
        default = 604800
        mode    = "override_origin"
      }
      serve_stale {
        disable_stale_while_updating = false
      }
    }
    description = "Mettre en cache les recherches de localisations"
    enabled     = true
    expression  = "(http.request.uri.path eq \"/api/localisations\")"
    ref         = "37ad945488f543f8ad4f5f92e5b30144"
  }
  rules {
    action = "set_cache_settings"
    action_parameters {
      browser_ttl {
        default = 604800
        mode    = "override_origin"
      }
      cache = true
      cache_key {
        cache_deception_armor = false
      }
      edge_ttl {
        default = 86400
        mode    = "override_origin"
      }
    }
    description = "Mettre en cache les images Next"
    enabled     = true
    expression  = "(http.request.uri.path eq \"/_next/image\")"
    ref         = "6812837273cc4104b39f2d98560979b4"
  }
  rules {
    action = "set_cache_settings"
    action_parameters {
      browser_ttl {
        default = 31536000
        mode    = "override_origin"
      }
      cache = true
      edge_ttl {
        default = 86400
        mode    = "override_origin"
      }
    }
    description = "Mettre en cache le dossier /public"
    enabled     = true
    expression  = "(starts_with(http.request.uri.path, \"/images/\")) or (starts_with(http.request.uri.path, \"/fonts/\")) or (starts_with(http.request.uri.path, \"/css/\")) or (starts_with(http.request.uri.path, \"/favicons/\")) or (starts_with(http.request.uri.path, \"/icons/\")) or (starts_with(http.request.uri.path, \"/illustrations/\")) or (starts_with(http.request.uri.path, \"/lang/\")) or (starts_with(http.request.uri.path, \"/scripts/\")) or (http.request.uri.path matches \"^/google*.html$\")"
    ref         = "436b7fc512e644699adc5aa0a05faffc"
  }
  rules {
    action = "set_cache_settings"
    action_parameters {
      cache = true
      edge_ttl {
        default = 86400
        mode    = "override_origin"
      }
    }
    description = "Mettre en cache les fiches métiers"
    enabled     = true
    expression  = "(http.request.uri.path matches \"^/_next/data/[a-zA-Z0-9]+/decouvrir-les-metiers/*\") or (starts_with(http.request.uri.path, \"/decouvrir-les-metiers\"))"
    ref         = "435c6e767d694d6896f0ca42c9707818"
  }
  rules {
    action = "set_cache_settings"
    action_parameters {
      browser_ttl {
        default = 60
        mode    = "override_origin"
      }
      cache = true
      edge_ttl {
        default = 2678400
        mode    = "override_origin"
      }
    }
    description = "L'exception tarteaucitron"
    enabled     = true
    expression  = "(http.request.uri.path eq \"/scripts/tarteaucitron.js\") or (http.request.uri.path eq \"/tarteaucitron.services.js\")"
    ref         = "cf6039b6d8704b3485f0e4c8974c40d1"
  }
}
