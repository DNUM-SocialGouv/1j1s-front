import { OffreEmploiRepository } from "../../../../src/server/offreemplois/domain/OffreEmploiRepository";
import { ListeOffreEmploi } from "../../../../src/server/offreemplois/usecases/ListeOffreEmploi";

describe("ListeOffreEmploi", () => {
  let emploiRepository: OffreEmploiRepository;

  beforeEach(() => {
    emploiRepository = {
      listeOffreEmploi: jest.fn(),
    };
  });

  it("retourne la liste des offres d emploi", async () => {
    const listeOffreEmploi = new ListeOffreEmploi(emploiRepository);
    jest.spyOn(emploiRepository, "listeOffreEmploi").mockResolvedValue([
      { id: "130WPHH", intitule: "Gestionnaire ADV    (H/F)" },
      { id: "130WPHC", intitule: "Maçon / Maçonne" },
      {
        id: "130WPHB",
        intitule: "Surveillant / Surveillante de nuit         (H/F)",
      },
    ]);

    const result = await listeOffreEmploi.handle();

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
