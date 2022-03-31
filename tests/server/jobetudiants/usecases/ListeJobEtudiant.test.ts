import { JobEtudiantRepository } from "../../../../src/server/jobetudiants/domain/JobEtudiantRepository";
import { ListeJobEtudiant } from "../../../../src/server/jobetudiants/usecases/ListeJobEtudiant";

describe("ListeJobEtudiant", () => {
  let emploiRepository: JobEtudiantRepository;

  beforeEach(() => {
    emploiRepository = {
      listeJobEtudiant: jest.fn(),
    };
  });

  it("retourne la liste des offres d emploi", async () => {
    const listeJobEtudiant = new ListeJobEtudiant(emploiRepository);
    jest.spyOn(emploiRepository, "listeJobEtudiant").mockResolvedValue([
      { id: "130WPHH", intitule: "Gestionnaire ADV    (H/F)" },
      { id: "130WPHC", intitule: "Maçon / Maçonne" },
      {
        id: "130WPHB",
        intitule: "Surveillant / Surveillante de nuit         (H/F)",
      },
    ]);

    const result = await listeJobEtudiant.handle();

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
