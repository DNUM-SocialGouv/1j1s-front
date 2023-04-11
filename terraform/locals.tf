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
  envs_du_fichier_env = (var.front_fichier_env_secret != null) ? {
    for tuple in regexall("(.*)=[\"']?(.+)[\"']?", file(var.front_fichier_env_secret)) : tuple[0] => sensitive(tuple[1])
  } : {}
}
