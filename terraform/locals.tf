locals {
  # Parse le fichier .env et retourne une map de clé/valeur de variables d'environnement
  # Les valeurs sont automatiquement déclarées comme sensibles pour éviter de les afficher dans les logs
  # Si le fichier n'existe pas, la map est vide
  #
  # Le fichier .env est un fichier multiligne au format "KEY=VALUE" ou "KEY='VALUE'" ou "KEY="VALUE""
  # Exemple de fichier .env :
  #   KEY1=VALUE1
  #   KEY2='VALUE2'
  #   KEY3="VALUE3"
  envs_du_fichier_env = data.dotenv.envs_du_fichier_env.env == null ? null : {
    for key, value in data.dotenv.envs_du_fichier_env.env :
    key => sensitive(value) if value != null && value != ""
  }

  # Nom de l'environnement
  nom_environnement = terraform.workspace == "default" ? "recette" : terraform.workspace
}

data "dotenv" "envs_du_fichier_env" {
  filename = var.front_fichier_env_secret
}