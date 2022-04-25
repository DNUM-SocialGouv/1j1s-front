import { Adresse } from "~/server/localisations/domain/adresse";
import { Localisation } from "~/server/localisations/domain/localisation";
import { LocalisationRepository } from "~/server/localisations/domain/localisation.repository";
import { ApiAdresseHttpClientService } from "~/server/services/http/apiAdresseHttpClient.service";
import { ApiGeoHttpClientService } from "~/server/services/http/apiGeoHttpClient.service";

export class ApiGeoLocalisationRepository implements LocalisationRepository {
  constructor(
    private readonly apiGeoGouvHttpClientService: ApiGeoHttpClientService,
    private readonly apiAdresseHttpClientService: ApiAdresseHttpClientService
  ) {}

  async listeAdresse(adresseRecherche: string): Promise<Adresse[]> {
    const response =
      await this.apiAdresseHttpClientService.get<ApiGeoAdresseResponse>(
        "search/?q=" + adresseRecherche
      );

    return response.data.features.map((adresse) => ({
      codeInsee: adresse.properties.citycode,
      libelle: adresse.properties.label,
      ville: adresse.properties.city,
    }));
  }

  async listeCommune(communeRecherche: string): Promise<Localisation[]> {
    const response = await this.apiGeoGouvHttpClientService.get<
      ApiDecoupageAdministratifResponse[]
    >("communes?nom=" + communeRecherche);

    return response.data.map((commune) => ({
      codeInsee: commune.code,
      libelle: commune.nom,
    }));
  }

  async listeDepartement(
    departementRecherche: string
  ): Promise<Localisation[]> {
    const response = await this.apiGeoGouvHttpClientService.get<
      ApiDecoupageAdministratifResponse[]
    >("departements?nom=" + departementRecherche);

    return response.data.map((commune) => ({
      codeInsee: commune.code,
      libelle: commune.nom,
    }));
  }

  async listeRegion(regionRecherche: string): Promise<Localisation[]> {
    const response = await this.apiGeoGouvHttpClientService.get<
      ApiDecoupageAdministratifResponse[]
    >("regions?nom=" + regionRecherche);

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
