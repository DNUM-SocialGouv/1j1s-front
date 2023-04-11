terraform {
  required_version = "~> 1.4"

  backend "s3" {
    key    = "state/front.tfstate"
    bucket = "1j1s-terraform-remote-state-applications"
    region = "lorem-ipsum" # une région bidon car on utilise Minio au lieu d'AWS

    # Les options ci-dessous sont nécessaires pour utiliser le backend S3 Minio :

    # parce que la STS API n'existe pas avec Minio
    skip_credentials_validation = true
    # parce que l'AWS Metadata API n'existe pas avec Minio
    skip_metadata_api_check = true
    # parce que Minio n'utilise pas les même régions que AWS
    skip_region_validation = true
    # parce que Minio ne supporte pas le virtual-hosted-style
    force_path_style = true
  }

  required_providers {
    scalingo = {
      source  = "Scalingo/scalingo"
      version = "~> 2.0"
    }
  }
}

provider "scalingo" {
  # Afin de ne pas stocker de token dans le code source, pour utiliser le provider Scalingo
  # il faut configurer en variables d'environnements :
  # SCALINGO_API_TOKEN : le token d'authentification de l'utilisateur Scalingo ("tk-us-...")
  # SCALINGO_REGION : la région de l'API Scalingo ("osc-fr1" ou "osc-secnum-fr1")
}
