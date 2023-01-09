/**
 * @jest-environment jsdom
 */

import {
	render,
	screen,
	within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Carousel } from '~/client/components/ui/Carousel/Carousel';

const imageUrlList = [
	'/image1.jpg',
	'/image2.jpg',
	'/image3.jpg',
];

describe('Carousel', () => {
	it("retourne une liste d'images avec seule la première image visible et courante",  () => {
		render(<Carousel imageUrlList={imageUrlList} />);

		const listDeSlides = screen.getByRole('list', { name: 'liste des photos du logement' });
		expect(listDeSlides).toBeInTheDocument();

		const listDeSlidesItem = within(listDeSlides).getAllByRole('listitem', { hidden: true });

		expect(listDeSlidesItem[0]).toHaveAttribute('aria-hidden', 'false');
		expect(listDeSlidesItem[1]).toHaveAttribute('aria-hidden', 'true');
		expect(listDeSlidesItem[2]).toHaveAttribute('aria-hidden', 'true');

		expect(listDeSlidesItem[0]).toHaveAttribute('aria-current', 'true');
		expect(listDeSlidesItem[1]).toHaveAttribute('aria-current', 'false');
		expect(listDeSlidesItem[2]).toHaveAttribute('aria-current', 'false');
	});

	it('retourne deux boutons de contrôle', () => {
		render(<Carousel imageUrlList={imageUrlList} />);

		const listeDeContrôles = screen.getByRole('list', { name: 'contrôles' });
		const boutonPrécédent = within(listeDeContrôles).getByTitle('image précédente');
		const boutonSuivant = within(listeDeContrôles).getByTitle('image suivante');

		expect(boutonPrécédent).toBeInTheDocument();
		expect(boutonSuivant).toBeInTheDocument();
	});

	describe('Liste des indicateurs', () => {
		it('contient une liste de boutons indicateurs', () => {
			render(<Carousel imageUrlList={imageUrlList} />);

			const listeDIndicateurs = screen.getByRole('list', { name: 'indicateurs' });
			expect(listeDIndicateurs).toBeInTheDocument();
		});

		it('retourne une liste de boutons indicateurs', () => {
			render(<Carousel imageUrlList={imageUrlList} />);

			const listeDIndicateurs = screen.getByRole('list', { name: 'indicateurs' });
			expect(listeDIndicateurs).toBeInTheDocument();
		});
	});

	describe('Live Region', () => {
		it('contient une live region avec un aria live à polite et un aria atomic à true', () => {
			render(<Carousel imageUrlList={imageUrlList} />);

			const liveRegion = screen.getByText('Image 1 sur 3');
			expect(liveRegion).toBeInTheDocument();
			expect(liveRegion).toHaveAttribute('aria-live', 'polite');
			expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
			expect(liveRegion).toHaveTextContent('Image 1 sur 3');
		});

		describe('quand l‘on change d‘image au clic sur le bouton suivant', () => {
			it('contient l‘information sur l‘image courante', async () => {
				const user = userEvent.setup();
				render(<Carousel imageUrlList={imageUrlList} />);

				const liveRegion = screen.getByText('Image 1 sur 3');
				expect(liveRegion).toBeInTheDocument();
				expect(liveRegion).toHaveTextContent('Image 1 sur 3');

				const listeDeContrôles = screen.getByRole('list', { name: 'contrôles' });
				const boutonSuivant = within(listeDeContrôles).getByTitle('image suivante');
				await user.click(boutonSuivant);

				expect(liveRegion).toHaveTextContent('Image 2 sur 3');
			});
		});

		describe('quand l‘on change d‘image au clic sur le bouton précédent', () => {
			it('contient l‘information sur l‘image courante', async () => {
				const user = userEvent.setup();
				render(<Carousel imageUrlList={imageUrlList} />);

				const liveRegion = screen.getByText('Image 1 sur 3');
				expect(liveRegion).toBeInTheDocument();
				expect(liveRegion).toHaveTextContent('Image 1 sur 3');

				const listeDeContrôles = screen.getByRole('list', { name: 'contrôles' });
				const boutonPrécédent = within(listeDeContrôles).getByTitle('image précédente');
				await user.click(boutonPrécédent);

				expect(liveRegion).toHaveTextContent('Image 3 sur 3');
			});
		});
	});

});
