import { AlternanceRepository } from "~/server/alternances/domain/alternance.repository";
import { ListeMetierRechercheUseCase } from "~/server/alternances/useCases/listeMetierRecherche.useCase";

describe("ListeMetierRecherche", () => {
  let alternanceRepository: AlternanceRepository;

  beforeEach(() => {
    alternanceRepository = {
      getMétierRecherchéList: jest.fn(),
    };
  });

  it("retourne la liste des offres d emploi", async () => {
    const listeJobEtudiant = new ListeMetierRechercheUseCase(
      alternanceRepository
    );
    jest
      .spyOn(alternanceRepository, "getMétierRecherchéList")
      .mockResolvedValue([
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
