import { Adresse } from '~/server/localisations/domain/adresse';
import { CodeInsee } from '~/server/localisations/domain/codeInsee';
import { Localisation } from '~/server/localisations/domain/localisation';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';
import { ApiAdresseHttpClientService } from '~/server/services/http/apiAdresseHttpClient.service';
import { ApiGeoHttpClientService } from '~/server/services/http/apiGeoHttpClient.service';

export class ApiGeoLocalisationRepository implements LocalisationRepository {
  constructor(
    private readonly apiGeoHttpClientService: ApiGeoHttpClientService,
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

  async getCommuneListByNom(communeRecherchée: string): Promise<Localisation[]> {
    const response = await this.apiGeoHttpClientService
      .get<ApiDecoupageAdministratifResponse[]>(`communes?nom=${communeRecherchée}`);

    return response.data.map((commune) => ({
      code: commune.codesPostaux[0],
      codeInsee: ApiGeoLocalisationRepository.getCodeInsee(commune.codesPostaux, commune.code),
      libelle: commune.nom,
    }));
  }

  async getDépartementListByNom(départementRecherché: string): Promise<Localisation[]> {
    const response = await this.apiGeoHttpClientService
      .get<ApiDecoupageAdministratifResponse[]>(`departements?nom=${départementRecherché}`);

    return response.data.map((commune) => ({
      code: commune.code,
      codeInsee: CodeInsee.createCodeInsee(commune.code),
      libelle: commune.nom,
    }));
  }

  async getRégionListByNom(régionRecherchée: string): Promise<Localisation[]> {
    const response = await this.apiGeoHttpClientService
      .get<ApiDecoupageAdministratifResponse[]>(`regions?nom=${régionRecherchée}`);

    return response.data.map((commune) => ({
      code: commune.code,
      codeInsee: CodeInsee.createCodeInsee(commune.code),
      libelle: commune.nom,
    }));
  }

  async getCommuneListByCodePostal(codePostalRecherchée: string): Promise<Localisation[]> {
    const response = await this.apiGeoHttpClientService
      .get<ApiDecoupageAdministratifResponse[]>(`communes?codePostal=${codePostalRecherchée}`);

    return response.data.map((commune) => ({
      code: commune.codesPostaux[0],
      codeInsee: ApiGeoLocalisationRepository.getCodeInsee(commune.codesPostaux, commune.code),
      libelle: commune.nom,
    }));
  }

  async getCommuneListByNuméroDépartement(numéroDépartementRecherché: string): Promise<Localisation[]> {
    const response = await this.apiGeoHttpClientService
      .get<ApiDecoupageAdministratifResponse[]>(`departements/${numéroDépartementRecherché}/communes`);

    return response.data.map((commune) => ({
      code: commune.codesPostaux[0],
      codeInsee: ApiGeoLocalisationRepository.getCodeInsee(commune.codesPostaux, commune.code),
      libelle: commune.nom,
    }));
  }

  async getDépartementListByNuméroDépartement(numéroDépartementRecherché: string): Promise<Localisation[]> {
    const response = await this.apiGeoHttpClientService
      .get<ApiDecoupageAdministratifResponse[]>(`departements?code=${numéroDépartementRecherché}`);

    return response.data.map((commune) => ({
      code: commune.code,
      codeInsee: CodeInsee.createCodeInsee(commune.code),
      libelle: commune.nom,
    }));
  }


  async getLocalisationByTypeLocalisationAndCodeInsee(typeLocalisation: string, codeInsee: CodeInsee): Promise<Localisation> {
    const response = await this.apiGeoHttpClientService
      .get<ApiDecoupageAdministratifResponse>(`${typeLocalisation}/${codeInsee.valueAvecCodePostal}`);
    const { code, nom, codesPostaux } = response.data;
    return {
      code: typeLocalisation === 'communes' ?  response.data.codesPostaux[0] : code,
      codeInsee: ApiGeoLocalisationRepository.getCodeInsee(codesPostaux, code),
      libelle: nom,
    };
  }

  private static getCodeInsee(codesPostaux: string[], code: string) {
    return codesPostaux ? codesPostaux.length > 1 ? CodeInsee.createCodeInseeAvecCodePostal(code, codesPostaux[0]) : CodeInsee.createCodeInsee(code) : CodeInsee.createCodeInsee(code);
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
  codesPostaux: string[];
}
