/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import {
	aLesEntreprisesSEngagentService,
} from '~/client/services/lesEntreprisesSEngagent/lesEntreprisesSEngagentService.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';
import LesEntreprisesSEngagentInscription, {
	FormulaireEngagement,
} from '~/pages/les-entreprises-s-engagent/inscription/index.page';

describe('LesEntreprisesSEngagentInscription', () => {
	const aLesEntreprisesSEngagementServiceMock = aLesEntreprisesSEngagentService();
	const localisationService = aLocalisationService();
	const analyticsService = anAnalyticsService();

	const routerPush = jest.fn();

	const labelsEtape1 = [
		{ name: 'Nom de l’entreprise' },
		{ name: 'Ville du siège social de l’entreprise' },
		{ name: 'Numéro de SIRET' },
		{ name: 'Secteur d’activité de l’entreprise' },
		{ name: 'Taille de l’entreprise' },
	];

	const labelsEtape2 = [
		{ name: 'Prénom' },
		{ name: 'Nom' },
		{ name: 'Adresse e-mail de contact' },
		{ name: 'Fonction au sein de l’entreprise' },
		{ name: 'Numéro de téléphone de contact' },
	];

	const renderComponent = () => {
		render(
			<DependenciesProvider
				lesEntreprisesSEngagentService={aLesEntreprisesSEngagementServiceMock}
				localisationService={localisationService}
				analyticsService={analyticsService}
			>
				<LesEntreprisesSEngagentInscription/>
			</DependenciesProvider>,
		);
	};

	beforeAll(() => {
		mockUseRouter({ push: routerPush });
	});

	describe('quand l‘utilisateur souhaite faire une demande de contact', () => {
		it('il peut envoyer un email', () => {
			renderComponent();

			const link = screen.getByRole('link', { name: 'nous contacter' });
			expect(link.getAttribute('href')).toMatch(/^mailto:/);
		});
	});

	describe('quand l’utilisateur arrive sur la page', () => {
		it('peut cliquer sur le lien "Retour" pour retourner sur la page de description des entreprises s’engagent', async () => {
			renderComponent();

			const retourLink = screen.getByRole('link', { name: 'Retour' });

			expect(retourLink).toHaveAttribute('href', '/les-entreprises-s-engagent');
		});

		it('voit la première étape de formulaire', () => {
			renderComponent();

			expect(screen.getByText('Etape 1 sur 2')).toBeInTheDocument();
			labelsEtape1.forEach((label) => {
				expect(screen.getByText(label.name)).toBeInTheDocument();
			});
		});

		it('envoie les analytics de la page à son affichage', () => {
			renderComponent();

			expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
				page_template: 'engagement_entreprise_etape_1',
				pagegroup: 'engagement_entreprise',
				pagelabel: 'engagement_entreprise_etape_1',
				'segment-site': 'funnel_etape_1',
			});
		});
	});

	describe('quand l’utilisateur clique sur Suivant mais n’a pas rempli le formulaire', () => {
		it('il voit des messages d’erreur', async () => {
			renderComponent();

			const inputNomSociété = screen.getByRole('textbox', { name: 'Nom de l’entreprise' });
			await userEvent.type(inputNomSociété, 'Octo');

			await clickOnGoToEtape2();

			expect(screen.getByRole('textbox', { name: 'Nom de l’entreprise' })).toBeValid();
			expect(screen.getByRole('textbox', { name: 'Ville du siège social de l’entreprise' })).toBeInvalid();
			expect(screen.getByRole('textbox', { name: 'Numéro de SIRET' })).toBeInvalid();
			expect(screen.getByRole('textbox', { name: 'Secteur d’activité de l’entreprise' })).toBeInvalid();
		});
	});

	describe('quand l’utilisateur clique sur Suivant et qu’il a rempli tous les champs', () => {
		it('il passe à l’étape 2', async () => {
			renderComponent();

			await remplirFormulaireEtape1();
			await clickOnGoToEtape2();

			expect(screen.getByText('Etape 2 sur 2')).toBeInTheDocument();
			labelsEtape2.forEach((label) => {
				expect(screen.getByRole('textbox', label)).toBeInTheDocument();
			});
		});

		describe('puis passe à l’étape 2 et qu’il clique sur Retour', () => {
			it('il repasse à l’étape 1', async () => {
				renderComponent();

				await remplirFormulaireEtape1();
				await clickOnGoToEtape2();
				await userEvent.click(screen.getByRole('button', { name: 'Retour' }));

				expect(screen.getByText('Etape 1 sur 2')).toBeInTheDocument();
			});
		});
	});

	describe('quand l’utilisateur a mal rempli l’étape 2 du formulaire et clique sur Envoyer le formulaire', () => {
		it('il voit des messages d’erreur', async () => {
			// Given
			renderComponent();

			await remplirFormulaireEtape1();
			await clickOnGoToEtape2();

			const [labelPrénom, ...autresLabels] = labelsEtape2;
			const inputPrénom = screen.getByRole('textbox', labelPrénom);
			await userEvent.type(inputPrénom, 'Toto');

			// When
			await clickOnEnvoyerLeFormulaire();

			// Then
			expect(screen.getByRole('textbox', labelPrénom)).toBeValid();
			for (const label of autresLabels) {
				expect(screen.getByRole('textbox', label)).toBeInvalid();
			}
		});
	});

	describe('quand l’utilisateur a rempli tous les champs et clique sur Envoyer le formulaire', () => {
		it('appelle l’api avec les valeurs du formulaire de l’étape 1 et 2 et affiche un message de succès à l’utilisateur', async () => {
			renderComponent();
			const expected: FormulaireEngagement = {
				codePostal: '75015',
				email: 'toto@email.com',
				nom: 'Tata',
				nomSociété: 'Octo',
				prénom: 'Toto',
				secteur: 'health-social',
				siret: '41816609600069',
				taille: 'xsmall',
				travail: 'RH',
				téléphone: '0122334455',
				ville: 'Paris 15e Arrondissement',
			};

			await remplirFormulaireEtape1();
			await clickOnGoToEtape2();

			await remplirFormulaireEtape2();
			await clickOnEnvoyerLeFormulaire();

			expect(aLesEntreprisesSEngagementServiceMock.envoyerFormulaireEngagement).toHaveBeenCalledWith(expected);
			expect(screen.getByText('Félicitations, votre formulaire a bien été envoyé !')).toBeInTheDocument();
		});
	});
});

async function remplirFormulaireEtape1() {
	const user = userEvent.setup();
	const inputNomSociété = screen.getByRole('textbox', { name: 'Nom de l’entreprise' });
	await user.type(inputNomSociété, 'Octo');
	const inputSiret = screen.getByRole('textbox', { name: 'Numéro de SIRET' });
	await user.type(inputSiret, '41816609600069');
	const inputSecteur = screen.getByRole('textbox', { name: 'Secteur d’activité de l’entreprise' });
	await user.type(inputSecteur, 'Santé humaine et action sociale');
	// eslint-disable-next-line testing-library/no-wait-for-side-effects
	await waitFor(() => user.click(screen.getByText('Santé humaine et action sociale')));
	await user.click(screen.getByText('Taille de l’entreprise'));
	await user.click(screen.getByText('20 à 49 salariés'));
	const inputVille = screen.getByText('Ville du siège social de l’entreprise');
	await user.type(inputVille, 'Paris');
	// eslint-disable-next-line testing-library/no-wait-for-side-effects
	await waitFor(() => user.click(screen.getByText('Paris 15e Arrondissement (75015)')));
}

async function remplirFormulaireEtape2() {
	const inputPrénom = screen.getByRole('textbox', { name: 'Prénom' });
	const inputNom = screen.getByRole('textbox', { name: 'Nom' });
	const inputEmail = screen.getByRole('textbox', { name: 'Adresse e-mail de contact' });
	const inputTravail = screen.getByRole('textbox', { name: 'Fonction au sein de l’entreprise' });
	const inputTéléphone = screen.getByRole('textbox', { name: 'Numéro de téléphone de contact' });
	await userEvent.type(inputPrénom, 'Toto');
	await userEvent.type(inputNom, 'Tata');
	await userEvent.type(inputEmail, 'toto@email.com');
	await userEvent.type(inputTravail, 'RH');
	await userEvent.type(inputTéléphone, '0122334455');
}

async function clickOnGoToEtape2() {
	const button = screen.getByRole('button', { name: 'Suivant' });
	await userEvent.click(button);
}

async function clickOnEnvoyerLeFormulaire() {
	const button = screen.getByRole('button', { name: 'Envoyer le formulaire' });
	await userEvent.click(button);
}

