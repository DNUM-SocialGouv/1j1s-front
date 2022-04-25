import { anAxiosResponse } from "@tests/fixtures/httpClientService.fixture";
import { aPoleEmploiHttpClient } from "@tests/fixtures/poleEmploiHttpClientService.fixture";

import { ApiPoleEmploiOffreRepository } from "~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.repository";
import { PoleEmploiHttpClientService } from "~/server/services/http/poleEmploiHttpClient.service";

describe("ApiPoleEmploiOffreRepository", () => {
  describe("listeOffreEmploi", () => {
    let poleEmploiHttpClientService: PoleEmploiHttpClientService;

    beforeEach(() => {
      poleEmploiHttpClientService = aPoleEmploiHttpClient();
    });

    it("retourne la liste des offres d emploi de pole emploi", async () => {
      const apiPoleEmploiOffreRepository = new ApiPoleEmploiOffreRepository(
        poleEmploiHttpClientService
      );

      jest.spyOn(poleEmploiHttpClientService, "get").mockResolvedValue(
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

      const result = await apiPoleEmploiOffreRepository.getOffreEmploiList();

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
