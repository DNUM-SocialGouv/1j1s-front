import axios from "axios";
import { DateTime } from "luxon";

import { ApiPoleEmploiTokenRepository } from "../../../../../src/server/tokens/infra/ApiPoleEmploiTokenRepository";
import { ConfigurationService } from "../../../../../src/server/services/ConfigurationService";
import { DateService } from "../../../../../src/server/services/date/DateService";
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

describe("ApiPoleEmploiTokenRepository", () => {
  describe("getToken", () => {
    let dateService: DateService;
    let configurationService: ConfigurationService;
    let httpClientService: ClientService;

    const axiosInstance = anAxiosInstance();

    beforeEach(() => {
      jest.mocked(axios.create).mockReturnValue(axiosInstance);

      dateService = {
        now: jest.fn(),
        nowInFuture: jest.fn(),
      };
      httpClientService = {
        client: axiosInstance,
        get: jest.fn(),
        post: jest.fn(),
      };
      configurationService = {
        getConfiguration: jest.fn(),
      };

      jest.spyOn(configurationService, "getConfiguration").mockReturnValue({
        API_POLE_EMPLOI_CLIENT_ID: "fake_client_id",
        API_POLE_EMPLOI_CLIENT_SECRET: "fake_client_secret",
        API_POLE_EMPLOI_SCOPE: "fake_scope",
      });
    });

    it("si le token n existe pas ou a expiré on retourne un token depuis l server pole emploi", async () => {
      const apiPoleEmploiTokenRepository = new ApiPoleEmploiTokenRepository(
        dateService,
        configurationService,
        httpClientService
      );
      jest
        .spyOn(dateService, "now")
        .mockReturnValue(DateTime.fromISO("2022-04-01T12:00:00.000Z").toUTC());
      jest
        .spyOn(dateService, "nowInFuture")
        .mockReturnValue(DateTime.fromISO("2022-04-01T12:24:59.000Z").toUTC());

      jest.spyOn(httpClientService, "post").mockResolvedValue(
        anAxiosResponse({
          access_token: "fake_token",
          expire_in: 1499,
        })
      );

      const result = await apiPoleEmploiTokenRepository.getToken();

      expect("fake_token").toEqual(result);
    });

    it("si le token n existe pas ou a expiré on retourne le token du store", async () => {
      const apiPoleEmploiTokenRepository = new ApiPoleEmploiTokenRepository(
        dateService,
        configurationService,
        httpClientService
      );
      jest
        .spyOn(dateService, "now")
        .mockReturnValue(DateTime.fromISO("2022-04-01T12:00:00.000Z").toUTC());
      jest
        .spyOn(dateService, "nowInFuture")
        .mockReturnValue(DateTime.fromISO("2022-04-01T12:24:59.000Z").toUTC());

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
