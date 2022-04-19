import { JavascriptDateService } from "../../../src/server/services/date/JavascriptDateService";

describe("isDateInPast", () => {
  it("si maintenant est supérieur à la date passée cela retourne false", () => {
    const service = new JavascriptDateService();

    const result = service.isDateInPast(1499);

    expect(result).toEqual(false);
  });

  it("si maintenant est inférieur à la date passée cela retourne true", () => {
    const service = new JavascriptDateService();

    // ça pètera dans 3159 ans 325 jours et 15 heures environ
    const result = service.isDateInPast(99650360377446);

    expect(result).toEqual(true);
  });
});
