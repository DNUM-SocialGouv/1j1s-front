/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  FormulaireDeContactMissionLocale,
} from '~/client/components/features/Accompagnement/FormulaireDeContactMissionLocale/FormulaireDeContactMissionLocale';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { LocalisationService } from '~/client/services/localisation/localisation.service';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';

describe('FormulaireDeContactMissionLocale', () => {
  let localisationService: LocalisationService;
  let setIsSuccess: (value: boolean) => void;
  beforeEach(() => {
    mockSmallScreen();
    localisationService = aLocalisationService();
    setIsSuccess = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });


  function renderComponent() {
    render(
      <DependenciesProvider localisationService={localisationService}>
        <FormulaireDeContactMissionLocale setIsSuccess={setIsSuccess}/>
      </DependenciesProvider>,
    );
  }

  it('a un champ Adresse e-mail faculatif', async () => {
    const label = 'Adresse e-mail (facultatif)';
    // Given
    renderComponent();

    //When
    await userEvent.type(screen.getByLabelText(label), 's{backspace}');

    // Then
    expect(screen.getByLabelText(label)).toBeValid();
  });

  it('a un champ Commentaire faculatif', async () => {
    const label = 'Vous avez la possibilité de nous faire part de vos commentaires ou toute autres informations que vous jugeriez utiles (facultatif)';
    // Given
    renderComponent();

    //When
    await userEvent.type(screen.getByLabelText(label), 's{backspace}');

    // Then
    expect(screen.getByLabelText(label)).toBeValid();
  });

  it('a un champ Age obligatoire', async () => {
    // Given
    renderComponent();
    // When
    await userEvent.click(screen.getByLabelText('Age'));
    await userEvent.click(screen.getByLabelText('Nom'));
    // When
    const input = await screen.findByTestId('Select-InputHidden');

    // Then
    expect(input).toBeInvalid();
  });
});
