import { anOffreEmploiFiltre } from "@tests/fixtures/offresEmploi/offreEmploi.fixture";
import {
  aPoleEmploiHttpClient,
  aPoleEmploiRechercheResponse,
} from "@tests/fixtures/offresEmploi/poleEmploiHttpClientService.fixture";

import { ApiPoleEmploiOffreRepository } from "~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.repository";
import { PoleEmploiHttpClientService } from "~/server/services/http/poleEmploiHttpClient.service";

describe("ApiPoleEmploiOffreRepository", () => {
  let poleEmploiHttpClientService: PoleEmploiHttpClientService;
  let apiPoleEmploiOffreRepository: ApiPoleEmploiOffreRepository;

  beforeEach(() => {
    poleEmploiHttpClientService = aPoleEmploiHttpClient();
    apiPoleEmploiOffreRepository = new ApiPoleEmploiOffreRepository(
      poleEmploiHttpClientService
    );
  });

  describe("getOffreEmploiList", () => {
    it("retourne la liste des offres d'emploi de pole emploi", async () => {
      jest.spyOn(poleEmploiHttpClientService, "get").mockResolvedValue(
        aPoleEmploiRechercheResponse()
      );
      const offreEmploiFiltre = anOffreEmploiFiltre();

      const result = await apiPoleEmploiOffreRepository.getOffreEmploiList(
        offreEmploiFiltre
      );

      expect(result).toEqual([
        { id: "130WPHH", intitule: "Gestionnaire ADV    (H/F)" },
        { id: "130WPHC", intitule: "Maçon / Maçonne" },
        {
          id: "130WPHB",
          intitule: "Surveillant / Surveillante de nuit         (H/F)",
        },
      ]);
      expect(poleEmploiHttpClientService.get).toHaveBeenCalledWith(
        `partenaire/offresdemploi/v2/offres/search?range=0-39&motsCles=boulanger`
      );
    });
  });

  describe("buildParamètresRecherche", () => {
    describe("quand le mot clé existe", () => {
      describe("quand la page vaut 1", () => {
        it("retourne les paramètres de recherche", () => {
          const offreEmploiFiltre = anOffreEmploiFiltre();
          const result =
            apiPoleEmploiOffreRepository.buildParamètresRecherche(
              offreEmploiFiltre
            );

          expect(result).toEqual("range=0-39&motsCles=boulanger");
        });
      });

      describe("quand la page vaut 3", () => {
        it("retourne les paramètres de recherche", () => {
          const offreEmploiFiltre = anOffreEmploiFiltre({ page: 3 });
          const result =
            apiPoleEmploiOffreRepository.buildParamètresRecherche(
              offreEmploiFiltre
            );

          expect(result).toEqual("range=80-119&motsCles=boulanger");
        });
      });
    });

    describe("quand le mot clé est absent", () => {
      it("retourne des paramètres de recherche avec motsCles à vide", () => {
        const offreEmploiFiltre = anOffreEmploiFiltre({ motClé: undefined });
        const result =
          apiPoleEmploiOffreRepository.buildParamètresRecherche(
            offreEmploiFiltre
          );

        expect(result).toEqual("range=0-39&motsCles=");
      });
    });
  });
});
