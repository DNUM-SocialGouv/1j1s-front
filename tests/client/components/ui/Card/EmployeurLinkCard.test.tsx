/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { mockUseRouter } from '@tests/client/useRouter.mock';

import { EmployeurLinkCard } from '~/client/components/ui/Card/EmployeurLinkCard';

describe('<EmployeurLinkCard>', () => {
  beforeEach(() => mockUseRouter({}));
  it('utilise le formalisme markdown pour qui est concerné', () => {
    // Given
    const pourQui = 'ceci est le texte de **pour qui**';
    // When
    render(<EmployeurLinkCard link="/coucou" title="test" src="test.img" pourQui={ pourQui } />);
    // Then
    expect(screen.getByText('pour qui').tagName).toEqual('STRONG');
  });
});
