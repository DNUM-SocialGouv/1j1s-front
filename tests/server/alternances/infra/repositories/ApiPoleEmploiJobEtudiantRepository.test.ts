import axios from "axios";

import { ApiLaBonneAlternanceRepository } from "../../../../../src/server/alternances/infra/repositories/ApiLaBonneAlternanceRepository";
import { HttpClientService } from "../../../../../src/server/services/http/HttpClientService";
import {
  anAxiosInstance,
  anAxiosResponse,
} from "../../../../fixtures/HttpClientService.fixture";

jest.mock("axios", () => {
  return {
    create: jest.fn(),
  };
});

describe("ApiLaBonneAlternanceRepository", () => {
  describe("listeJobEtudiant", () => {
    let httpClientService: HttpClientService;

    const axiosInstance = anAxiosInstance();

    beforeEach(() => {
      jest.mocked(axios.create).mockReturnValue(axiosInstance);

      httpClientService = {
        client: anAxiosInstance(),
        get: jest.fn(),
        post: jest.fn(),
      };
    });

    it("retourne la liste des métiers recherchés par l'api la bonne alternance", async () => {
      const apiLaBonneAlternanceRepository = new ApiLaBonneAlternanceRepository(
        httpClientService
      );

      jest.spyOn(httpClientService, "get").mockResolvedValue(
        anAxiosResponse({
          labelsAndRomes: [
            {
              label: "Boucherie, charcuterie, traiteur",
              rncps: [
                "RNCP15078",
                "RNCP19184",
                "RNCP26612",
                "RNCP34311",
                "RNCP34375",
                "RNCP7067",
                "RNCP7069",
                "RNCP7580",
                "RNCP975",
              ],
              romes: ["D1103", "D1101", "H2101"],
              type: "job",
            },
            {
              label: "Boulangerie, pâtisserie, chocolaterie",
              rncps: [
                "RNCP13856",
                "RNCP1473",
                "RNCP9824",
                "RNCP5226",
                "RNCP588",
                "RNCP6900",
                "RNCP6901",
                "RNCP7068",
                "RNCP891",
                "RNCP9084",
              ],
              romes: ["D1102", "D1104"],
              type: "job",
            },
          ],
        })
      );

      const result = await apiLaBonneAlternanceRepository.listeMetierRecherche(
        "bou"
      );

      expect([
        {
          intitule: "Boucherie, charcuterie, traiteur",
          repertoireOperationnelMetiersEmplois: ["D1103", "D1101", "H2101"],
        },
        {
          intitule: "Boulangerie, pâtisserie, chocolaterie",
          repertoireOperationnelMetiersEmplois: ["D1102", "D1104"],
        },
      ]).toEqual(result);
    });
  });
});
