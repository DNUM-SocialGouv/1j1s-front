/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import DemandeContactCEJ
	from '~/client/components/features/ContratEngagementJeune/DemandeDeContactCEJ/DemandeContactCEJ';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aDemandeDeContactService } from '~/client/services/demandeDeContact/demandeDeContact.service.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { aCommune } from '~/server/localisations/domain/localisationAvecCoordonnées.fixture';


const formulaireContact = {
	adresseMail: 'mariotintin@mail.com',
	age: '16 ans',
	nom: 'Tintin',
	prenom: 'Mario',
	telephone: '0123456789',
	ville: 'Paris (75006)',
};

describe('<DemandeContactCEJ />', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	function renderComponent() {
		const demandeDeContactServiceMock = aDemandeDeContactService();
		const localisationService = aLocalisationService();

		render(
			<DependenciesProvider demandeDeContactService={demandeDeContactServiceMock} localisationService={localisationService}>
				<DemandeContactCEJ/>
			</DependenciesProvider>,
		);
	}

	it('le composant s‘affiche correctement', () => {
		// Given
		// When
		renderComponent();
		// Then
		expect(screen.getByText('Demander à être contacté.e')).toBeVisible();
	});
	describe('Lorsqu‘on clique sur le bouton je souhaite être contacté(e)', () => {
		it('affiche un formulaire de rappel', async () => {
			// Given
			renderComponent();
			// When
			await userEvent.click(screen.getByText('Demander à être contacté.e'));
			// Then
			expect(screen.getByRole('textbox', { name: 'Prénom Exemple : Jean' })).toBeVisible();
			expect(screen.getByRole('textbox', { name: 'Nom Exemple : Dupont' })).toBeVisible();
			expect(screen.getByRole('textbox', { name: 'Adresse e-mail Exemple : jean.dupont@gmail.com' })).toBeVisible();
			expect(screen.getByRole('textbox', { name: 'Téléphone Exemple : 0606060606' })).toBeVisible();
			expect(screen.getByRole('combobox', { name: 'Age Exemple : 16 ans' })).toBeVisible();
			expect(screen.getByRole('combobox', { name: 'Ville Exemples : Paris, Béziers…' })).toBeVisible();

			expect(screen.getByRole('button', { name: 'Envoyer la demande' })).toBeVisible();
		});

		it('lorsque l‘envoi du formulaire est en succes, affiche la modale de succès', async () => {
			const user = userEvent.setup();
			const formulaireContact = {
				adresseMail: 'mariotintin@mail.com',
				age: '16 ans',
				nom: 'Tintin',
				prenom: 'Mario',
				telephone: '0123456789',
				ville: 'Paris (75006)',
			};
			const demandeDeContactService = aDemandeDeContactService();
			jest.spyOn(demandeDeContactService, 'envoyerPourLeCEJ').mockResolvedValue(createSuccess(undefined));
			const localisationService = aLocalisationService();
			jest.spyOn(localisationService, 'rechercherCommune').mockResolvedValue(createSuccess({
				résultats: [aCommune({
					libelle: formulaireContact.ville,
				})],
			}));

			render(
				<DependenciesProvider
					demandeDeContactService={demandeDeContactService}
					localisationService={localisationService}>
					<DemandeContactCEJ/>
				</DependenciesProvider>,
			);
			const boutonFormulaireModale= screen.getByRole('button', { name: 'Demander à être contacté.e' });
			await user.click(boutonFormulaireModale);

			await remplirFormulaire();

			expect(screen.getByRole('form')).toHaveFormValues({
				age: '16',
				commune: formulaireContact.ville,
				firstname: formulaireContact.prenom,
				lastname: formulaireContact.nom,
				mail: formulaireContact.adresseMail,
				phone: formulaireContact.telephone,
			});

			await user.click(screen.getByRole('button', { name: 'Envoyer la demande' }));

			expect(demandeDeContactService.envoyerPourLeCEJ).toHaveBeenCalledTimes(1);
			expect(screen.getByRole('dialog', { name: 'Votre demande a bien été transmise !' })).toBeVisible();
		});

		describe('modale d‘erreur', () => {
			it('lorsque l‘envoi du formulaire est en echec, affiche la modale d‘echec et ferme la modale de formulaire', async () => {
				const user = userEvent.setup();

				const demandeDeContactService = aDemandeDeContactService();
				jest.spyOn(demandeDeContactService, 'envoyerPourLeCEJ').mockResolvedValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));

				const localisationService = aLocalisationService();
				jest.spyOn(localisationService, 'rechercherCommune').mockResolvedValue(createSuccess({
					résultats: [aCommune({
						libelle: formulaireContact.ville,
					})],
				}));

				render(
					<DependenciesProvider
						demandeDeContactService={demandeDeContactService}
						localisationService={localisationService}>
						<DemandeContactCEJ/>
					</DependenciesProvider>,
				);
				const boutonFormulaireModale= screen.getByRole('button', { name: 'Demander à être contacté.e' });
				await user.click(boutonFormulaireModale);

				await remplirFormulaire();

				await user.click(screen.getByRole('button', { name: 'Envoyer la demande' }));

				expect(screen.getByRole('dialog', { name: 'Une erreur est survenue lors de l‘envoi du formulaire' })).toBeVisible();
				expect(screen.queryByRole('dialog', { name: 'J‘ai des questions sur le Contrat d‘Engagement Jeune et souhaite être rappelé' })).not.toBeInTheDocument();
			});

			it('lorsque je clique sur le bouton Retour au formulaire, ouvre la modale de formulaire', async () => {
				const user = userEvent.setup();

				const demandeDeContactService = aDemandeDeContactService();
				jest.spyOn(demandeDeContactService, 'envoyerPourLeCEJ').mockResolvedValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));

				const localisationService = aLocalisationService();
				jest.spyOn(localisationService, 'rechercherCommune').mockResolvedValue(createSuccess({
					résultats: [aCommune({
						libelle: formulaireContact.ville,
					})],
				}));

				render(
					<DependenciesProvider
						demandeDeContactService={demandeDeContactService}
						localisationService={localisationService}>
						<DemandeContactCEJ/>
					</DependenciesProvider>,
				);

				const boutonFormulaireModale= screen.getByRole('button', { name: 'Demander à être contacté.e' });
				await user.click(boutonFormulaireModale);

				await remplirFormulaire();

				await user.click(screen.getByRole('button', { name: 'Envoyer la demande' }));

				const modaleErreur = screen.getByRole('dialog', { name: 'Une erreur est survenue lors de l‘envoi du formulaire' });
				await user.click(within(modaleErreur).getByRole('button', { name: 'Retour au formulaire' }));
				expect(modaleErreur).not.toBeInTheDocument();

				expect(screen.getByRole('dialog', { name: 'J‘ai des questions sur le Contrat d‘Engagement Jeune et souhaite être rappelé' })).toBeVisible();
			});

			it('lorsque je clique sur le bouton Fermer, ferme la modale d‘erreur et n‘ouvre pas la modale de formulaire', async () => {
				const user = userEvent.setup();

				const demandeDeContactService = aDemandeDeContactService();
				jest.spyOn(demandeDeContactService, 'envoyerPourLeCEJ').mockResolvedValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));

				const localisationService = aLocalisationService();
				jest.spyOn(localisationService, 'rechercherCommune').mockResolvedValue(createSuccess({
					résultats: [aCommune({
						libelle: formulaireContact.ville,
					})],
				}));

				render(
					<DependenciesProvider
						demandeDeContactService={demandeDeContactService}
						localisationService={localisationService}>
						<DemandeContactCEJ/>
					</DependenciesProvider>,
				);

				const boutonFormulaireModale= screen.getByRole('button', { name: 'Demander à être contacté.e' });
				await user.click(boutonFormulaireModale);

				await remplirFormulaire();

				await user.click(screen.getByRole('button', { name: 'Envoyer la demande' }));

				const modaleErreur = screen.getByRole('dialog', { name: 'Une erreur est survenue lors de l‘envoi du formulaire' });
				await user.click(within(modaleErreur).getByRole('button', { name: 'Fermer' }));
				expect(modaleErreur).not.toBeInTheDocument();

				expect(screen.queryByRole('dialog', { name: 'J‘ai des questions sur le Contrat d‘Engagement Jeune et souhaite être rappelé' })).not.toBeInTheDocument();
			});
		});
	});
});

async function remplirFormulaire() {
	const user = userEvent.setup();
	const inputPrenom = screen.getByRole('textbox', { name: 'Prénom Exemple : Jean' });
	await user.type(inputPrenom, formulaireContact.prenom);

	const inputNom = screen.getByRole('textbox', { name: 'Nom Exemple : Dupont' });
	await user.type(inputNom, formulaireContact.nom);

	const inputMail = screen.getByRole('textbox', { name: 'Adresse e-mail Exemple : jean.dupont@gmail.com' });
	await user.type(inputMail, formulaireContact.adresseMail);

	await user.type(screen.getByRole('textbox', { name: 'Téléphone Exemple : 0606060606' }), formulaireContact.telephone);

	await user.type(screen.getByRole('combobox', { name: 'Ville Exemples : Paris, Béziers…' }), formulaireContact.ville);
	const villeOption = await screen.findByText(formulaireContact.ville);
	await user.click(villeOption);

	await user.click(screen.getByRole('combobox', { name: 'Age Exemple : 16 ans' }));
	await user.click(screen.getByRole('option', { name: formulaireContact.age }));
}
