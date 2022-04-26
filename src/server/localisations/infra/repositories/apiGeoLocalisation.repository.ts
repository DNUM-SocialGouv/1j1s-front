import { Adresse } from '~/server/localisations/domain/adresse';
import { Localisation } from '~/server/localisations/domain/localisation';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';
import { ApiAdresseHttpClientService } from '~/server/services/http/apiAdresseHttpClient.service';
import { ApiGeoHttpClientService } from '~/server/services/http/apiGeoHttpClient.service';

export class ApiGeoLocalisationRepository implements LocalisationRepository {
  constructor(
    private readonly apiGeoGouvHttpClientService: ApiGeoHttpClientService,
    private readonly apiAdresseHttpClientService: ApiAdresseHttpClientService,
  ) {
  }

  async getAdresseList(adresseRecherchée: string): Promise<Adresse[]> {
    const response = await this.apiAdresseHttpClientService.get<ApiGeoAdresseResponse>(
      `search/?q=${adresseRecherchée}`,
    );

    return response.data.features.map((adresse) => ({
      codeInsee: adresse.properties.citycode,
      libelle: adresse.properties.label,
      ville: adresse.properties.city,
    }));
  }

  async getCommuneList(communeRecherchée: string): Promise<Localisation[]> {
    const response = await this.apiGeoGouvHttpClientService
      .get<ApiDecoupageAdministratifResponse[]>(`communes?nom=${communeRecherchée}`);

    return response.data.map((commune) => ({
      codeInsee: commune.code,
      libelle: commune.nom,
    }));
  }

  async getDépartementList(départementRecherché: string): Promise<Localisation[]> {
    const response = await this.apiGeoGouvHttpClientService
      .get<ApiDecoupageAdministratifResponse[]>(`departements?nom=${départementRecherché}`);

    return response.data.map((commune) => ({
      codeInsee: commune.code,
      libelle: commune.nom,
    }));
  }

  async getRégionList(régionRecherchée: string): Promise<Localisation[]> {
    const response = await this.apiGeoGouvHttpClientService
      .get<ApiDecoupageAdministratifResponse[]>(`regions?nom=${régionRecherchée}`);

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
