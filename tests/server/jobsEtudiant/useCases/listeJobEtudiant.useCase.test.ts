import { JobEtudiantRepository } from "~/server/jobsEtudiant/domain/jobEtudiant.repository";
import { ListeJobEtudiantUseCase } from "~/server/jobsEtudiant/useCases/listeJobEtudiant.useCase";

describe("ListeJobEtudiant", () => {
  let emploiRepository: JobEtudiantRepository;

  beforeEach(() => {
    emploiRepository = {
      getJobEtudiantList: jest.fn(),
    };
  });

  it("retourne la liste des offres d emploi", async () => {
    const listeJobEtudiant = new ListeJobEtudiantUseCase(emploiRepository);
    jest.spyOn(emploiRepository, "getJobEtudiantList").mockResolvedValue([
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
