/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RefObject } from 'react';

import Bouée from '~/client/components/ui/Bouée/Bouée';

describe('<Bouée />', () => {
  beforeEach(() => userEvent.setup());
  afterEach(() => {
    jest.resetAllMocks();
  });

  const DEBOUNCE_DELAY = 50;

  describe('quand l\'élément étalon est visible', () => {
    it('affiche un bouton qui reste invisible', () => {
      // Given
      const surface = {
        getBoundingClientRect: jest.fn(() => ({ y: 20 })),
      };
      const surfaceRef: RefObject = { current: surface };
      // When
      render(<Bouée surface={ surfaceRef }/>);
      // Then
      const button = screen.getByRole('button', { description: 'remonter en haut de la page', hidden: true });
      expect(button).not.toBeVisible();
    });
    describe('mais qu\'on scroll vers le bas', () => {
      it('affiche le bouton', async () => {
        // Given
        let y = 20;
        const surface = {
          getBoundingClientRect: jest.fn(() => ({ y: y })),
        };
        const surfaceRef: RefObject = { current: surface };
        // When
        render(<Bouée surface={ surfaceRef }/>);
        y = -100;
        await act(async () => {
          window.scrollTo(200);
          await delay(DEBOUNCE_DELAY);
        });
        // Then
        const button = screen.getByRole('button', { description: 'remonter en haut de la page', hidden: false });
        expect(button).toBeVisible();
      });
      describe('et qu\'on clique sur le bouton', () => {
        it('scrolle jusqu\'à l\'élément étalon', async () => {
          // Given
          let y = 20;
          const surface = {
            getBoundingClientRect: jest.fn(() => ({ y: y })),
            scrollIntoView: jest.fn(),
          };
          const surfaceRef: RefObject = { current: surface };
          // When
          render(<Bouée surface={ surfaceRef }/>);
          y = -100;
          await act(async () => {
            window.scrollTo(200);
            await delay(DEBOUNCE_DELAY);
          });
          const button = screen.getByRole('button', { description: 'remonter en haut de la page' });
          await userEvent.click(button);
          // Then
          expect(surface.scrollIntoView).toHaveBeenCalled();
        });
      });
    });
  });
  describe('quand l\'élement étalon n\'est plus visible', () => {
    it('affiche un bouton visible', async () => {
      // Given
      const surface = {
        getBoundingClientRect: jest.fn(() => ({ y: -100 })),
      };
      const surfaceRef: RefObject = { current: surface };
      // When
      render(<Bouée surface={ surfaceRef }/>);
      await act(() => delay(DEBOUNCE_DELAY));
      // Then
      const button = screen.getByRole('button', { description: 'remonter en haut de la page', hidden: false });
      expect(button).toBeVisible();
    });
  });
});


function delay (ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
