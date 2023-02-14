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

const imageList = [
	{
		alt: '',
		src: '/image1.jpg',
	},
	{
		alt: '',
		src: '/image2.jpg',
	},
	{
		alt: '',
		src: '/image3.jpg',
	},
];

describe('Carousel', () => {
	describe('quand il n‘y a pas d‘image', () => {
		it('retourne rien',  () => {
			render(<Carousel imageList={[]} imageListLabel="liste des photos" imagesSize={{ height: 200, width: 400 }} />);

			const listDeSlides = screen.queryByRole('list', { name: 'liste des photos' });
			expect(listDeSlides).not.toBeInTheDocument();
		});
	});

	describe('quand il n‘y a qu‘une image', () => {
		it('retourne une image et non le carousel',  () => {
			render(<Carousel imageList={[{
				alt: 'une seule image',
				src: '/une-seule-image.webp',
			}]} imageListLabel="liste des photos" imagesSize={{ height: 200, width: 400 }} />);

			const listDeSlides = screen.queryByRole('list', { name: 'liste des photos' });
			expect(listDeSlides).not.toBeInTheDocument();

			const image = screen.getByRole('img', { name: 'une seule image' });
			expect(image).toHaveAttribute('src', expect.stringMatching(/une-seule-image.webp/));
		});
	});

	it('retourne une liste d‘images avec seulement la première image visible et courante',  () => {
		render(<Carousel imageList={imageList} imageListLabel="liste des photos" imagesSize={{ height: 200, width: 400 }} />);

		const listDeSlides = screen.getByRole('list', { name: 'liste des photos' });
		expect(listDeSlides).toBeInTheDocument();

		const listDeSlidesItem = within(listDeSlides).getAllByRole('listitem', { hidden: true });

		expect(listDeSlidesItem[0]).toHaveAttribute('aria-hidden', 'false');
		expect(listDeSlidesItem[1]).toHaveAttribute('aria-hidden', 'true');
		expect(listDeSlidesItem[2]).toHaveAttribute('aria-hidden', 'true');

		expect(listDeSlidesItem[0]).toHaveAttribute('aria-current', 'true');
		expect(listDeSlidesItem[1]).toHaveAttribute('aria-current', 'false');
		expect(listDeSlidesItem[2]).toHaveAttribute('aria-current', 'false');

		const image: HTMLImageElement = screen.getByRole('img');
		expect(image.width).toEqual(400);
		expect(image.height).toEqual(200);
	});

	it('retourne deux boutons de contrôle', () => {
		render(<Carousel imageList={imageList} imageListLabel="liste des photos" imagesSize={{ height: 200, width: 400 }} />);

		const listeDeContrôles = screen.getByRole('list', { name: 'contrôles' });
		const boutonPrécédent = within(listeDeContrôles).getByRole('button', { name: 'image précédente' });
		const boutonSuivant = within(listeDeContrôles).getByRole('button', { name: 'image suivante' });

		expect(boutonPrécédent).toBeInTheDocument();
		expect(boutonSuivant).toBeInTheDocument();
	});

	describe('Liste des indicateurs', () => {
		it('contient une liste de boutons indicateurs', () => {
			render(<Carousel imageList={imageList} imageListLabel="liste des photos" imagesSize={{ height: 200, width: 400 }} />);

			const listeDIndicateurs = screen.getByRole('list', { name: 'indicateurs' });
			expect(listeDIndicateurs).toBeInTheDocument();
		});

		it('retourne une liste de boutons indicateurs', () => {
			render(<Carousel imageList={imageList} imageListLabel="liste des photos" imagesSize={{ height: 200, width: 400 }} />);

			const listeDIndicateurs = screen.getByRole('list', { name: 'indicateurs' });
			expect(listeDIndicateurs).toBeInTheDocument();
		});

		describe('quand la propriété hideIndicators est à true', () => {
			it('n‘affiche pas les indicateurs', () => {
				render(<Carousel imageList={imageList} hideIndicators imageListLabel="liste des photos" imagesSize={{ height: 200, width: 400 }} />);

				const listeDIndicateurs = screen.queryByRole('list', { name: 'indicateurs' });
				expect(listeDIndicateurs).not.toBeInTheDocument();
			});
		});
	});

	describe('Live Region', () => {
		it('contient une live region avec des attributs accessibles', () => {
			render(<Carousel imageList={imageList} imageListLabel="liste des photos" imagesSize={{ height: 200, width: 400 }} />);

			const liveRegion = screen.getByText('Image 1 sur 3');
			expect(liveRegion).toBeInTheDocument();
			expect(liveRegion).toHaveAttribute('aria-live', 'polite');
			expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
		});

		describe('quand l‘on change d‘image au clic sur le bouton suivant', () => {
			it('contient l‘information sur l‘image courante', async () => {
				const user = userEvent.setup();
				render(<Carousel imageList={imageList} imageListLabel="liste des photos" imagesSize={{ height: 200, width: 400 }} />);

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
				render(<Carousel imageList={imageList} imageListLabel="liste des photos" imagesSize={{ height: 200, width: 400 }} />);

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
