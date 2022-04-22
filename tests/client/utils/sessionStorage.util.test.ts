import StorageService from "../../../src/client/utils/sessionStorage.util";

describe("StorageService", () => {
  describe("getItem", () => {
    it("return le session id du session storage", () => {
      StorageService.setItem(StorageService.Key.SESSION_ID, "ma-session-id");
      expect(StorageService.getItem(StorageService.Key.SESSION_ID)).toEqual(
        "ma-session-id"
      );
    });
  });
});
