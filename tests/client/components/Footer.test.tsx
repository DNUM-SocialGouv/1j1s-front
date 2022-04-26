/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { Footer } from '~/client/components/Footer';

describe('Footer', () => {
  it('renders Footer component', () => {
    render(<Footer />);

    const footer = screen.getByTestId('footer');

    expect(footer).toBeInTheDocument();
  });
});
