import { ApiGeoLocalisationRepository } from "../../../../../src/server/localisations/infra/repositories/apiGeoLocalisation.repository";
import { ApiAdresseHttpClientService } from "../../../../../src/server/services/http/apiAdresseHttpClient.service";
import { ApiGeoHttpClientService } from "../../../../../src/server/services/http/apiGeoHttpClient.service";
import { aApiAdresseHttpClientService } from "../../../../fixtures/apiAdresseHttpClientService.fixture";
import { aApiGeoHttpClientService } from "../../../../fixtures/apiGeoHttpClientService.fixture";
import { anAxiosResponse } from "../../../../fixtures/httpClientService.fixture";

describe("ApiGeoLocalisationRepository", () => {
  describe("listeAdresse", () => {
    let apiGeoLocalisationRepository: ApiGeoLocalisationRepository;

    let apiGeoHttpClientService: ApiGeoHttpClientService;
    let apiAdresseHttpClientService: ApiAdresseHttpClientService;

    beforeEach(() => {
      apiGeoHttpClientService = aApiGeoHttpClientService();
      apiAdresseHttpClientService = aApiAdresseHttpClientService();

      apiGeoLocalisationRepository = new ApiGeoLocalisationRepository(
        apiGeoHttpClientService,
        apiAdresseHttpClientService
      );
    });

    it("retourne la liste des adresses trouvées par l'api geo gouv", async () => {
      jest.spyOn(apiAdresseHttpClientService, "get").mockResolvedValue(
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
        {
          codeInsee: "93005",
          libelle: "20 Avenue Jules Jouy 93600 Aulnay-sous-Bois",
          ville: "Aulnay-sous-Bois",
        },
        {
          codeInsee: "28201",
          libelle: "20 Avenue de la Gare 28300 Jouy",
          ville: "Jouy",
        },
      ]).toEqual(result);
    });

    it("retourne la liste des communes trouvées par l'api decoupage administratif", async () => {
      jest.spyOn(apiGeoHttpClientService, "get").mockResolvedValue(
        anAxiosResponse([
          {
            _score: 0.5387275638398817,
            code: "36048",
            codeDepartement: "36",
            codeRegion: "24",
            codesPostaux: ["36200"],
            nom: "Chavin",
            population: 271,
          },
          {
            _score: 0.5387275638398817,
            code: "92022",
            codeDepartement: "92",
            codeRegion: "11",
            codesPostaux: ["92370"],
            nom: "Chaville",
            population: 20771,
          },
        ])
      );

      const result = await apiGeoLocalisationRepository.listeCommune("jou");

      expect([
        {
          codeInsee: "36048",
          libelle: "Chavin",
        },
        {
          codeInsee: "92022",
          libelle: "Chaville",
        },
      ]).toEqual(result);
    });

    it("retourne la liste des departements trouvées par l'api decoupage administratif", async () => {
      jest.spyOn(apiGeoHttpClientService, "get").mockResolvedValue(
        anAxiosResponse([
          {
            _score: 1,
            code: "78",
            codeRegion: "11",
            nom: "Yvelines",
          },
        ])
      );

      const result = await apiGeoLocalisationRepository.listeDepartement("jou");

      expect([
        {
          codeInsee: "78",
          libelle: "Yvelines",
        },
      ]).toEqual(result);
    });

    it("retourne la liste des regions trouvées par l'api decoupage administratif", async () => {
      jest.spyOn(apiGeoHttpClientService, "get").mockResolvedValue(
        anAxiosResponse([
          {
            _score: 0.6917635957182404,
            code: "32",
            nom: "Hauts-de-France",
          },
        ])
      );

      const result = await apiGeoLocalisationRepository.listeRegion("jou");

      expect([
        {
          codeInsee: "32",
          libelle: "Hauts-de-France",
        },
      ]).toEqual(result);
    });
  });
});
