/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import {
	CampagneApprentissageJeunes,
} from '~/client/components/features/CampagneApprentissage/CampagneApprentissageJeunes/CampagneApprentissageJeunes';
import { mockSmallScreen } from '~/client/components/window.mock';
import { aVideoCampagneApprentissageList } from '~/server/cms/domain/videoCampagneApprentissage.fixture';

describe('CampagneApprentissageJeunes', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('affiche le titre de la page', () => {
		// WHEN
		render(<CampagneApprentissageJeunes videos={aVideoCampagneApprentissageList()}/>);
		const titre = screen.getByRole('heading', { level: 1, name: /L’apprentissage : pour moi c’est le bon choix/i });

		// THEN
		expect(titre).toBeVisible();
	});

	it('affiche un lien vers la simulation', () => {
		// WHEN
		render(<CampagneApprentissageJeunes videos={aVideoCampagneApprentissageList()}/>);

		// THEN
		const simulation = screen.getByRole('link', { name: /Simuler ma rémunération/i });
		expect(simulation).toBeVisible();
		expect(simulation).toHaveAttribute('href', '/apprentissage/simulation');
	});

	describe('affiche une première section pour les raisons de choisir l’apprentissage', () => {
		it('comportant un titre', () => {
			// WHEN
			render(<CampagneApprentissageJeunes />);

			// THEN
			const sectionRaison = screen.getByRole('region', { name: /Choisir l’apprentissage c’est…/i });
			const titre = within(sectionRaison).getByRole('heading', { level: 2, name: /Choisir l’apprentissage c’est…/i });
			expect(titre).toBeVisible();
		});

		it('comportant une liste des raisons', () => {
			// GIVEN
			const expectedRaisonList = [
				'Obtenir un diplôme reconnu',
				'Apprendre en pratiquant',
				'Une formation gratuite',
				'Avoir une expérience professionnelle complète',
				'Un salaire chaque mois',
			];

			// WHEN
			render(<CampagneApprentissageJeunes />);

			// THEN
			const sectionRaison = screen.getByRole('region', { name: /Choisir l’apprentissage c’est…/i });
			const raisonList = within(sectionRaison).getByRole('list');
			const raisonListItems = within(raisonList).getAllByRole('listitem');
			raisonListItems.forEach((raison,index) => {
				expect(raison).toHaveTextContent(expectedRaisonList[index]);
				expect(raison).toBeVisible();
			});
		});
	});

	describe('PreparationApprentissage', () => {
		it('je vois les informations pour accéder aux offres de formation et d‘alternance', () => {
			render(<CampagneApprentissageJeunes/>);
			expect(screen.getByRole('heading', {
				level: 2,
				name: 'Vous souhaitez faire le choix de l’apprentissage ?',
			})).toBeVisible();
			expect(screen.getByRole('link', { name: 'Trouver votre formation en apprentissage' })).toHaveAttribute('href', '/formations/apprentissage');
			expect(screen.getByRole('link', { name: 'Trouver votre entreprise' })).toHaveAttribute('href', '/apprentissage');
		});
		it('je vois les informations pour accéder à l‘article sur la prépa apprentissage', () => {
			render(<CampagneApprentissageJeunes/>);
			expect(screen.getByRole('heading', {
				level: 2,
				name: 'La prépa-apprentissage c’est quoi ?',
			})).toBeVisible();
			expect(screen.getByRole('link', { name: 'Lire l‘article' })).toHaveAttribute('href', '/articles/la-prepa-apprentissage-c-est-quoi');
		});
	});

	describe('EnSavoirPlusApprentissageJeunes', () => {
		it('je vois les informations pour accéder à la FAQ parents-enfants', () => {
			render(<CampagneApprentissageJeunes videos={aVideoCampagneApprentissageList()}/>);
			expect(screen.getByRole('heading', {
				level: 2,
				name: 'Parents : l’apprentissage, le bon choix pour votre enfant. On répond à toutes vos questions',
			})).toBeVisible();
			expect(screen.getByRole('link', { name: 'Accéder à la FAQ Parents-Enfants' })).toHaveAttribute('href', '/faq/apprentissage-parents-enfants');
		});
		it('je vois les informations pour accéder à la page d‘apprentissage pour les employeurs', () => {
			render(<CampagneApprentissageJeunes videos={aVideoCampagneApprentissageList()}/>);
			expect(screen.getByRole('heading', {
				level: 2,
				name: 'Employeurs : tout ce qu’il y a à savoir sur l’apprentissage pour votre entreprise',
			})).toBeVisible();
			expect(screen.getByRole('link', { name: 'Découvrir l’apprentissage' })).toHaveAttribute('href', '/apprentissage-entreprises');
		});
	});
	describe('VideosCampagneApprentissage', () => {
		const aVideoCampagneApprentissagesList = aVideoCampagneApprentissageList();
		it('je vois le titre de la partie videos', () => {
			render(<CampagneApprentissageJeunes videos={aVideoCampagneApprentissagesList}/>);
			expect(screen.getByRole('heading', {
				level: 2,
				name: 'Ils ont fait le choix de l’apprentissage, pourquoi pas vous ?',
			})).toBeVisible();
		});
		it('je vois la description de la video', () => {
			render(<CampagneApprentissageJeunes videos={aVideoCampagneApprentissagesList}/>);
			expect(screen.getByText('Découvrez les témoignages d’Elyna, Céline, Romain et tous les autres !')).toBeVisible();
		});
		it('je vois les titres vidéos', () => {
			render(<CampagneApprentissageJeunes videos={aVideoCampagneApprentissagesList}/>);
			const sectionVideos = screen.getByRole('region', { name: 'Découvrez les témoignages d’Elyna, Céline, Romain et tous les autres !' });
			const titresVideo = within(sectionVideos).getAllByRole('listitem');
			expect(titresVideo.length).toBe(1);
			expect(titresVideo[0]).toBeVisible();
			expect(titresVideo[0].textContent).toBe(aVideoCampagneApprentissagesList[0].titre);
		});
	});
});
