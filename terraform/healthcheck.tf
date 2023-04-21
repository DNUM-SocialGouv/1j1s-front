locals {
  # Tous les Contact Groups
  contact_groups = {
    prodution = "274651" # "Alertes Production"
    default   = "286221" # "Alertes Recette"
    autres    = "286222" # "Alertes hors-production et hors-recette"
  }

  domaine_a_tester = coalesce(
    var.front_nom_de_domaine,
    module.front_app.domain
  )
}

data "statuscake_contact_group" "default_contact_group" {
  id = try(
    local.contact_groups[terraform.workspace],
    local.contact_groups["autres"]
  )
}

resource "statuscake_uptime_check" "http_check" {
  name           = "${var.front_nom_de_l_application} (${local.nom_environnement})"
  check_interval = 300 # = 5 minutes
  confirmation   = 3
  trigger_rate   = 0

  monitored_resource {
    address = "https://${local.domaine_a_tester}/"
    host    = "Scalingo (region: ${module.front_app.region})"
  }

  contact_groups = [
    data.statuscake_contact_group.default_contact_group.id
  ]

  http_check {
    enable_cookies   = false
    follow_redirects = true
    timeout          = 15
    validate_ssl     = true

    # All except 200
    status_codes = [
      "204",
      "205",
      "206",
      "303",
      "400",
      "401",
      "403",
      "404",
      "405",
      "406",
      "408",
      "410",
      "413",
      "429",
      "444",
      "494",
      "495",
      "496",
      "499",
      "500",
      "501",
      "502",
      "503",
      "504",
      "505",
      "506",
      "507",
      "508",
      "509",
      "510",
      "511",
      "520",
      "521",
      "522",
      "523",
      "524",
      "598",
      "599"
    ]
  }

  tags = [
    "app:front", "env:${local.nom_environnement}"
  ]
}
