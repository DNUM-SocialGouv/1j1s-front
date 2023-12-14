/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import { Header } from '~/client/components/layouts/Header/Header';
import { createMockRouter, mockUseRouter } from '~/client/components/useRouter.mock';
import { mockLargeScreen, mockSmallScreen } from '~/client/components/window.mock';

describe('Header', () => {
	describe('Sur desktop', () => {
		beforeEach(() => {
			mockLargeScreen();
		});
		afterEach(() => {
			jest.clearAllMocks();
		});
		it('affiche le composant Header', async () => {
			mockUseRouter({ pathname: '/' });
			render(<Header/>);

			const header = screen.getByRole('banner');
			expect(header).toBeInTheDocument();
		});

		it('affiche le logo de la République Française', () => {
			mockUseRouter({ pathname: '/' });
			render(<Header/>);

			const logo = screen.getByAltText('République Française, Liberté, Egalité, Fraternité');
			expect(logo).toBeInTheDocument();
		});

		describe('quand on ouvre la navigation', () => {
			it('affiche la navigation', async () => {
				mockUseRouter({ pathname: '/' });
				render(<Header/>);

				const header = screen.getByRole('banner');
				const openNavButton = within(header).getByRole('button', { name: 'Offres' });
				fireEvent.click(openNavButton);
				const navigation = screen.getByRole('navigation');

				expect(navigation).toBeInTheDocument();
			});

			it('affiche le lien "Découvrir et trouver sa voie avec l’apprentissage" dans le menu des formations et orientations', async () => {
				// GIVEN
				mockUseRouter({ pathname: '/' });
				render(<Header/>);
				const formationsEtOrientationNavItem = screen.getByRole('button', { name: /^formations et orientation$/i });
				const user = userEvent.setup();

				// WHEN
				await user.click(formationsEtOrientationNavItem);

				// THEN
				const campagneApprentissageLink = screen.getByRole('link', { name: 'Découvrir et trouver sa voie avec l’apprentissage' });
				expect(campagneApprentissageLink).toBeVisible();
			});
		});

		describe('quand la page courante est "Accueil"', () => {
			it('affiche le composant Header avec la navigation active sur "Accueil"', async () => {
				mockUseRouter({ pathname: '/' });
				render(<Header/>);

				const navigation = screen.getByRole('navigation');
				const accueilNavItem = within(navigation).getByText('Accueil');
				const offresNavItem = within(navigation).getByText('Offres');


				expect(accueilNavItem).toHaveAttribute('aria-current', 'true');
				expect(offresNavItem).toHaveAttribute('aria-current', 'false');
			});
		});

		describe('quand la page courante est "Emplois"', () => {
			it('affiche le composant Header avec la navigation active sur "Emplois"', async () => {
				mockUseRouter({ pathname: '/emplois' });
				render(<Header/>);

				const navigation = screen.getByRole('navigation');
				const accueilNavItem = within(navigation).getByText('Accueil');
				const offresNavItem = within(navigation).getByText('Offres');

				fireEvent.click(offresNavItem);

				const emploisNavItem = within(navigation).getByText('Emplois');

				expect(accueilNavItem).toHaveAttribute('aria-current', 'false');
				expect(emploisNavItem).toHaveAttribute('aria-current', 'true');
			});
		});

		describe('quand la page courante est "Je deviens mentor"', () => {
			it('affiche le composant Header avec la navigation active sur "Je deviens mentor"', async () => {
				mockUseRouter({ pathname: '/je-deviens-mentor' });
				render(<Header/>);

				const navigation = screen.getByRole('navigation');
				const accueilNavItem = within(navigation).getByText('Accueil');
				const lesNavItem = within(navigation).getAllByText('Je suis employeur').at(0) as HTMLElement;

				fireEvent.click(lesNavItem);

				const jeDeviensMentorNavItem = within(navigation).getByText('Je deviens mentor');

				expect(accueilNavItem).toHaveAttribute('aria-current', 'false');
				// eslint-disable-next-line testing-library/no-node-access
				expect(jeDeviensMentorNavItem.parentNode).toHaveAttribute('aria-current', 'true');
			});
		});

		describe('quand la fonctionnalité de campagne de com est activée', () => {
			it('affiche le composant Header avec l’encart', async () => {
				// Given
				process.env = {
					...process.env,
					NEXT_PUBLIC_CAMPAGNE_COM_EN_COURS_FEATURE: '1',
				};
				mockUseRouter({ pathname: '/' });

				// When
				render(<Header/>);

				// Then
				const encartLien = screen.getByRole('link', { name: /Vous souhaitez recruter des élèves de 3ème et 2nd ?/ });
				expect(encartLien).toBeVisible();
				expect(encartLien).toHaveTextContent(/Envoyez nous un e-mail !/i);
				expect(encartLien).toHaveAttribute('href', expect.stringMatching(/mailto:/));
				expect(encartLien).toHaveAttribute('href', expect.stringMatching(/contact-1J1S@sg.social.gouv.fr/));
			});
		});

		describe('quand la fonctionnalité de campagne de com est désactivée', () => {
			it('affiche le composant Header sans l’encart', async () => {
				// Given
				process.env = {
					...process.env,
					NEXT_PUBLIC_CAMPAGNE_COM_EN_COURS_FEATURE: '0',
				};
				mockUseRouter({ pathname: '/' });

				// When
				render(<Header/>);

				// Then
				const encartLien = screen.queryByRole('link', { name: /Découvrez le Contrat Engagement Jeune, la solution pour vous/i });
				expect(encartLien).not.toBeInTheDocument();
			});
		});

		it('affiche le lien jobs d‘été quand le feature flip est actif', async () => {
			// GIVEN
			mockUseRouter({ pathname: '/' });
			process.env.NEXT_PUBLIC_JOB_ETE_FEATURE = '1';
			render(<Header/>);
			const offreNavItem = screen.getByRole('button', { name: /^Offres$/i });
			const user = userEvent.setup();

			// WHEN
			await user.click(offreNavItem);

			// THEN
			const jobsEteLink = screen.getByRole('link', { name: 'Jobs d‘été' });
			expect(jobsEteLink).toBeVisible();
			expect(jobsEteLink).toHaveAttribute('href', '/jobs-ete');
		});
		it('masque le lien jobs d‘été quand le feature flip est inactif', async () => {
			// GIVEN
			mockUseRouter({ pathname: '/' });
			process.env.NEXT_PUBLIC_JOB_ETE_FEATURE = '0';
			render(<Header/>);
			const offreNavItem = screen.getByRole('button', { name: /^Offres$/i });
			const user = userEvent.setup();

			// WHEN
			await user.click(offreNavItem);

			// THEN
			const jobsEteLink = screen.queryByRole('link', { name: 'Jobs d‘été' });
			expect(jobsEteLink).not.toBeInTheDocument();
		});

		describe('quand l’enquête de satisfaction est feature flippé', () => {
			it('ON, affiche le lien vers l’enquête de satisfaction', () => {
				// GIVEN
				mockUseRouter({ pathname: '/' });
				process.env.NEXT_PUBLIC_CAMPAGNE_COM_EN_COURS_FEATURE = '1';

				// WHEN
				render(<Header/>);

				// THEN
				const lienEnquete = screen.getByRole('link', { name: 'Vous souhaitez aider 1jeune1solution à s’améliorer ? Donnez votre avis en moins de 2 minutes' });
				expect(lienEnquete).toBeVisible();
				expect(lienEnquete).toHaveAttribute('href', 'https://docs.google.com/forms/d/e/1FAIpQLSeY3bU5cQlKNCO6B5VRJhPe7j6LwOXLXBikLrzKVAEFkUQPYw/viewform');
			});

			it('ON, mais que l’url de l’enquête n’est pas fournie, masque le lien vers l’enquête de satisfaction', () => {
				// GIVEN
				mockUseRouter({ pathname: '/' });
				process.env.NEXT_PUBLIC_ENQUETE_SATISFACTION_FEATURE = '1';
				process.env.NEXT_PUBLIC_ENQUETE_SATISFACTION_URL = '';

				// WHEN
				render(<Header/>);

				// THEN
				const lienEnquete =  screen.queryByRole('link', { name: 'Vous souhaitez aider 1jeune1solution à s’améliorer ? Donnez votre avis en moins de 2 minutes' });
				expect(lienEnquete).not.toBeInTheDocument();
			});

			it('OFF, masque le lien vers l’enquête de satisfaction', () => {
				// GIVEN
				mockUseRouter({ pathname: '/' });
				process.env.NEXT_PUBLIC_ENQUETE_SATISFACTION_FEATURE = '0';
				process.env.NEXT_PUBLIC_ENQUETE_SATISFACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeY3bU5cQlKNCO6B5VRJhPe7j6LwOXLXBikLrzKVAEFkUQPYw';

				// WHEN
				render(<Header/>);

				// THEN
				const lienEnquete =  screen.queryByRole('link', { name: 'Vous souhaitez aider 1jeune1solution à s’améliorer ? Donnez votre avis en moins de 2 minutes' });
				expect(lienEnquete).not.toBeInTheDocument();
			});
		});
	});

	describe('Sur mobile', () => {
		beforeEach(() => {
			mockSmallScreen();
		});
		afterEach(() => {
			jest.clearAllMocks();
		});
		describe('Par défaut', () => {
			it('n‘affiche pas la navigation mobile', () => {
				mockUseRouter({ pathname: '/' });
				render(<Header/>);
				const menu = screen.queryByRole('navigation', { name: 'menu principal' });
				expect(menu).not.toBeInTheDocument();
			});

			describe('quand la fonctionnalité encart est activée', () => {
				it('affiche le composant Header avec l’encart', async () => {
					// Given
					process.env = {
						...process.env,
						NEXT_PUBLIC_CAMPAGNE_COM_EN_COURS_FEATURE: '1',
					};
					mockUseRouter({ pathname: '/' });

					// When
					render(<Header/>);

					// Then
					const encartLien = screen.getByRole('link', { name: /Vous souhaitez recruter des élèves de 3ème et 2nd ?/ });
					expect(encartLien).toBeVisible();
					expect(encartLien).toHaveAttribute('href', expect.stringMatching(/mailto:/));
					expect(encartLien).toHaveAttribute('href', expect.stringMatching(/contact-1J1S@sg.social.gouv.fr/));
				});
			});
			describe('quand la fonctionnalité encart est désactivée', () => {
				it('affiche le composant Header sans l’encart', async () => {
					// Given
					process.env = {
						...process.env,
						NEXT_PUBLIC_CAMPAGNE_COM_EN_COURS_FEATURE: '0',
					};
					mockUseRouter({ pathname: '/' });

					// When
					render(<Header/>);

					// Then
					const encartLien = screen.queryByRole('link', { name: /Un parcours personnalisé pour vous aider à définir votre projet professionnel et trouver un emploi/i });
					expect(encartLien).not.toBeInTheDocument();
				});
			});
		});
		describe('Au clic sur le bouton menu', () => {
			it('ouvre le menu le navigation mobile', () => {
				mockUseRouter({ pathname: '/' });
				render(<Header/>);
				const burgerMenu = screen.getByRole('navigation', { name: 'ouvrir le menu principal' });
				const button = within(burgerMenu).getByRole('button', { name: 'Menu' });
				fireEvent.click(button);
				const menu = screen.getByRole('navigation', { name: 'menu principal' });
				expect(menu).toBeVisible();
			});

			it('positionne le menu dans le bon sous menu de niveau 1', () => {
				mockUseRouter({ pathname: '/decouvrir-les-metiers' });
				render(<Header/>);
				const button = screen.getByRole('button');
				fireEvent.click(button);
				const menu = screen.getByRole('navigation', { name: 'menu principal' });
				expect(menu).toBeInTheDocument();
				expect(screen.getByText('Découvrir les métiers')).toBeInTheDocument();
			});

			it('positionne le menu dans le bon sous menu de niveau 2', () => {
				mockUseRouter({ pathname: '/je-deviens-mentor' });
				render(<Header/>);
				const button = screen.getByRole('button');
				fireEvent.click(button);
				const menu = screen.getByRole('navigation', { name: 'menu principal' });
				expect(menu).toBeInTheDocument();
				expect(screen.getByText('Je deviens mentor')).toBeInTheDocument();
			});

			it('positionne le menu dans le bon sous menu de niveau 2 et permet de retourner en arrière', async () => {
				const user = userEvent.setup();
				mockUseRouter({ pathname: '/je-deviens-mentor' });
				render(<Header/>);
				const burger = screen.getByRole('button', { name: 'Menu' });
				await user.click(burger);
				const menu = screen.getByRole('navigation', { name: 'menu principal' });
				expect(menu).toBeVisible();
				expect(screen.getByText('Je deviens mentor')).toBeVisible();
				const retourEnArrière = screen.getByRole('button', { name: 'Recruter et agir pour les jeunes' });
				await user.click(retourEnArrière);
				expect(screen.getByText('Je suis employeur')).toBeVisible();
			});
		});
		describe('Au clic sur un item du menu', () => {
			it('ferme le menu de navigation', () => {
				mockUseRouter({ pathname: '/' });
				const router = createMockRouter({ pathname: '/' });
				render(
					<RouterContext.Provider value={router}>
						<Header/>
					</RouterContext.Provider>,
				);
				const button = screen.getByRole('button');
				fireEvent.click(button);
				const menu = screen.getByRole('navigation', { name: 'menu principal' });
				const item = within(menu).getByRole('link');
				fireEvent.click(item);
				expect(menu).not.toBeInTheDocument();
			});
		});
		describe('Au clic sur le menu employeur', () => {
			it('affiche les menus en profondeur', async () => {
				// Given
				mockUseRouter({ pathname: '/' });
				const router = createMockRouter({ pathname: '/' });
				render(
					<RouterContext.Provider value={router}>
						<Header/>
					</RouterContext.Provider>,
				);
				// When
				await userEvent.click(screen.getByRole('button'));
				const sectionEmployeur = screen.getByText('Je suis employeur');
				await userEvent.click(sectionEmployeur);
				const subItem = within(screen.getByRole('menu')).getByText('Recruter et agir pour les jeunes');
				await userEvent.click(subItem);
				// Then
				expect(screen.queryByText('Je suis employeur')).not.toBeInTheDocument();
				expect(sectionEmployeur).toHaveTextContent('Recruter et agir pour les jeunes');
			});
		});
	});
});
