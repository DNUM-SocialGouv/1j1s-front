/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { ConsulterAnnonce } from '~/client/components/features/Logement/Consulter/ConsulterAnnonce';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { uneAnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.fixture';

describe('<ConsulterAnnonce />', () => {
	beforeEach(() => {
		mockSmallScreen();
		sessionStorage.setItem('referrer', 'annonces');
		const routerReload = jest.fn();
		mockUseRouter({ reload: routerReload });
	});
	it('affiche le le bouton retour vers la liste des annonces',  () => {
		const annonceDeLogement = uneAnnonceDeLogement();
		annonceDeLogement.titre = 'Super T3 dans le centre de Paris';

		render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
		const boutonRetour = screen.getByRole('button', { name: 'Retour vers la page annonces' });
		expect(boutonRetour).toBeInTheDocument();

	});
	it("affiche le titre de l'annonce",  () => {
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
				annonceDeLogement.imageUrlList = [{ alt:'une seule image', src:'/une-seule-image.webp' }];
				render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);

				const listDeSlides = screen.queryByRole('list', { name: 'liste des photos' });
				expect(listDeSlides).not.toBeInTheDocument();

				const image = screen.getByRole('img', { name: 'une seule image' });
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
	describe('bilan énergétique du logement', ()=>{
		it('affiche la consommation énergétique du logement',  () => {
			const annonceDeLogement = uneAnnonceDeLogement();
			annonceDeLogement.bilanEnergetique.consommationEnergetique = 'A';

			render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
			const consommationEnergetique = screen.getByRole('img', { name: /A/i });

			expect(consommationEnergetique).toBeVisible();
		});
		it('affiche le libellé de la consommation énergétique du logement',  () => {
			const annonceDeLogement = uneAnnonceDeLogement();
			annonceDeLogement.bilanEnergetique.consommationEnergetique = 'A';

			render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
			const tag = screen.getByRole('img', { name: /A/i });
			const description = screen.getByText(/Logement très économe en énergie./i);

			expect(tag).toHaveAttribute('aria-describedby', description.id);
		});
		it('affiche la couleur de la consommation énergétique du logement',  () => {
			const annonceDeLogement = uneAnnonceDeLogement();
			annonceDeLogement.bilanEnergetique.consommationEnergetique = 'A';

			render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
			const tag = screen.getByRole('img', { name: /A/i });

			expect(tag).toHaveAttribute('style', '--color: var(--color-a); --text-color: var(--text-color-a);');
		});
		it('affiche l’émission de gaz du logement',  ()=>{
			const annonceDeLogement = uneAnnonceDeLogement();
			annonceDeLogement.bilanEnergetique.emissionDeGaz = 'G';

			render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
			const emissionDeGaz = screen.getByRole('img', { name: /G/i });

			expect(emissionDeGaz).toBeVisible();
		});
		it('affiche le libellé de l’émission de gaz du logement',  () => {
			const annonceDeLogement = uneAnnonceDeLogement();
			annonceDeLogement.bilanEnergetique.emissionDeGaz = 'G';

			render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
			const tag = screen.getByRole('img', { name: /G/i });
			const description = screen.getByText(/Logement énormément polluant./i);

			expect(tag).toHaveAttribute('aria-describedby', description.id);
		});
		it('affiche la couleur de l’émission de gaz du logement',  () => {
			const annonceDeLogement = uneAnnonceDeLogement();
			annonceDeLogement.bilanEnergetique.emissionDeGaz = 'G';

			render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
			const tag = screen.getByRole('img', { name: /G/i });

			expect(tag).toHaveAttribute('style', '--color: var(--color-g); --text-color: var(--text-color-g);');
		});
	});
});
