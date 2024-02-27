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
			expect(header).toBeVisible();
		});

		it('affiche le logo de la République Française', () => {
			mockUseRouter({ pathname: '/' });
			render(<Header/>);

			const logo = screen.getByAltText('République Française, Liberté, Egalité, Fraternité');
			expect(logo).toBeVisible();
		});

		it('affiche un lien vers l’accueil', () => {
			mockUseRouter({ pathname: '/' });
			render(<Header/>);

			const accueilLink = screen.getByRole('link', { name: '1jeune1solution (retour à l\'accueil) - République française, Liberté, Égalité, Fraternité' });
			expect(accueilLink).toBeVisible();
		});

		describe('quand on ouvre la navigation', () => {
			it('affiche la navigation avec le role correspondant', async () => {
				mockUseRouter({ pathname: '/' });
				render(<Header/>);

				const header = screen.getByRole('banner');
				const openNavButton = within(header).getByRole('button', { name: 'Offres' });
				fireEvent.click(openNavButton);
				const navigationDesktop = screen.getByTestId('navigation-desktop');

				expect(navigationDesktop).toHaveRole('navigation');
				expect(navigationDesktop).toBeVisible();
			});

			it('affiche le lien "Découvrir et trouver sa voie avec l’apprentissage" dans le menu des formations et orientations', async () => {
				// GIVEN
				mockUseRouter({ pathname: '/' });
				render(<Header/>);
				const navigationDesktop = screen.getByTestId('navigation-desktop');
				const formationsEtOrientationNavItem = within(navigationDesktop).getByRole('button', { name: /^formations et orientation$/i });
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

				const navigationDesktop = screen.getByTestId('navigation-desktop');
				const accueilNavItem = within(navigationDesktop).getByText('Accueil');
				const offresNavItem = within(navigationDesktop).getByText('Offres');


				expect(accueilNavItem).toHaveAttribute('aria-current', 'true');
				expect(offresNavItem).toHaveAttribute('aria-current', 'false');
			});
		});

		describe('quand la page courante est "Emplois"', () => {
			it('affiche le composant Header avec la navigation active sur "Emplois"', async () => {
				mockUseRouter({ pathname: '/emplois' });
				render(<Header/>);

				const navigationDesktop = screen.getByTestId('navigation-desktop');
				const accueilNavItem = within(navigationDesktop).getByText('Accueil');
				const offresNavItem = within(navigationDesktop).getByText('Offres');

				fireEvent.click(offresNavItem);

				const emploisNavItem = within(navigationDesktop).getByText('Emplois');

				expect(accueilNavItem).toHaveAttribute('aria-current', 'false');
				expect(emploisNavItem).toHaveAttribute('aria-current', 'true');
			});
		});

		describe('quand la page courante est "Je deviens mentor"', () => {
			it('affiche le composant Header avec la navigation active sur "Je deviens mentor"', async () => {
				mockUseRouter({ pathname: '/je-deviens-mentor' });
				render(<Header/>);

				const navigationDesktop = screen.getByTestId('navigation-desktop');
				const accueilNavItem = within(navigationDesktop).getByText('Accueil');
				const lesNavItem = within(navigationDesktop).getAllByText('Je suis employeur').at(0) as HTMLElement;

				fireEvent.click(lesNavItem);

				const jeDeviensMentorNavItem = within(navigationDesktop).getByText('Je deviens mentor');

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
				const encartLien = screen.getByTestId('desktop-mailto-stages');
				expect(encartLien).toHaveRole('link');
				expect(encartLien).toHaveAccessibleName(/Vous voulez accueillir des stagiaires de 3e et 2de ?/);
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
					const encartLien = screen.getByTestId('mobile-mailto-campagne');
					expect(encartLien).toHaveRole('link');
					expect(encartLien).toHaveAccessibleName(/Vous voulez accueillir des stagiaires de 3e et 2de ?/);
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
				const button = screen.getByRole('button', { name : 'Menu' });
				fireEvent.click(button);
				const menu = screen.getByRole('navigation', { name: 'menu principal' });
				expect(menu).toBeVisible();

				const modaleNavigation =  screen.getByRole('dialog');
				expect(within(modaleNavigation).getByText('Découvrir les métiers')).toBeVisible();
			});

			it('positionne le menu dans le bon sous menu de niveau 2', () => {
				mockUseRouter({ pathname: '/je-deviens-mentor' });
				render(<Header/>);
				const button = screen.getByRole('button', { name : 'Menu' });
				fireEvent.click(button);
				const menu = screen.getByRole('navigation', { name: 'menu principal' });
				expect(menu).toBeVisible();

				const modaleNavigation =  screen.getByRole('dialog');
				expect(within(modaleNavigation).getByText('Je deviens mentor')).toBeVisible();
			});

			it('positionne le menu dans le bon sous menu de niveau 2 et permet de retourner en arrière', async () => {
				const user = userEvent.setup();
				mockUseRouter({ pathname: '/je-deviens-mentor' });
				render(<Header/>);
				const burger = screen.getByRole('button', { name: 'Menu' });
				await user.click(burger);
				const menu = screen.getByRole('navigation', { name: 'menu principal' });
				expect(menu).toBeVisible();

				const modaleNavigation =  screen.getByRole('dialog');
				expect(within(modaleNavigation).getByText('Je deviens mentor')).toBeVisible();
				const retourEnArrière = within(modaleNavigation).getByRole('button', { name: 'Recruter et agir pour les jeunes' });
				await user.click(retourEnArrière);
				expect(within(modaleNavigation).getByText('Je suis employeur')).toBeVisible();
			});
		});
		describe('Au clic sur une catégorie', () => {
			it('ferme les autres catégories', async () => {
				const user = userEvent.setup();
				mockUseRouter({ pathname: '/' });
				render(<Header/>);
				const burgerMenu = screen.getByRole('navigation', { name: 'ouvrir le menu principal' });
				const button = within(burgerMenu).getByRole('button', { name: 'Menu' });
				await user.click(button);
				const navigationMobile = screen.getByTestId('navigation-mobile');

				const categorie1 = within(navigationMobile).getByRole('button', { name: 'Formations et orientation' });
				await user.click(categorie1);
				const categorie2 = within(navigationMobile).getByRole('button', { name: 'Engagement' });
				expect(categorie1).toHaveAttribute('aria-expanded', 'true');
				expect(categorie2).not.toHaveAttribute('aria-expanded', 'true');
				await user.click(categorie2);
				expect(categorie1).not.toHaveAttribute('aria-expanded', 'true');
				expect(categorie2).toHaveAttribute('aria-expanded', 'true');
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
				const button = screen.getByRole('button', { name: 'Menu' });
				fireEvent.click(button);
				const menu = screen.getByRole('navigation', { name: 'menu principal' });
				const navigationMobile = screen.getByTestId('navigation-mobile');

				const item = within(navigationMobile).getByRole('link');
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
				await userEvent.click(screen.getByRole('button', { name : 'Menu' }));

				const navigationMobile = screen.getByTestId('navigation-mobile');
				const sectionEmployeur = within(navigationMobile).getByText('Je suis employeur');
				await userEvent.click(sectionEmployeur);
				const subItem = within(navigationMobile).getByText('Recruter et agir pour les jeunes');
				await userEvent.click(subItem);
				// Then
				expect(within(navigationMobile).queryByText('Je suis employeur')).not.toBeInTheDocument();
				expect(sectionEmployeur).toHaveTextContent('Recruter et agir pour les jeunes');
			});
		});
	});
});
