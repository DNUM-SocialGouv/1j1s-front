import axios from "axios";

import { ApiGeoLocalisationRepository } from "../../../../../src/server/localisations/infra/repositories/ApiGeoLocalisationRepository";
import { ApiPoleEmploiOffreRepository } from "../../../../../src/server/offreemplois/infra/repositories/ApiPoleEmploiOffreRepository";
import { ClientService } from "../../../../../src/server/services/http/ClientService";
import { ApiTokenRepository } from "../../../../../src/server/tokens/infra/ApiTokenRepository";
import { MockedCacheService } from "../../../../fixtures/CacheService.fixture";
import {
  anAxiosInstance,
  anAxiosResponse,
} from "../../../../fixtures/HttpClientService.fixture";

jest.mock("axios", () => {
  return {
    create: jest.fn(),
  };
});

describe("ApiGeoLocalisationRepository", () => {
  describe("listeAdresse", () => {
    let httpClientService: ClientService;

    const axiosInstance = anAxiosInstance();

    beforeEach(() => {
      jest.mocked(axios.create).mockReturnValue(axiosInstance);

      httpClientService = {
        client: anAxiosInstance(),
        get: jest.fn(),
        post: jest.fn(),
      };
    });

    it("retourne la liste des adresses trouvées par l'api geo gouv", async () => {
      const apiGeoLocalisationRepository = new ApiGeoLocalisationRepository(
        httpClientService
      );

      jest.spyOn(httpClientService, "get").mockResolvedValue(
        anAxiosResponse({
          features: [
            {
              geometry: {
                coordinates: [2.493832, 48.926541],
                type: "Point",
              },
              properties: {
                city: "Aulnay-sous-Bois",
                citycode: "93005",
                context: "93, Seine-Saint-Denis, Île-de-France",
                housenumber: "20",
                id: "93005_1880_00020",
                importance: 0.72961,
                label: "20 Avenue Jules Jouy 93600 Aulnay-sous-Bois",
                name: "20 Avenue Jules Jouy",
                postcode: "93600",
                score: 0.4948996103896104,
                street: "Avenue Jules Jouy",
                type: "housenumber",
                x: 662910.67,
                y: 6869736.5,
              },
              type: "Feature",
            },
            {
              geometry: {
                coordinates: [1.553914, 48.510887],
                type: "Point",
              },
              properties: {
                city: "Jouy",
                citycode: "28201",
                context: "28, Eure-et-Loir, Centre-Val de Loire",
                housenumber: "20",
                id: "28201_0080_00020",
                importance: 0.51109,
                label: "20 Avenue de la Gare 28300 Jouy",
                name: "20 Avenue de la Gare",
                postcode: "28300",
                score: 0.3926165734265734,
                street: "Avenue de la Gare",
                type: "housenumber",
                x: 593197.33,
                y: 6824382.47,
              },
              type: "Feature",
            },
          ],
          type: "FeatureCollection",
          version: "draft",
        })
      );

      const result = await apiGeoLocalisationRepository.listeAdresse("jou");

      expect([
        { id: "130WPHH", intitule: "Gestionnaire ADV    (H/F)" },
        { id: "130WPHC", intitule: "Maçon / Maçonne" },
        {
          id: "130WPHB",
          intitule: "Surveillant / Surveillante de nuit         (H/F)",
        },
      ]).toEqual(result);
    });
  });
});
