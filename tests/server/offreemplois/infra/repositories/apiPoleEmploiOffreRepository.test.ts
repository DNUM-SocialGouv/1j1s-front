import { ApiPoleEmploiOffreRepository } from "../../../../../src/server/offreemplois/infra/repositories/apiPoleEmploiOffre.repository";
import { PoleEmploiHttpClientService } from "../../../../../src/server/services/http/poleEmploiHttpClient.service";
import { anAxiosResponse } from "../../../../fixtures/httpClientService.fixture";
import { aPoleEmploiHttpClient } from "../../../../fixtures/poleEmploiHttpClientService.fixture";

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
