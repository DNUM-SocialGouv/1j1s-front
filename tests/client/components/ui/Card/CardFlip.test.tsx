/**
 * @jest-environment jsdom
 */

import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockUseRouter } from '@tests/client/useRouter.mock';

import { CardFlip } from '~/client/components/ui/Card/CardFlip';

describe('<CardFlip>', () => {
  beforeEach(() => mockUseRouter({}));
  it('utilise le formalisme markdown pour qui est concerné', async () => {
    // Given
    const pourQui = 'ceci est le texte de **pour qui**';
    const user = userEvent.setup();
    // When
    render(<CardFlip link="/coucou" title="test" imageUrl="/test.img" flipCardContent={ pourQui } />);

    const button = screen.getByRole('button', { name: 'Qui est concerné ?' });
    user.click(button);

    // Then
    await waitFor(async () => {
      expect(screen.getByText('pour qui').tagName).toEqual('STRONG');
    });
  });
});
