# Peut aussi être défini avec TF_VAR_front_nom_de_domaine
variable "front_nom_de_domaine" {
  description = "Nom de domaine du front"
  type        = string
  default     = null

}
# Peut aussi être défini avec TF_VAR_front_variables_environnement_communes='{ FOO = "bar", BAR = "foor" }'
variable "front_variables_environnement_communes" {
  description = "Variables d'environnement communes à toutes les instances de l'application"
  type        = map(string)
  default     = {}
}

# Peut aussi être défini avec TF_VAR_front_fichier_env_secret
variable "front_fichier_env_secret" {
  description = "Nom du fichier contenant des variables d'environment, par exemple \".env\". Sera fusionné avec les variables"
  type        = string
  default     = null # "../.env"
  sensitive   = true
}

# Peut aussi être défini avec TF_VAR_branche_git
variable "branche_git" {
  description = "Nom de la branche à déployer"
  type        = string
  default     = "main"
}

# Peut aussi être défini avec TF_VAR_logstash_uri
variable "logstash_uri" {
  description = "URI du logstash, sous le format https://user:password@host:port"
  type        = string
  sensitive   = true
}

variable "equipe_application" {
  description = "Liste des membres de l'équipe de développement de l'application"
  type = list(object({
    name           = optional(string)
    email          = string
    fin_de_mission = optional(string)
  }))
  default = []
}

variable "equipe_plateforme" {
  description = "Liste des membres de l'équipe Plateforme/OPS"
  type = list(object({
    name           = optional(string)
    email          = string
    fin_de_mission = optional(string)
  }))
  default = []
}
