/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
	CampagneApprentissageJeunes,
} from '~/client/components/features/CampagneApprentissage/CampagneApprentissageJeunes/CampagneApprentissageJeunes';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { aVideoCampagneApprentissageList } from '~/server/cms/domain/videoCampagneApprentissage.fixture';

describe('CampagneApprentissageJeunes', () => {
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({ asPath: '/choisir-apprentissage' });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('affiche le titre de la page', () => {
		// WHEN
		render(<CampagneApprentissageJeunes videos={aVideoCampagneApprentissageList()}/>);

		// THEN
		const titre = screen.getByRole('heading', { level: 1, name: /L’apprentissage, pour moi c’est le bon choix./i });
		expect(titre).toBeVisible();
		const sousTitre = screen.getByText('Vous apprenez directement sur le terrain et vous êtes payés !');
		expect(sousTitre).toBeVisible();
	});

	it('affiche un lien vers la simulation pour les alternants', () => {
		// WHEN
		render(<CampagneApprentissageJeunes videos={aVideoCampagneApprentissageList()}/>);

		// THEN
		const simulation = screen.getByRole('link', { name: /Simuler votre rémunération en tant qu’apprenti/i });
		expect(simulation).toBeVisible();
		expect(simulation).toHaveAttribute('href', '/apprentissage/simulation?simulateur=alternant');
	});

	describe('affiche une première section pour les raisons de choisir l’apprentissage', () => {
		it('comportant un titre', () => {
			// WHEN
			render(<CampagneApprentissageJeunes videos={[]} />);

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
			render(<CampagneApprentissageJeunes videos={[]} />);

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
			render(<CampagneApprentissageJeunes videos={[]}/>);
			expect(screen.getByRole('heading', {
				level: 2,
				name: 'Vous souhaitez faire le choix de l’apprentissage ?',
			})).toBeVisible();
			expect(screen.getByRole('link', { name: 'Trouver votre formation en apprentissage' })).toHaveAttribute('href', '/formations/apprentissage');
			expect(screen.getByRole('link', { name: 'Trouver votre entreprise' })).toHaveAttribute('href', '/apprentissage');
		});
		it('je vois les informations pour accéder à l‘article sur la prépa apprentissage', () => {
			render(<CampagneApprentissageJeunes videos={[]}/>);
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
		describe('si aucune video n’est trouvée', () => {
			it('n’affiche pas la section', () => {
				render(<CampagneApprentissageJeunes videos={[]} />);
				expect(screen.queryByRole('region', { name: /Ils ont fait le choix de l’apprentissage, pourquoi pas vous ?/i })).not.toBeInTheDocument();
			});
		});
		it('je vois le titre de la partie videos', () => {
			render(<CampagneApprentissageJeunes videos={aVideoCampagneApprentissagesList}/>);
			expect(screen.getByRole('heading', {
				level: 2,
				name: 'Ils ont fait le choix de l’apprentissage, pourquoi pas vous ?',
			})).toBeVisible();
		});
		it('je vois la description de la partie videos', () => {
			render(<CampagneApprentissageJeunes videos={aVideoCampagneApprentissagesList}/>);
			expect(screen.getByText('Découvrez les témoignages d’Elyna, Céline, Romain et tous les autres !')).toBeVisible();
		});
		it('je vois les titres vidéos et ce sont des boutons', () => {
			render(<CampagneApprentissageJeunes videos={aVideoCampagneApprentissagesList}/>);

			const sectionVideos = screen.getByRole('region', { name: 'Découvrez les témoignages d’Elyna, Céline, Romain et tous les autres !' });
			const titresVideos = within(sectionVideos).getAllByRole('listitem');

			const boutons = titresVideos.map((titreVideo) => within(titreVideo).getByRole('button'));

			expect(titresVideos.length).toBe(aVideoCampagneApprentissagesList.length);
			expect(titresVideos[0].textContent).toBe(aVideoCampagneApprentissagesList[0].titre);
			expect(boutons[0]).toBeVisible();
		});
		describe('si je n’ai pas sélectionné de vidéo', () => {
			it('c’est la première vidéo de la liste qui est visible par défaut', () => {
				const premiereVideoCampagne = aVideoCampagneApprentissagesList[0];
				render(<CampagneApprentissageJeunes videos={aVideoCampagneApprentissagesList}/>);

				const iframe = screen.getByTitle(premiereVideoCampagne.titre);
				expect(iframe).toBeVisible();
				expect(iframe).toHaveAttribute('src', expect.stringMatching(`${premiereVideoCampagne.videoId}`));
			});
		});
		describe('si j’ai selectionné une vidéo', () => {
			it('c’est la vidéo selectionnée qui est visible', async () => {
				const deuxièmeVideoCampagne = aVideoCampagneApprentissagesList[1];
				const user = userEvent.setup();

				render(<CampagneApprentissageJeunes videos={aVideoCampagneApprentissagesList}/>);

				const boutonDeuxiemeVideo = screen.getByRole('button', { name: deuxièmeVideoCampagne.titre });
				await user.click(boutonDeuxiemeVideo);

				const iframe = screen.getByTitle(deuxièmeVideoCampagne.titre);
				expect(iframe).toBeVisible();
				expect(iframe).toHaveAttribute('src', expect.stringMatching(`${deuxièmeVideoCampagne.videoId}`));
				expect(boutonDeuxiemeVideo).toHaveAttribute('aria-current', 'true');
			});
			it('j’ai l’information que la vidéo courante est celle j’ai selectionné', async () => {
				const deuxièmeVideoCampagne = aVideoCampagneApprentissagesList[1];
				const user = userEvent.setup();

				render(<CampagneApprentissageJeunes videos={aVideoCampagneApprentissagesList}/>);

				const boutonDeuxiemeVideo = screen.getByRole('button', { name: deuxièmeVideoCampagne.titre });
				await user.click(boutonDeuxiemeVideo);

				const boutonVideoCourante = screen.getByRole('button', { current: true });
				expect(boutonVideoCourante).toBe(boutonDeuxiemeVideo);
			});
			it('le focus se retrouve avant la vidéo', async () => {
				const deuxièmeVideoCampagne = aVideoCampagneApprentissagesList[1];
				const user = userEvent.setup();

				render(<CampagneApprentissageJeunes videos={aVideoCampagneApprentissagesList}/>);

				await user.click(screen.getByRole('button', { name: deuxièmeVideoCampagne.titre }));

				const titre = screen.getByRole('heading', { name: 'Ils ont fait le choix de l’apprentissage, pourquoi pas vous ?' });
				const iframe = screen.getByTitle(deuxièmeVideoCampagne.titre);
				expect(titre).toHaveFocus();
				expect(titre.compareDocumentPosition(iframe)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
			});
		});
		it('je ne vois pas la transcription de la vidéo', () => {
			render(<CampagneApprentissageJeunes videos={aVideoCampagneApprentissagesList}/>);

			const premièreVideoCampagne = aVideoCampagneApprentissagesList[0];
			expect(screen.queryByText(premièreVideoCampagne.transcription)).not.toBeVisible();
		});
		it('je vois un bouton me permettant de voir la transcription de la vidéo', () => {
			render(<CampagneApprentissageJeunes videos={aVideoCampagneApprentissagesList}/>);

			const ouvrirTranscription = screen.getByText('Lire la transcription');

			expect(ouvrirTranscription).toBeVisible();
		});
		describe('si je clique sur le bouton de transcription', () => {
			it('je vois la transcription de la vidéo', async () => {
				const user = userEvent.setup();
				render(<CampagneApprentissageJeunes videos={aVideoCampagneApprentissagesList}/>);
				const premièreVideoCampagne = aVideoCampagneApprentissagesList[0];
				const ouvrirTranscription = screen.getByText('Lire la transcription');

				await user.click(ouvrirTranscription);
				expect(screen.getByText(premièreVideoCampagne.transcription)).toBeVisible();
			});
		});
	});
});
