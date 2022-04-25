import { OffreEmploiRepository } from "~/server/offresEmploi/domain/offreEmploi.repository";
import { ListeOffreEmploiUseCase } from "~/server/offresEmploi/useCases/listeOffreEmploi.useCase";

describe("ListeOffreEmploi", () => {
  let emploiRepository: OffreEmploiRepository;

  beforeEach(() => {
    emploiRepository = {
      getOffreEmploiList: jest.fn(),
    };
  });

  it("retourne la liste des offres d emploi", async () => {
    const listeOffreEmploi = new ListeOffreEmploiUseCase(emploiRepository);
    jest.spyOn(emploiRepository, "getOffreEmploiList").mockResolvedValue([
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
