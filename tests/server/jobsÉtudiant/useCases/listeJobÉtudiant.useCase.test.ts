import { aJobÉtudiantList } from '@tests/fixtures/domain/jobÉtudiant.fixture';

import { JobÉtudiantRepository } from '~/server/jobsÉtudiant/domain/jobÉtudiant.repository';
import { ListeJobÉtudiantUseCase } from '~/server/jobsÉtudiant/useCases/listeJobÉtudiant.useCase';

describe('ListeJobÉtudiant', () => {
  let emploiRepository: JobÉtudiantRepository;

  beforeEach(() => {
    emploiRepository = {
      getJobÉtudiantList: jest.fn(),
    };
  });

  it('retourne la liste des offres d\'emploi', async () => {
    const listeJobÉtudiant = new ListeJobÉtudiantUseCase(emploiRepository);
    jest.spyOn(emploiRepository, 'getJobÉtudiantList').mockResolvedValue(aJobÉtudiantList());

    const result = await listeJobÉtudiant.handle();

    expect([
      { id: '130WZJJ', intitule: 'Hote/Hotesse de Caisse (H/F)' },
      { id: '130WZJD', intitule: 'ou Accompagnant(e) éducatif(ve) et social(e) (H/F)' },
      { id: '130WZHH', intitule: 'Auxiliaire de vie            (H/F)' },
    ]).toEqual(result);
  });
});
