import axios from "axios";

import { ApiPoleEmploiOffreRepository } from "../../../../../src/server/offreemplois/infra/repositories/ApiPoleEmploiOffreRepository";
import { ClientService } from "../../../../../src/server/services/http/ClientService";
import { ApiTokenRepository } from "../../../../../src/server/tokens/infra/ApiTokenRepository";
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
    let httpClientService: ClientService;
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
        apiTokenRepository
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
  });
});
