import axios from "axios";

import { ConfigurationService } from "../../../../../src/server/services/ConfigurationService";
import { DateService } from "../../../../../src/server/services/date/DateService";
import { ClientService } from "../../../../../src/server/services/http/ClientService";
import { ApiPoleEmploiTokenRepository } from "../../../../../src/server/tokens/infra/ApiPoleEmploiTokenRepository";
import { MockedCacheService } from "../../../../fixtures/CacheService.fixture";
import { configurationServiceFixture } from "../../../../fixtures/ConfigurationService.fixture";
import {
  anAxiosInstance,
  anAxiosResponse,
} from "../../../../fixtures/HttpClientService.fixture";

jest.mock("axios", () => {
  return {
    create: jest.fn(),
  };
});

describe("ApiPoleEmploiTokenRepository", () => {
  describe("getToken", () => {
    let dateService: DateService;
    let configurationService: ConfigurationService;
    let httpClientService: ClientService;

    const axiosInstance = anAxiosInstance();

    beforeEach(() => {
      jest.mocked(axios.create).mockReturnValue(axiosInstance);

      dateService = {
        isDateInPast: jest.fn(),
        now: jest.fn(),
      };
      httpClientService = {
        client: axiosInstance,
        get: jest.fn(),
        post: jest.fn(),
      };
      configurationService = {
        getConfiguration: jest.fn(),
      };

      jest
        .spyOn(configurationService, "getConfiguration")
        .mockReturnValue(configurationServiceFixture);
    });

    it("si le token n'existe pas ou a expiré on retourne un token depuis l'api pole emploi", async () => {
      const apiPoleEmploiTokenRepository = new ApiPoleEmploiTokenRepository(
        dateService,
        configurationService,
        httpClientService,
        new MockedCacheService()
      );
      jest.spyOn(dateService, "now").mockReturnValue(1);

      jest.spyOn(httpClientService, "post").mockResolvedValue(
        anAxiosResponse({
          access_token: "fake_token",
          expire_in: 1499,
        })
      );

      const result = await apiPoleEmploiTokenRepository.getToken();

      expect("fake_token").toEqual(result);
    });

    it("si le token existe on retourne le token depuis le store", async () => {
      const apiPoleEmploiTokenRepository = new ApiPoleEmploiTokenRepository(
        dateService,
        configurationService,
        httpClientService,
        new MockedCacheService()
      );
      jest.spyOn(dateService, "now").mockReturnValue(1);
      jest.spyOn(dateService, "isDateInPast").mockReturnValue(false);

      jest.spyOn(httpClientService, "post").mockResolvedValue(
        anAxiosResponse({
          access_token: "fake_stored_token",
          expire_in: 1499,
        })
      );

      await apiPoleEmploiTokenRepository.getToken();
      const result = await apiPoleEmploiTokenRepository.getToken();

      expect("fake_stored_token").toEqual(result);
    });
  });
});
