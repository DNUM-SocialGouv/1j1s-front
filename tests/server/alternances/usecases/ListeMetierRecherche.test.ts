import { AlternanceRepository } from "../../../../src/server/alternances/domain/AlternanceRepository";
import { ListeMetierRecherche } from "../../../../src/server/alternances/usecases/ListeMetierRecherche";

describe("ListeMetierRecherche", () => {
  let alternanceRepository: AlternanceRepository;

  beforeEach(() => {
    alternanceRepository = {
      listeMetierRecherche: jest.fn(),
    };
  });

  it("retourne la liste des offres d emploi", async () => {
    const listeJobEtudiant = new ListeMetierRecherche(alternanceRepository);
    jest.spyOn(alternanceRepository, "listeMetierRecherche").mockResolvedValue([
      {
        intitule: "Boucherie, charcuterie, traiteur",
        repertoireOperationnelMetiersEmplois: ["D1103", "D1101", "H2101"],
      },
      {
        intitule: "Boulangerie, pâtisserie, chocolaterie",
        repertoireOperationnelMetiersEmplois: ["D1102", "D1104"],
      },
    ]);

    const result = await listeJobEtudiant.handle("bou");

    expect([
      {
        intitule: "Boucherie, charcuterie, traiteur",
        repertoireOperationnelMetiersEmplois: ["D1103", "D1101", "H2101"],
      },
      {
        intitule: "Boulangerie, pâtisserie, chocolaterie",
        repertoireOperationnelMetiersEmplois: ["D1102", "D1104"],
      },
    ]).toEqual(result);
  });
});
