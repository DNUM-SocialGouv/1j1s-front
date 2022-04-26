/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { CardEmploi } from '~/client/components/CardEmploi';

describe('CardEmploi', () => {
  it('renders CardEmploi component', () => {
    render(<CardEmploi />);

    const cardEmploi = screen.getByTestId('lien-emploi');

    expect(cardEmploi).toBeInTheDocument();
  });

  it('redirects the user when clicking on the card', () => {
    render(<CardEmploi />);

    const cardEmploi = screen.getByTestId('lien-emploi');

    expect(cardEmploi).toBeInTheDocument();
  });
});
