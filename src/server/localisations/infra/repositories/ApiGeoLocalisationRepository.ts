import { ClientService } from "../../../services/http/ClientService";
import { Adresse } from "../../domain/Adresse";
import { Localisation } from "../../domain/Localisation";
import { LocalisationRepository } from "../../domain/LocalisationRepository";

export class ApiGeoLocalisationRepository implements LocalisationRepository {
  constructor(private readonly httpClientService: ClientService) {}

  async listeAdresse(adresseRecherche: string): Promise<Adresse[]> {
    const response = await this.httpClientService.get<ApiGeoAdresseResponse>(
      "https://api-adresse.data.gouv.fr/search/?q=" + adresseRecherche
    );

    return response.data.features.map((adresse) => ({
      codeInsee: adresse.properties.citycode,
      libelle: adresse.properties.label,
      ville: adresse.properties.city,
    }));
  }

  async listeCommune(communeRecherche: string): Promise<Localisation[]> {
    const response = await this.httpClientService.get<
      ApiDecoupageAdministratifResponse[]
    >("https://geo.api.gouv.fr/communes?nom=" + communeRecherche);

    return response.data.map((commune) => ({
      codeInsee: commune.code,
      libelle: commune.nom,
    }));
  }

  async listeDepartement(
    departementRecherche: string
  ): Promise<Localisation[]> {
    const response = await this.httpClientService.get<
      ApiDecoupageAdministratifResponse[]
    >("https://geo.api.gouv.fr/departements?nom=" + departementRecherche);

    return response.data.map((commune) => ({
      codeInsee: commune.code,
      libelle: commune.nom,
    }));
  }

  async listeRegion(regionRecherche: string): Promise<Localisation[]> {
    const response = await this.httpClientService.get<
      ApiDecoupageAdministratifResponse[]
    >("https://geo.api.gouv.fr/regions?nom=" + regionRecherche);

    return response.data.map((commune) => ({
      codeInsee: commune.code,
      libelle: commune.nom,
    }));
  }
}

interface ApiGeoAdresseResponse {
  features: ApiGeoAdresseFeaturesResponse[];
}

interface ApiGeoAdresseFeaturesResponse {
  properties: ApiGeoAdressePropertiesResponse;
}

interface ApiGeoAdressePropertiesResponse {
  label: string;
  city: string;
  citycode: string;
}

interface ApiDecoupageAdministratifResponse {
  nom: string;
  code: string;
}
