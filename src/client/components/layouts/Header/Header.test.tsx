/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

		describe('quand la fonctionnalité encart est activée', () => {
			it('affiche le composant Header avec l’encart', async () => {
				// Given
				process.env = {
					...process.env,
					NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE: '1',
				};
				mockUseRouter({ pathname: '/' });

				// When
				render(<Header/>);

				// Then
				const encartTitre = screen.getByText('Je choisis l’apprentissage');
				const encartDescription = screen.getByText('Découvrez les avantages de l’apprentissage et trouvez votre contrat ou votre formation');
				const encartLien = screen.getByRole('link', { name: 'Je choisis l’apprentissage Découvrez les avantages de l’apprentissage et trouvez votre contrat ou votre formation' });
				expect(encartTitre).toBeInTheDocument();
				expect(encartDescription).toBeInTheDocument();
				expect(encartLien).toHaveAttribute('href', '/apprentissage');
			});
		});
		describe('quand la fonctionnalité encart est désactivée', () => {
			it('affiche le composant Header sans l’encart', async () => {
				// Given
				process.env = {
					...process.env,
					NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE: '0',
				};
				mockUseRouter({ pathname: '/' });

				// When
				render(<Header/>);

				// Then
				const encartTitre = screen.queryByText('Je choisis l’apprentissage');
				const encartDescription = screen.queryByText('Découvrez les avantages de l’apprentissage et trouvez votre contrat ou votre formation');
				const encartLien = screen.queryByRole('link', { name: 'Je choisis l’apprentissage Découvrez les avantages de l’apprentissage et trouvez votre contrat ou votre formation' });
				expect(encartTitre).not.toBeInTheDocument();
				expect(encartDescription).not.toBeInTheDocument();
				expect(encartLien).not.toBeInTheDocument();
			});
		});

		it('affiche le lien "Découvrir et trouver sa voie avec l’apprentissage" quand feature flippé', async () => {
			// GIVEN
			mockUseRouter({ pathname: '/' });
			process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE = '1';
			render(<Header/>);
			const formationsEtOrientationNavItem = screen.getByRole('button', { name: /^formations et orientation$/i });
			const user = userEvent.setup();

			// WHEN
			await user.click(formationsEtOrientationNavItem);

			// THEN
			const campagneApprentissageLink = screen.getByRole('link', { name: 'Découvrir et trouver sa voie avec l’apprentissage' });
			expect(campagneApprentissageLink).toBeVisible();
		});
		it('masque le lien "Découvrir et trouver sa voie avec l’apprentissage" quand feature flippé off', async () => {
			// GIVEN
			mockUseRouter({ pathname: '/' });
			process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE = '0';
			render(<Header/>);
			const formationsEtOrientationNavItem = screen.getByRole('button', { name: /^formations et orientation$/i });
			const user = userEvent.setup();

			// WHEN
			await user.click(formationsEtOrientationNavItem);

			// THEN
			const campagneApprentissageLink = screen.queryByRole('link', { name: 'Découvrir et trouver sa voie avec l’apprentissage' });
			expect(campagneApprentissageLink).not.toBeInTheDocument();
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
				const menu = screen.queryByRole('navigation');
				expect(menu).not.toBeInTheDocument();
			});

			describe('quand la fonctionnalité encart est activée', () => {
				it('affiche le composant Header avec l’encart', async () => {
					// Given
					process.env = {
						...process.env,
						NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE: '1',
					};
					mockUseRouter({ pathname: '/' });

					// When
					render(<Header/>);

					// Then
					const encartTitre = screen.getByText('Je choisis l’apprentissage');
					const encartLien = screen.getByRole('link', { name: 'Je choisis l’apprentissage' });
					expect(encartTitre).toBeInTheDocument();
					expect(encartLien).toHaveAttribute('href', '/apprentissage');
				});
			});
			describe('quand la fonctionnalité encart est désactivée', () => {
				it('affiche le composant Header sans l’encart', async () => {
					// Given
					process.env = {
						...process.env,
						NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE: '0',
					};
					mockUseRouter({ pathname: '/' });

					// When
					render(<Header/>);

					// Then
					const encartTitre = screen.queryByText('Je choisis l’apprentissage');
					const encartLien = screen.queryByRole('link', { name: 'Je choisis l’apprentissage' });
					expect(encartTitre).not.toBeInTheDocument();
					expect(encartLien).not.toBeInTheDocument();
				});
			});
		});
		describe('Au clic sur le bouton menu', () => {
			it('ouvre le menu le navigation mobile', () => {
				mockUseRouter({ pathname: '/' });
				render(<Header/>);
				const button = screen.getByRole('button');
				fireEvent.click(button);
				const menu = screen.getByRole('navigation');
				expect(menu).toBeInTheDocument();
			});

			it('positionne le menu dans le bon sous menu de niveau 1', () => {
				mockUseRouter({ pathname: '/decouvrir-les-metiers' });
				render(<Header/>);
				const button = screen.getByRole('button');
				fireEvent.click(button);
				const menu = screen.getByRole('navigation');
				expect(menu).toBeInTheDocument();
				expect(screen.getByText('Découvrir les métiers')).toBeInTheDocument();
			});

			it('positionne le menu dans le bon sous menu de niveau 2', () => {
				mockUseRouter({ pathname: '/je-deviens-mentor' });
				render(<Header/>);
				const button = screen.getByRole('button');
				fireEvent.click(button);
				const menu = screen.getByRole('navigation');
				expect(menu).toBeInTheDocument();
				expect(screen.getByText('Je deviens mentor')).toBeInTheDocument();
			});

			it('positionne le menu dans le bon sous menu de niveau 2 et permet de retourner en arrière', () => {
				mockUseRouter({ pathname: '/je-deviens-mentor' });
				render(<Header/>);
				const button = screen.getByRole('button');
				fireEvent.click(button);
				const menu = screen.getByRole('navigation');
				expect(menu).toBeInTheDocument();
				expect(screen.getByText('Je deviens mentor')).toBeInTheDocument();
				const retourEnArrière = screen.getByText('Recruter et agir pour les jeunes');
				fireEvent.click(retourEnArrière);
				expect(screen.getByText('Je suis employeur')).toBeInTheDocument();
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
				const menu = screen.getByRole('navigation');
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
