/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import {
	CampagneApprentissageEntreprises,
} from '~/client/components/features/CampagneApprentissage/CampagneApprentissageEntreprises/CampagneApprentissageEntreprises';
import { mockLargeScreen, mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aVideoService } from '~/client/services/video/video.service.fixture';
import { aVideoCampagneApprentissage } from '~/server/campagne-apprentissage/domain/videoCampagneApprentissage.fixture';

describe('CampagneApprentissageEntreprises', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('Avant la campagne du 22 octobre 2024 sur l’apprentissage', () => {
		beforeEach(() => {
			// Given
			  process.env.NEXT_PUBLIC_CAMPAGNE_ALTERNANCE_FEATURE = '0';
		});

		describe('Encart de présentation de l’apprentissage pour les employeurs', () => {
			it('affiche l’ancien titre', () => {
				// When
				render(
					<DependenciesProvider youtubeService={aVideoService()}>
						<CampagneApprentissageEntreprises videos={[]} />
					</DependenciesProvider>,
				);
				const titre = screen.getByRole('heading', { level: 1, name: /L’apprentissage, pour mon entreprise c’est le bon choix\u00A0!/i });

				// Then
				expect(titre).toBeVisible();
			});
			// TODO test à implémenter
			it('masque le nouveau titre', async () => {
			  // Given
			  // When
			  // Then
			});

			it('affiche le lien vers la simulation pour les employeurs', () => {
				// Given
				mockLargeScreen();
				// When
				render(
					<DependenciesProvider youtubeService={aVideoService()}>
						<CampagneApprentissageEntreprises videos={[]} />
					</DependenciesProvider>,
				);

				// Then
				const simulation = screen.getByRole('link', { name: /Simuler le coût de l’embauche d’un apprenti/i });
				expect(simulation).toBeVisible();
				expect(simulation).toHaveAttribute('href', '/apprentissage/simulation?simulateur=employeur');
			});
			// TODO test à implémenter
			it('masque le lien vers le dépot d’offres', async () => {
			  // Given
			  // When
			  // Then
			});
		});
		describe('Encart redirections internes vers la FAQ et le dépot d’offre', () => {
			it('je vois les informations pour accéder à la FAQ parents-enfants', () => {
				render(
					<DependenciesProvider youtubeService={aVideoService()}>
						<CampagneApprentissageEntreprises videos={[]} />
					</DependenciesProvider>,
				);
				expect(screen.getByRole('heading', {
					level: 2,
					name: 'On répond à toutes vos questions sur l’apprentissage',
				})).toBeVisible();
				expect(screen.getByRole('link', { name: 'Consulter la FAQ' })).toHaveAttribute('href', '/faq/apprentissage-employeurs-apprentis');
			});
			it('je vois les informations pour accéder à la page d‘apprentissage pour les employeurs', () => {
				render(
					<DependenciesProvider youtubeService={aVideoService()}>
						<CampagneApprentissageEntreprises videos={[]} />
					</DependenciesProvider>,
				);
				expect(screen.getByRole('heading', {
					level: 2,
					name: 'Vous êtes à la recherche d’un apprenti ?',
				})).toBeVisible();
				expect(screen.getByRole('link', { name: 'Déposer une offre' })).toHaveAttribute('href', '/apprentissage/deposer-offre');
			});
		});
		describe('Section témoignages vidéos', () => {
			const aVideoCampagneApprentissagesList = [
				aVideoCampagneApprentissage(),
				aVideoCampagneApprentissage({
					titre: "Qu'est-ce que le Contrat d'Engagement Jeune CEJ ?",
					transcription: '[transcription]',
					videoId: '7zD4PCOiUvw',
				}),
			];
			describe('si aucune video n’est trouvée', () => {
				it('n’affiche pas la section', () => {
					render(
						<DependenciesProvider youtubeService={aVideoService()}>
							<CampagneApprentissageEntreprises videos={[]} />
						</DependenciesProvider>,
					);
					expect(screen.queryByRole('region', { name: /Ils ont choisi d’embaucher un apprenti ! Pourquoi pas vous ?/i })).not.toBeInTheDocument();
				});
			});
			it('je vois le titre de la partie videos', () => {
				render(
					<DependenciesProvider youtubeService={aVideoService()}>
						<CampagneApprentissageEntreprises videos={aVideoCampagneApprentissagesList} />
					</DependenciesProvider>,
				);
				expect(screen.getByRole('heading', {
					level: 2,
					name: 'Ils ont choisi d’embaucher un apprenti ! Pourquoi pas vous ?',
				})).toBeVisible();
			});
			it('je vois la description de la partie videos', () => {
				render(
					<DependenciesProvider youtubeService={aVideoService()}>
						<CampagneApprentissageEntreprises videos={aVideoCampagneApprentissagesList} />
					</DependenciesProvider>,
				);
				expect(screen.getByText('Découvrez les témoignages des maîtres d’apprentissage et des apprentis qu’ils accompagnent au quotidien.')).toBeVisible();
			});
			it('je vois les titres vidéos et ce sont des boutons', () => {
				render(
					<DependenciesProvider youtubeService={aVideoService()}>
						<CampagneApprentissageEntreprises videos={aVideoCampagneApprentissagesList} />
					</DependenciesProvider>,
				);

				const sectionVideos = screen.getByRole('region', { name: 'Découvrez les témoignages des maîtres d’apprentissage et des apprentis qu’ils accompagnent au quotidien.' });
				const titresVideos = within(sectionVideos).getAllByRole('listitem');

				const boutons = titresVideos.map((titreVideo) => within(titreVideo).getByRole('button'));

				expect(titresVideos.length).toBe(aVideoCampagneApprentissagesList.length);
				expect(titresVideos[0].textContent).toBe(aVideoCampagneApprentissagesList[0].titre);
				expect(boutons[0]).toBeVisible();
			});
			describe('si je n’ai pas sélectionné de vidéo', () => {
				it('c’est la première vidéo de la liste qui est visible par défaut', () => {
					const premiereVideoCampagne = aVideoCampagneApprentissagesList[0];
					render(
						<DependenciesProvider youtubeService={aVideoService()}>
							<CampagneApprentissageEntreprises videos={aVideoCampagneApprentissagesList} />
						</DependenciesProvider>,
					);

					const iframe = screen.getByTitle(premiereVideoCampagne.titre);
					expect(iframe).toBeVisible();
					expect(iframe).toHaveAttribute('src', expect.stringMatching(`${premiereVideoCampagne.videoId}`));
				});
			});
			describe('si j’ai selectionné une vidéo', () => {
				it('c’est la vidéo selectionnée qui est visible', async () => {
					const deuxièmeVideoCampagne = aVideoCampagneApprentissagesList[1];
					const user = userEvent.setup();

					render(
						<DependenciesProvider youtubeService={aVideoService()}>
							<CampagneApprentissageEntreprises videos={aVideoCampagneApprentissagesList} />
						</DependenciesProvider>,
					);

					const boutonDeuxiemeVideo = screen.getByRole('button', { name: deuxièmeVideoCampagne.titre });
					await user.click(boutonDeuxiemeVideo);

					const iframe = screen.getByTitle(deuxièmeVideoCampagne.titre);
					expect(iframe).toBeVisible();
					expect(iframe).toHaveAttribute('src', expect.stringMatching(`${deuxièmeVideoCampagne.videoId}`));
					expect(boutonDeuxiemeVideo).toHaveAttribute('aria-current', 'true');
				});
				it('j’ai l’information que la vidéo courante est celle que j’ai selectionné', async () => {
					const deuxièmeVideoCampagne = aVideoCampagneApprentissagesList[1];
					const user = userEvent.setup();

					render(
						<DependenciesProvider youtubeService={aVideoService()}>
							<CampagneApprentissageEntreprises videos={aVideoCampagneApprentissagesList} />
						</DependenciesProvider>,
					);

					const boutonDeuxiemeVideo = screen.getByRole('button', { name: deuxièmeVideoCampagne.titre });
					await user.click(boutonDeuxiemeVideo);

					const boutonVideoCourante = screen.getByRole('button', { current: true });
					expect(boutonVideoCourante).toBe(boutonDeuxiemeVideo);
				});
				it('le focus se retrouve avant la vidéo', async () => {
					const deuxièmeVideoCampagne = aVideoCampagneApprentissagesList[1];
					const user = userEvent.setup();

					render(
						<DependenciesProvider youtubeService={aVideoService()}>
							<CampagneApprentissageEntreprises videos={aVideoCampagneApprentissagesList} />
						</DependenciesProvider>,
					);

					await user.click(screen.getByRole('button', { name: deuxièmeVideoCampagne.titre }));

					const titre = screen.getByRole('heading', { name: 'Ils ont choisi d’embaucher un apprenti ! Pourquoi pas vous ?' });
					const iframe = screen.getByTitle(deuxièmeVideoCampagne.titre);
					expect(titre).toHaveFocus();
					expect(titre.compareDocumentPosition(iframe)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
				});
			});
			it('je ne vois pas la transcription de la vidéo', () => {
				render(
					<DependenciesProvider youtubeService={aVideoService()}>
						<CampagneApprentissageEntreprises videos={aVideoCampagneApprentissagesList} />
					</DependenciesProvider>,
				);

				const premièreVideoCampagne = aVideoCampagneApprentissagesList[0];
				expect(screen.queryByText(premièreVideoCampagne.transcription)).not.toBeVisible();
			});
			it('je vois un bouton me permettant de voir la transcription de la vidéo', () => {
				render(
					<DependenciesProvider youtubeService={aVideoService()}>
						<CampagneApprentissageEntreprises videos={aVideoCampagneApprentissagesList} />
					</DependenciesProvider>,
				);

				const ouvrirTranscription = screen.getByText('Lire la transcription');

				expect(ouvrirTranscription).toBeVisible();
			});
			describe('si je clique sur le bouton de transcription', () => {
				it('je vois la transcription de la vidéo', async () => {
					const user = userEvent.setup();
					render(
						<DependenciesProvider youtubeService={aVideoService()}>
							<CampagneApprentissageEntreprises videos={aVideoCampagneApprentissagesList} />
						</DependenciesProvider>,
					);
					const premièreVideoCampagne = aVideoCampagneApprentissagesList[0];
					const ouvrirTranscription = screen.getByText('Lire la transcription');

					await user.click(ouvrirTranscription);
					expect(screen.getByText(premièreVideoCampagne.transcription)).toBeVisible();
				});
			});
		});
		describe('Section redirections externes sur l’embauche d’un apprenti', () => {
			describe('affiche une sous section pour se renseigner', () => {
				it('comprenant un titre', () => {
					// WHEN
					render(
						<DependenciesProvider youtubeService={aVideoService()}>
							<CampagneApprentissageEntreprises videos={[]} />
						</DependenciesProvider>,
					);

					// THEN
					const section = screen.getByRole('region', { name: 'Comme eux, vous souhaitez faire le choix de l’apprentissage\u00A0?' });
					const titre = within(section).getByRole('heading', { level: 2, name: 'Comme eux, vous souhaitez faire le choix de l’apprentissage\u00A0?' });
					expect(titre).toBeVisible();
				});

				it('comprenant un lien externe vers des renseignements', () => {
					// WHEN
					render(
						<DependenciesProvider youtubeService={aVideoService()}>
							<CampagneApprentissageEntreprises videos={[]} />
						</DependenciesProvider>,
					);

					// THEN
					const section = screen.getByRole('region', { name: 'Comme eux, vous souhaitez faire le choix de l’apprentissage\u00A0?' });
					const link = within(section).getByRole('link', { name: 'Se renseigner sur l’embauche - nouvelle fenêtre' });
					expect(link).toBeVisible();
					expect(link).toHaveAttribute('href', 'https://travail-emploi.gouv.fr/formation-professionnelle/formation-en-alternance-10751/apprentissage/embaucher-un-apprenti/' );
				});
			});
			describe('affiche une sous section pour l’aide financière', () => {
				it('comprenant un titre et une description', () => {
					// WHEN
					render(<CampagneApprentissageEntreprises videos={[]} />);

					// THEN
					const section = screen.getByRole('region', { name: 'Vous envisagez de recruter un apprenti\u00A0? Vous pouvez bénéficier d’une aide financière' });
					const titre = within(section).getByRole('heading', { level: 2, name: /Vous envisagez de recruter un apprenti ?/i });
					const description = within(section).getByText('Cette aide de 6000 euros maximum est versée pour la première année de contrat, jusqu’au niveau master');
					expect(titre).toBeVisible();
					expect(description).toBeVisible();
				});

				it('comprenant un lien externe vers une explication sur l’aide financière', () => {
					// WHEN
					render(<CampagneApprentissageEntreprises videos={[]} />);

					// THEN
					const section = screen.getByRole('region', { name: 'Vous envisagez de recruter un apprenti\u00A0? Vous pouvez bénéficier d’une aide financière' });
					const link = within(section).getByRole('link', { name: 'En savoir plus - nouvelle fenêtre' });
					expect(link).toBeVisible();
					expect(link).toHaveAttribute('href', 'https://travail-emploi.gouv.fr/formation-professionnelle/entreprise-et-alternance/aides-au-recrutement-d-un-alternant/article/aide-2023-aux-employeurs-qui-recrutent-en-alternance' );
				});
			});
		});
	});

	describe('Pendant et après la campagne du 22 octobre 2024 sur l’apprentissage', () => {
		beforeEach(() => {
			// Given
			process.env.NEXT_PUBLIC_CAMPAGNE_ALTERNANCE_FEATURE = '1';
		});

		describe('Encart de présentation de l’apprentissage pour les employeurs', () => {
			it('masque l’ancien titre', () => {
				// When
				render(
					<DependenciesProvider youtubeService={aVideoService()}>
						<CampagneApprentissageEntreprises videos={[]} />
					</DependenciesProvider>,
				);
				const titre = screen.queryByRole('heading', { level: 1, name: /L’apprentissage, pour mon entreprise c’est le bon choix\u00A0!/i });

				// Then
				expect(titre).not.toBeInTheDocument();
			});
			// TODO à implémenter
			it('affiche le nouveau titre', async () => {
				// Given

				// When

				// Then

			});

			it('masque le lien vers la simulation pour les employeurs', () => {
				// Given
				mockLargeScreen();

				// When
				render(
					<DependenciesProvider youtubeService={aVideoService()}>
						<CampagneApprentissageEntreprises videos={[]} />
					</DependenciesProvider>,
				);

				// Then
				const simulation = screen.queryByRole('link', { name: /Simuler le coût de l’embauche d’un apprenti/i });
				expect(simulation).not.toBeInTheDocument();
			});
			// TODO à implémenter
			it('affiche le lien vers le dépot d’offres', async () => {
				// Given

				// When

				// Then

			});
		});
	});
	
	describe('Invariants', () => {
		describe('Section bonnes raisons de choisir l’apprentissage', () => {
			it('comporte un titre', () => {
				// WHEN
				render(
					<DependenciesProvider youtubeService={aVideoService()}>
						<CampagneApprentissageEntreprises videos={[]} />
					</DependenciesProvider>,
				);

				// THEN
				const sectionRaison = screen.getByRole('region', { name: /5 bonnes raisons de choisir l’apprentissage :/i });
				const titre = within(sectionRaison).getByRole('heading', { level: 2, name: /5 bonnes raisons de choisir l’apprentissage :/i });
				expect(titre).toBeVisible();
			});
			it('comporte une liste des raisons', () => {
				// GIVEN
				const expectedRaisonList = [
					'Former votre futur collaborateur',
					'Transmettre votre savoir-faire',
					'Bénéficier d’aides pour le recrutement',
					'Découvrir de nouvelles idées et pratiques',
					'Préparer l’avenir de votre entreprise',
				];

				// WHEN
				render(
					<DependenciesProvider youtubeService={aVideoService()}>
						<CampagneApprentissageEntreprises videos={[]} />
					</DependenciesProvider>,
				);

				// THEN
				const sectionRaison = screen.getByRole('region', { name: /5 bonnes raisons de choisir l’apprentissage :/i });
				const raisonList = within(sectionRaison).getAllByRole('listitem');
				expect(raisonList).toHaveLength(expectedRaisonList.length);
				expectedRaisonList.forEach((raison, index) => {
					expect(raisonList[index]).toHaveTextContent(raison);
					expect(raisonList[index]).toBeVisible();
				});
			});
		});
	});

});
