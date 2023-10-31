/**
 * @jest-environment jsdom
 */

import {
	render,
	screen,
	within,
} from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { Carousel } from '~/client/components/ui/Carousel/Carousel';

const imageList = [
	{
		alt: undefined,
		src: '/image1.jpg',
	},
	{
		alt: undefined,
		src: '/image2.jpg',
	},
	{
		alt: undefined,
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
		it('fournit l’alternative "1 sur 1" quand il n’y a pas d’alternative', () => {
			render(<Carousel imageList={[{
				alt: undefined,
				src: '/une-seule-image.webp',
			}]} imageListLabel="liste des photos" imagesSize={{ height: 200, width: 400 }} />);

			expect(screen.getByRole('img', { name: '1 sur 1' })).toBeVisible();
		});
		it('fournit l’alternative "1 sur 1" quand il y a une alternative vide', () => {
			render(<Carousel imageList={[{
				alt: '',
				src: '/une-seule-image.webp',
			}]} imageListLabel="liste des photos" imagesSize={{ height: 200, width: 400 }} />);

			expect(screen.getByRole('img', { name: '1 sur 1' })).toBeVisible();
		});
	});

	it('retourne une liste d‘images avec seulement la première image visible et courante',  () => {
		render(<Carousel imageList={imageList} imageListLabel="liste des photos" imagesSize={{ height: 200, width: 400 }} />);

		const listDeSlides = screen.getByRole('list', { name: 'liste des photos' });
		expect(listDeSlides).toBeVisible();

		const listDeSlidesItem = within(listDeSlides).getAllByRole('group', { hidden: true });

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

	it('retourne une liste d’images avec une alternative au format "N sur index" quand il n’y a pas d’alternative', () => {
		render(<Carousel imageList={imageList} imageListLabel="liste des photos" imagesSize={{ height: 200, width: 400 }} />);

		expect(screen.getByRole('img', { hidden: true, name: '1 sur 3' })).toBeVisible();
		expect(screen.getByRole('img', { hidden: true, name: '2 sur 3' })).toBeVisible();
		expect(screen.getByRole('img', { hidden: true, name: '3 sur 3' })).toBeVisible();
	});

	it('retourne une liste d’images avec une alternative au format "N sur index" quand il y a une alternative vide', () => {
		render(<Carousel imageList={[
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
		]} imageListLabel="liste des photos" imagesSize={{ height: 200, width: 400 }} />);

		expect(screen.getByRole('img', { hidden: true, name: '1 sur 3' })).toBeVisible();
		expect(screen.getByRole('img', { hidden: true, name: '2 sur 3' })).toBeVisible();
		expect(screen.getByRole('img', { hidden: true, name: '3 sur 3' })).toBeVisible();
	});

	it('retourne deux boutons de contrôle', () => {
		render(<Carousel imageList={imageList} imageListLabel="liste des photos" imagesSize={{ height: 200, width: 400 }} />);

		const listeDeContrôles = screen.getByRole('list', { name: 'contrôles' });
		const boutonPrécédent = within(listeDeContrôles).getByRole('button', { name: 'image précédente' });
		const boutonSuivant = within(listeDeContrôles).getByRole('button', { name: 'image suivante' });

		expect(boutonPrécédent).toBeVisible();
		expect(boutonSuivant).toBeVisible();
	});

	describe('Liste des indicateurs', () => {
		it('contient une liste de boutons indicateurs', () => {
			render(<Carousel imageList={imageList} imageListLabel="liste des photos" imagesSize={{ height: 200, width: 400 }} />);

			const listeDIndicateurs = screen.getByRole('group', { name: 'Sélectionner l’image à afficher' });
			expect(listeDIndicateurs).toBeVisible();
		});

		describe('quand la propriété hideIndicators est à true', () => {
			it('n‘affiche pas les indicateurs', () => {
				render(<Carousel imageList={imageList} hideIndicators imageListLabel="liste des photos" imagesSize={{ height: 200, width: 400 }} />);

				const listeDIndicateurs = screen.queryByRole('list', { name: 'Sélectionner l’image à afficher' });
				expect(listeDIndicateurs).not.toBeInTheDocument();
			});
		});

		it('le nom accessible des indicateurs corresponds au nom accessible des slides correspondantes', async () => {
			const firstSlideAccessibleName = 'Image 1 sur 3';
			const secondSlideAccessibleName = 'Image 2 sur 3';
			const thirdSlideAccessibleName = 'Image 3 sur 3';

			render(<Carousel imageList={imageList} imageListLabel="liste des photos" imagesSize={{ height: 200, width: 400 }} />);

			const listeDIndicateurs = screen.getByRole('group', { name: 'Sélectionner l’image à afficher' });
			const boutonIndicateurs = within(listeDIndicateurs).getAllByRole('button');

			const listeDeSlides = screen.getByRole('list', { name: 'liste des photos' });
			const slides = within(listeDeSlides).getAllByRole('group', { hidden: true });

			expect(boutonIndicateurs[0]).toHaveAccessibleName(firstSlideAccessibleName);
			expect(boutonIndicateurs[1]).toHaveAccessibleName(secondSlideAccessibleName);
			expect(boutonIndicateurs[2]).toHaveAccessibleName(thirdSlideAccessibleName);

			expect(slides[0]).toHaveAccessibleName(firstSlideAccessibleName);

			await userEvent.click(boutonIndicateurs[1]);

			expect(slides[1]).toHaveAccessibleName(secondSlideAccessibleName);

			await userEvent.click(boutonIndicateurs[2]);

			expect(slides[2]).toHaveAccessibleName(thirdSlideAccessibleName);
		});
	});

	describe('Live Region', () => {
		it('le carousel a la propriété aria-live="polite" et aria-atomic="false"', () => {
			render(<Carousel imageList={imageList} imageListLabel="liste des photos" imagesSize={{ height: 200, width: 400 }} />);
			const slideContainer = screen.getByRole('list', { name: 'liste des photos' });
			expect(slideContainer).toHaveAttribute('aria-live', 'polite');
			expect(slideContainer).toHaveAttribute('aria-atomic', 'false');
		});
	});
});
