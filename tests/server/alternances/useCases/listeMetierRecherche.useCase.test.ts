import { aMétierRecherchéList } from '@tests/fixtures/domain/alternance.fixture';

import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';
import { ListeMétierRecherchéUseCase } from '~/server/alternances/useCases/listeMétierRecherché.useCase';

describe('ListeMetierRecherche', () => {
  let alternanceRepository: AlternanceRepository;

  beforeEach(() => {
    alternanceRepository = {
      getMétierRecherchéList: jest.fn(),
    };
  });

  it('retourne la liste des offres d emploi', async () => {
    const listeJobEtudiant = new ListeMétierRecherchéUseCase(
      alternanceRepository,
    );
    jest
      .spyOn(alternanceRepository, 'getMétierRecherchéList')
      .mockResolvedValue(aMétierRecherchéList());

    const result = await listeJobEtudiant.handle('bou');

    expect([
      {
        intitule: 'Boucherie, charcuterie, traiteur',
        répertoireOpérationnelMétiersEmplois: ['D1103', 'D1101', 'H2101'],
      },
      {
        intitule: 'Boulangerie, pâtisserie, chocolaterie',
        répertoireOpérationnelMétiersEmplois: ['D1102', 'D1104'],
      },
    ]).toEqual(result);
  });
});
