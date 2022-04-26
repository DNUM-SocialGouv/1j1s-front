import { aJobEtudiantList } from '@tests/fixtures/domain/jobEtudiant.fixture';

import { JobEtudiantRepository } from '~/server/jobsEtudiant/domain/jobEtudiant.repository';
import { ListeJobEtudiantUseCase } from '~/server/jobsEtudiant/useCases/listeJobEtudiant.useCase';

describe('ListeJobEtudiant', () => {
  let emploiRepository: JobEtudiantRepository;

  beforeEach(() => {
    emploiRepository = {
      getJobEtudiantList: jest.fn(),
    };
  });

  it('retourne la liste des offres d\'emploi', async () => {
    const listeJobEtudiant = new ListeJobEtudiantUseCase(emploiRepository);
    jest.spyOn(emploiRepository, 'getJobEtudiantList').mockResolvedValue(aJobEtudiantList());

    const result = await listeJobEtudiant.handle();

    expect([
      { id: '130WZJJ', intitule: 'Hote/Hotesse de Caisse (H/F)' },
      { id: '130WZJD', intitule: 'ou Accompagnant(e) éducatif(ve) et social(e) (H/F)' },
      { id: '130WZHH', intitule: 'Auxiliaire de vie            (H/F)' },
    ]).toEqual(result);
  });
});
