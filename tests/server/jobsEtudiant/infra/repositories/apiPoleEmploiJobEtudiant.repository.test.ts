import { anAxiosResponse } from "@tests/fixtures/httpClientService.fixture";
import { aPoleEmploiHttpClient } from "@tests/fixtures/offresEmploi/poleEmploiHttpClientService.fixture";

import { ApiPoleEmploiJobEtudiantRepository } from "~/server/jobsEtudiant/infra/repositories/apiPoleEmploiJobEtudiant.repository";
import { PoleEmploiHttpClientService } from "~/server/services/http/poleEmploiHttpClient.service";

describe("ApiPoleEmploiJobEtudiantRepository", () => {
  describe("getJobEtudiantList", () => {
    let poleEmploiHttpClientService: PoleEmploiHttpClientService;

    beforeEach(() => {
      poleEmploiHttpClientService = aPoleEmploiHttpClient();
    });

    it("retourne la liste des jobs etudiants de pole emploi", async () => {
      const apiPoleEmploiJobEtudiantRepository =
        new ApiPoleEmploiJobEtudiantRepository(poleEmploiHttpClientService);

      jest.spyOn(poleEmploiHttpClientService, "get").mockResolvedValue(
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
        await apiPoleEmploiJobEtudiantRepository.getJobEtudiantList();

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
