/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { ConsulterAnnonce } from '~/client/components/features/Logement/Consulter/ConsulterAnnonce';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { uneAnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.fixture';

describe('<ConsulterAnnonce />', () => {
	beforeEach(() => {
		sessionStorage.setItem('referrer', 'annonces');
		const routerReload = jest.fn();
		mockUseRouter({ reload: routerReload });
	});
	it('affiche le le bouton retour vers la liste des annonces', async () => {
		const annonceDeLogement = uneAnnonceDeLogement();
		annonceDeLogement.titre = 'Super T3 dans le centre de Paris';

		await render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
		const boutonRetour = screen.getByRole('button', { name: 'Retour vers la page annonces' });
		expect(boutonRetour).toBeInTheDocument();

	});
	it("affiche le titre de l'annonce", async () => {
		const annonceDeLogement = uneAnnonceDeLogement();
		annonceDeLogement.titre = 'Super T3 dans le centre de Paris';

		render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
		const titre = screen.getByRole('heading', {
			level: 1,
		});

		expect(titre).toBeVisible();
		expect(titre).toHaveTextContent('Super T3 dans le centre de Paris');
	});
	it('affiche le type de logement', () => {
		const annonceDeLogement = uneAnnonceDeLogement();
		annonceDeLogement.type = 'Location';
		annonceDeLogement.typeBien = 'Appartement';

		render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
		const type = screen.getByText(/Location - Appartement/i);

		expect(type).toBeVisible();
	});
	it('affiche la date de mise à jour au bon format', () => {
		const annonceDeLogement = uneAnnonceDeLogement();
		annonceDeLogement.dateDeMiseAJour = new Date(2020, 1, 1).toISOString();

		render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
		const date = screen.getByText(/Annonce mise à jour le/i);

		expect(date).toBeVisible();
		expect(date).toHaveTextContent(/Annonce mise à jour le 01.02.2020/i);
	});
	describe('carousel', () => {
		let annonceDeLogement = uneAnnonceDeLogement();
		beforeEach(() => {
			annonceDeLogement = uneAnnonceDeLogement();
		});

		describe('quand il n‘y a pas d‘image a afficher', () => {
			it('n‘affiche pas le carousel',() => {
				annonceDeLogement.imageUrlList = [];
				render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
				const listDeSlides = screen.queryByRole('list', { name: 'liste des photos' });
				expect(listDeSlides).not.toBeInTheDocument();
			});
		});

		describe('quand il y a une seule image a afficher', () => {
			it('n‘affiche pas le carousel, juste une image', () => {
				annonceDeLogement.imageUrlList = [{ alt:'', src:'/une-seule-image.webp' }];
				render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);

				const listDeSlides = screen.queryByRole('list', { name: 'liste des photos' });
				expect(listDeSlides).not.toBeInTheDocument();

				const image = screen.getByRole('img');
				expect(image).toHaveAttribute('src', expect.stringMatching(/une-seule-image.webp/));
			});
		});

		describe('quand il y a plusieurs images a afficher', () => {
			it('affiche le carousel', () => {
				annonceDeLogement.imageUrlList = [{ alt:'', src:'/une-première-image.webp' }, { alt:'', src:'/une-deuxième-image.webp' }];
				render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);

				const listDesSlides = screen.getByRole('list', { hidden: true, name: 'liste des photos du logement' });
				expect(listDesSlides).toBeInTheDocument();
			});
		});
	});
	describe('description du logement', () => {
		it('affiche la description du logement', () => {
			const annonceDeLogement = uneAnnonceDeLogement();
			annonceDeLogement.description = "C'est un super logement !";

			render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
			const description = screen.getByText(/C'est un super logement !/i);

			expect(description).toBeVisible();
		});
	});
});
