import axios from "axios";

import { ApiPoleEmploiOffreRepository } from "../../../../../src/server/offreemplois/infra/repositories/ApiPoleEmploiOffreRepository";
import { HttpClientService } from "../../../../../src/server/services/http/HttpClientService";
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

describe("ApiPoleEmploiOffreRepository", () => {
  describe("listeOffreEmploi", () => {
    let httpClientService: HttpClientService;
    let apiTokenRepository: ApiTokenRepository;

    const axiosInstance = anAxiosInstance();

    beforeEach(() => {
      jest.mocked(axios.create).mockReturnValue(axiosInstance);

      httpClientService = {
        client: anAxiosInstance(),
        get: jest.fn(),
        post: jest.fn(),
      };
      apiTokenRepository = {
        getToken: jest.fn(),
      };
    });

    it("retourne la liste des offres d emploi de pole emploi", async () => {
      const apiPoleEmploiOffreRepository = new ApiPoleEmploiOffreRepository(
        httpClientService,
        apiTokenRepository,
        new MockedCacheService()
      );

      jest
        .spyOn(apiTokenRepository, "getToken")
        .mockResolvedValue("fake_token");

      jest.spyOn(httpClientService, "get").mockResolvedValue(
        anAxiosResponse({
          resultats: [
            { id: "130WPHH", intitule: "Gestionnaire ADV    (H/F)" },
            { id: "130WPHC", intitule: "Maçon / Maçonne" },
            {
              id: "130WPHB",
              intitule: "Surveillant / Surveillante de nuit         (H/F)",
            },
          ],
        })
      );

      const result = await apiPoleEmploiOffreRepository.listeOffreEmploi();

      expect([
        { id: "130WPHH", intitule: "Gestionnaire ADV    (H/F)" },
        { id: "130WPHC", intitule: "Maçon / Maçonne" },
        {
          id: "130WPHB",
          intitule: "Surveillant / Surveillante de nuit         (H/F)",
        },
      ]).toEqual(result);
    });

    it("retourne la liste des offres d emploi de pole emploi depuis le cache", async () => {
      const apiPoleEmploiOffreRepository = new ApiPoleEmploiOffreRepository(
        httpClientService,
        apiTokenRepository,
        new MockedCacheService()
      );

      jest
        .spyOn(apiTokenRepository, "getToken")
        .mockResolvedValue("fake_token");

      jest.spyOn(httpClientService, "get").mockResolvedValue(
        anAxiosResponse({
          resultats: [
            { id: "130WPHH", intitule: "Gestionnaire ADV    (H/F)" },
            { id: "130WPHC", intitule: "Maçon / Maçonne" },
            {
              id: "130WPHB",
              intitule: "Surveillant / Surveillante de nuit         (H/F)",
            },
          ],
        })
      );

      await apiPoleEmploiOffreRepository.listeOffreEmploi();
      const result = await apiPoleEmploiOffreRepository.listeOffreEmploi();

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
