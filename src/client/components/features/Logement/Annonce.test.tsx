/**
 * @jest-environment jsdom
 */

import {
	render,
	screen,
} from '@testing-library/react';

import { AnnonceDeLogement } from '~/client/components/features/Logement/Annonce';
import { AnnonceDeLogementIndexee } from '~/server/cms/domain/annonceDeLogement.type';


const anAnnonceDeLogement = (override?: Partial<AnnonceDeLogementIndexee>): AnnonceDeLogementIndexee => {
	return {
		dateDeDisponibilite: '2023-01-01',
		dateDeMiseAJour: '2022-12-04',
		devise: '€',
		imagesUrl: ['/image-0.jpg', '/image-1.jpg', '/image-2.jpg'],
		localisationAAfficher: 'Paris',
		prix: 1200,
		prixHT: 1000,
		slug: 'un-slug-appart-a-louer',
		surfaceAAfficher: 'de 70 à 71m2',
		titre: 'Appartement à louer',
		type: 'appartement',
		typeBien: 'T1',
		url: 'https://www.immo.com',
		...override,
	};
};

const mockDate = jest.spyOn(Date.prototype, 'toLocaleDateString').mockReturnValue('12/4/2022');

describe('Annonce Component', () => {
	afterAll(() => {
		mockDate.mockRestore();
	});

	describe('quand il n‘y a pas d‘image', () => {
		it('contient une image par défaut', () => {
			render(
				<AnnonceDeLogement
					hit={anAnnonceDeLogement({ imagesUrl: [] })}
					sendEvent={jest.fn()}
				/>,
			);
			const image: HTMLImageElement = screen.getByRole('img');
			expect(image.src).toContain('%2Fimages%2Fdefaut-logement.webp'); // %2F => /
		});
	});

	describe("quand il n'y a qu‘une image", () => {
		it('contient l‘image', () => {
			render(
				<AnnonceDeLogement
					hit={anAnnonceDeLogement({ imagesUrl: ['/image-0.jpg'] })}
					sendEvent={jest.fn()}
				/>,
			);
			const image: HTMLImageElement = screen.getByRole('img');
			expect(image.src).toContain('image-0.jpg');
		});
	});

	describe('quand il y a plusieurs images', () => {
		it('contient un carousel d‘images', () => {
			render(
				<AnnonceDeLogement
					hit={anAnnonceDeLogement()}
					sendEvent={jest.fn()}
				/>,
			);
			const listDesSlides = screen.getByRole('list', { hidden: true, name: 'liste des photos du logement' });
			expect(listDesSlides).toBeInTheDocument();
		});
	});


	describe('type de logement', () => {
		describe('quand le type de logement est habitation intergénérationnelle', () => {
			it('contient le type de logement intérgénérationnel', () => {
				render(
					<AnnonceDeLogement
						hit={anAnnonceDeLogement({ type: 'habitation intergénérationnelle' })}
						sendEvent={jest.fn()}
					/>,
				);
				const type = screen.getByText(/intergénérationnel/i);
				expect(type).toBeVisible();
			});
		});

		describe('quand le type de logement est autre', () => {
			it('contient le type de logement', () => {
				render(
					<AnnonceDeLogement
						hit={anAnnonceDeLogement()}
						sendEvent={jest.fn()}
					/>,
				);
				const appartement = 'appartement';
				const type = screen.getByText(appartement);
				expect(type).toBeInTheDocument();
			});
		});
	});

	it('contient la date de mise à jours', () => {
		render(
			<AnnonceDeLogement
				hit={anAnnonceDeLogement()}
				sendEvent={jest.fn()}
			/>,
		);
		const dateDePublication = 'postée le 12/4/2022';
		const date = screen.getByText(dateDePublication);
		expect(date).toBeInTheDocument();
	});

	it('contient le titre de l‘annonce', () => {
		render(
			<AnnonceDeLogement
				hit={anAnnonceDeLogement()}
				sendEvent={jest.fn()}
			/>,
		);
		const titre = screen.getByRole('heading', { level: 3 });
		expect(titre).toBeInTheDocument();
	});

	it('contient la surface et le prix', () => {
		render(
			<AnnonceDeLogement
				hit={anAnnonceDeLogement()}
				sendEvent={jest.fn()}
			/>,
		);
		const intervalleSurface = 'de 70 à 71m2';
		const surface = screen.getByText(intervalleSurface);
		expect(surface).toBeInTheDocument();

		const loyer = '1200 €';
		const prix = screen.getByText(loyer);
		expect(prix).toBeInTheDocument();
	});

	it('contient la localisation', () => {
		render(
			<AnnonceDeLogement
				hit={anAnnonceDeLogement()}
				sendEvent={jest.fn()}
			/>,
		);
		const ville = 'Paris';
		const localisation = screen.getByText(ville);
		expect(localisation).toBeInTheDocument();
	});

	it('contient le lien externe de l‘annonce', () => {
		render(
			<AnnonceDeLogement
				hit={anAnnonceDeLogement()}
				sendEvent={jest.fn()}
			/>,
		);
		const url = screen.getByRole('link');
		expect(url).toBeInTheDocument();
		expect(url).toHaveAttribute('href', '/logements/annonces/un-slug-appart-a-louer');
	});
});
