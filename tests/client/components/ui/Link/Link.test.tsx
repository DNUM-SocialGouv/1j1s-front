/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { Link } from '~/client/components/ui/Link/Link';

describe('Link', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('quand le lien est un lien externe', () => {
    it('retourne le composant Link avec un *tag a* directement et les propriétés target et rel', () => {
      const lienExterne = 'https://mon-lien-externe';
      render(
        <Link link={lienExterne} />,
      );

      const linkComponent = screen.getByRole('link');

      expect(linkComponent).toHaveAttribute('target', '_blank');
      expect(linkComponent).toHaveAttribute('rel', 'noreferrer');
    });
  });

  describe('quand le lien est un lien interne', () => {
    it('retourne le composant Link avec sans les propriétés de la redirection externe', () => {
      const lienInterne = '/emplois';
      render(
        <Link link={lienInterne} />,
      );

      const linkComponent = screen.getByRole('link');

      expect(linkComponent).not.toHaveAttribute('target');
      expect(linkComponent).not.toHaveAttribute('rel');
    });
  });
  
});
