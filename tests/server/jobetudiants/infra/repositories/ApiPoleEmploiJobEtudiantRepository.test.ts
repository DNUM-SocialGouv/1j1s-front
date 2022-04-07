import axios from "axios";

import { ApiPoleEmploiJobEtudiantRepository } from "../../../../../src/server/jobetudiants/infra/repositories/ApiPoleEmploiJobEtudiantRepository";
import { ApiTokenRepository } from "../../../../../src/server/tokens/infra/ApiTokenRepository";
import { ClientService } from "../../../../../src/server/services/http/ClientService";
import {
  anAxiosInstance,
  anAxiosResponse,
} from "../../../../fixtures/HttpClientService.fixture";

jest.mock("axios", () => {
  return {
    create: jest.fn(),
  };
});

describe("ApiPoleEmploiJobEtudiantRepository", () => {
  describe("listeJobEtudiant", () => {
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

    it("retourne la liste des jobs etudiants de pole emploi", async () => {
      const apiPoleEmploiJobEtudiantRepository =
        new ApiPoleEmploiJobEtudiantRepository(
          httpClientService,
          apiTokenRepository
        );

      jest
        .spyOn(apiTokenRepository, "getToken")
        .mockResolvedValue("fake_token");

      jest.spyOn(httpClientService, "get").mockResolvedValue(
        anAxiosResponse({
          resultats: [
            { id: "130WZJJ", intitule: "Hote/Hotesse de Caisse (H/F)" },
            {
              id: "130WZJD",
              intitule: "ou Accompagnant(e) éducatif(ve) et social(e) (H/F)",
            },
            {
              id: "130WZHH",
              intitule: "Auxiliaire de vie            (H/F)",
            },
          ],
        })
      );

      const result =
        await apiPoleEmploiJobEtudiantRepository.listeJobEtudiant();

      expect([
        { id: "130WZJJ", intitule: "Hote/Hotesse de Caisse (H/F)" },
        {
          id: "130WZJD",
          intitule: "ou Accompagnant(e) éducatif(ve) et social(e) (H/F)",
        },
        {
          id: "130WZHH",
          intitule: "Auxiliaire de vie            (H/F)",
        },
      ]).toEqual(result);
    });
  });
});
