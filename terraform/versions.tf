terraform {
  required_version = ">= 1.4.2, < 2.0.0"

  backend "s3" {
    key    = "state/front.tfstate"
    bucket = "1j1s-terraform-remote-state-applications"
    region = "lorem-ipsum" # fake region because we use Minio instead of AWS

    # Ces options sont nécessaires pour utiliser le backend S3 Minio
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    skip_region_validation      = true
    force_path_style            = true

  }

  required_providers {
    scalingo = {
      source  = "Scalingo/scalingo"
      version = "~> 2.0"
    }
  }
}

provider "scalingo" {
  // Il faut configurer SCALINGO_API_TOKEN and SCALINGO_REGION
}
