/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { mockUseRouter } from '@tests/client/useRouter.mock';

import { Footer } from '~/client/components/layouts/Footer/Footer';

describe('Footer', () => {
  it('renders Footer component', () => {
    mockUseRouter({});
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');

    expect(footer).toBeInTheDocument();
  });
});
