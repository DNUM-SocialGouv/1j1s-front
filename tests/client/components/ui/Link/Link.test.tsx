/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { mockUseRouter } from '@tests/client/useRouter.mock';

import { Link } from '~/client/components/ui/Link/Link';

describe('Link', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('quand le lien est un lien externe', () => {
    it('retourne le composant Link avec un *tag a* directement et les propriétés target et rel', () => {
      const lienExterne = 'https://mon-lien-externe';
      mockUseRouter({});

      render(
        <Link href={lienExterne} />,
      );

      const linkComponent = screen.getByRole('link');

      expect(linkComponent.getAttribute('href')).toEqual('https://mon-lien-externe');
      expect(linkComponent).toHaveAttribute('target');
      expect(linkComponent).toHaveAttribute('rel');
    });
  });

  describe('quand le lien est un lien interne', () => {
    it('retourne le composant Link avec sans les propriétés de la redirection externe', () => {
      const lienInterne = '/emplois';
      mockUseRouter({ query: { motCle: 'boulanger', page : '1' }, route: '/emplois' });

      render(
        <Link href={lienInterne} />,
      );

      const linkComponent = screen.getByRole('link');

      expect(linkComponent.getAttribute('href')).toEqual('/emplois');
      expect(linkComponent).not.toHaveAttribute('target');
      expect(linkComponent).not.toHaveAttribute('rel');
    });
  });
});
