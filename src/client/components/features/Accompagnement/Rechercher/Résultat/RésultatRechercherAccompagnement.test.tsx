/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import {
	anEtablissementAccompagnementService,
} from '~/client/services/établissementAccompagnement/établissementAccompagnement.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import {
	EtablissementAccompagnement,
	TypeÉtablissement,
} from '~/server/etablissement-accompagnement/domain/etablissementAccompagnement';

import { RésultatRechercherAccompagnement } from './RésultatRechercherAccompagnement';

const formulaireContact = {
	adresseMail: 'mariotintin@mail.com',
	age: '16 ans',
	nom: 'Tintin',
	prenom: 'Mario',
	telephone: '0123456789',
	ville: 'Paris (75006)',
};

describe('<RésultatRechercherAccompagnement/>', () => {
	describe('lorsque je peux faire une demande de contact', () => {
		beforeEach(() => {
			mockSmallScreen();
		});

		it('je vois la modale de formulaire s‘afficher', async () => {
			const user = userEvent.setup();
			const établissement: EtablissementAccompagnement = {
				adresse: 'address',
				email: 'email',
				horaires: [],
				id: 'id',
				nom: 'nom',
				telephone: 'telephone',
				type: TypeÉtablissement.MISSION_LOCALE,
			};
			const établissementAccompagnementService = anEtablissementAccompagnementService();
			const localisationService = aLocalisationService();

			render(<DependenciesProvider établissementAccompagnementService={établissementAccompagnementService}
																	 localisationService={localisationService}>
				<RésultatRechercherAccompagnement établissement={établissement}/>
			</DependenciesProvider>);

			const buttonDemandeContact = screen.getByRole('button', { name: 'Je souhaite être contacté(e)' });
			expect(buttonDemandeContact).toBeVisible();
			await user.click(buttonDemandeContact);

			expect(screen.getByRole('dialog', { name: 'Je souhaite être contacté(e) par la Mission Locale' })).toBeVisible();
		});

		it('le bouton de soumission est désactivé et affiche "Envoi en cours" pendant la soumission du formulaire', async () => {
			// GIVEN
			const user = userEvent.setup();
			const établissement: EtablissementAccompagnement = {
				adresse: 'address',
				email: 'email',
				horaires: [],
				id: 'id',
				nom: 'nom',
				telephone: 'telephone',
				type: TypeÉtablissement.MISSION_LOCALE,
			};
			const établissementAccompagnementService = anEtablissementAccompagnementService();
			const localisationService = aLocalisationService();
			jest.spyOn(établissementAccompagnementService, 'envoyerDemandeContact').mockResolvedValue(new Promise(() => {
			}));
			render(
				<DependenciesProvider établissementAccompagnementService={établissementAccompagnementService}
					localisationService={localisationService}>
					<RésultatRechercherAccompagnement établissement={établissement}/>
				</DependenciesProvider>);

			const buttonDemandeContact = screen.getByRole('button', { name: 'Je souhaite être contacté(e)' });
			await user.click(buttonDemandeContact);


			await remplirFormulaire();

			// WHEN
			await user.click(screen.getByRole('button', { name: 'Envoyer mes informations afin d‘être rappelé(e)' }));

			// THEN
			const loadingSubmitButton = screen.getByRole('button', { name: 'Envoi en cours' });
			expect(loadingSubmitButton).toBeVisible();
			expect(loadingSubmitButton).toBeDisabled();
		});

		it('lorsque la demande de contact est un succès, affiche la modale de succès', async () => {
			const user = userEvent.setup();
			const établissement: EtablissementAccompagnement = {
				adresse: 'address',
				email: 'email',
				horaires: [],
				id: 'id',
				nom: 'nom',
				telephone: 'telephone',
				type: TypeÉtablissement.MISSION_LOCALE,
			};
			const établissementAccompagnementService = anEtablissementAccompagnementService();
			const localisationService = aLocalisationService();
			jest.spyOn(établissementAccompagnementService, 'envoyerDemandeContact').mockResolvedValue(createSuccess(undefined));
			render(<DependenciesProvider établissementAccompagnementService={établissementAccompagnementService}
																	 localisationService={localisationService}>
				<RésultatRechercherAccompagnement établissement={établissement}/>
			</DependenciesProvider>);


			const buttonDemandeContact = screen.getByRole('button', { name: 'Je souhaite être contacté(e)' });
			expect(buttonDemandeContact).toBeVisible();
			await user.click(buttonDemandeContact);

			await remplirFormulaire();

			await user.click(screen.getByRole('button', { name: 'Envoyer mes informations afin d‘être rappelé(e)' }));
			expect(établissementAccompagnementService.envoyerDemandeContact).toHaveBeenCalledTimes(1);
			expect(screen.getByRole('dialog', { name: 'Votre demande a bien été transmise !' })).toBeVisible();
		});

		describe('modale d‘erreur', () => {
			it('lorsque l‘envoi de la demande de contact est en echec, affiche la modale d‘echec et ferme la modale de formulaire', async () => {
				const user = userEvent.setup();
				const établissement: EtablissementAccompagnement = {
					adresse: 'address',
					email: 'email',
					horaires: [],
					id: 'id',
					nom: 'nom',
					telephone: 'telephone',
					type: TypeÉtablissement.MISSION_LOCALE,
				};
				const établissementAccompagnementService = anEtablissementAccompagnementService();
				const localisationService = aLocalisationService();

				jest.spyOn(établissementAccompagnementService, 'envoyerDemandeContact').mockResolvedValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));

				render(<DependenciesProvider
					établissementAccompagnementService={établissementAccompagnementService}
					localisationService={localisationService}>
					<RésultatRechercherAccompagnement établissement={établissement}/>
				</DependenciesProvider>);

				const buttonDemandeContact = screen.getByRole('button', { name: 'Je souhaite être contacté(e)' });
				expect(buttonDemandeContact).toBeVisible();
				await user.click(buttonDemandeContact);

				await remplirFormulaire();

				await user.click(screen.getByRole('button', { name: 'Envoyer mes informations afin d‘être rappelé(e)' }));

				expect(screen.getByRole('dialog', { name: 'Une erreur est survenue lors de l‘envoi du formulaire' })).toBeVisible();
				expect(screen.queryByRole('dialog', { name: 'Je souhaite être contacté(e) par la Mission Locale' })).not.toBeInTheDocument();
			});

			it('lorsque je ferme la modale d‘erreur avec le bouton Retour au formulaire, ouvre la modale de formulaire', async () => {
				const user = userEvent.setup();
				const établissement: EtablissementAccompagnement = {
					adresse: 'address',
					email: 'email',
					horaires: [],
					id: 'id',
					nom: 'nom',
					telephone: 'telephone',
					type: TypeÉtablissement.MISSION_LOCALE,
				};
				const établissementAccompagnementService = anEtablissementAccompagnementService();
				const localisationService = aLocalisationService();

				jest.spyOn(établissementAccompagnementService, 'envoyerDemandeContact').mockResolvedValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));

				render(<DependenciesProvider
					établissementAccompagnementService={établissementAccompagnementService}
					localisationService={localisationService}>
					<RésultatRechercherAccompagnement établissement={établissement}/>
				</DependenciesProvider>);

				const buttonDemandeContact = screen.getByRole('button', { name: 'Je souhaite être contacté(e)' });
				expect(buttonDemandeContact).toBeVisible();
				await user.click(buttonDemandeContact);

				await remplirFormulaire();

				await user.click(screen.getByRole('button', { name: 'Envoyer mes informations afin d‘être rappelé(e)' }));


				const modaleErreur = screen.getByRole('dialog', { name: 'Une erreur est survenue lors de l‘envoi du formulaire' });
				await user.click(within(modaleErreur).getByRole('button', { name: 'Retour au formulaire' }));
				expect(modaleErreur).not.toBeInTheDocument();

				expect(screen.getByRole('dialog', { name: 'Je souhaite être contacté(e) par la Mission Locale' })).toBeVisible();
			});

			it('lorsque je ferme la modale d‘erreur avec le bouton Fermer, ferme la modale et ne re ouvre pas le formulaire', async () => {
				const user = userEvent.setup();
				const établissement: EtablissementAccompagnement = {
					adresse: 'address',
					email: 'email',
					horaires: [],
					id: 'id',
					nom: 'nom',
					telephone: 'telephone',
					type: TypeÉtablissement.MISSION_LOCALE,
				};
				const établissementAccompagnementService = anEtablissementAccompagnementService();
				const localisationService = aLocalisationService();

				jest.spyOn(établissementAccompagnementService, 'envoyerDemandeContact').mockResolvedValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));

				render(<DependenciesProvider
					établissementAccompagnementService={établissementAccompagnementService}
					localisationService={localisationService}>
					<RésultatRechercherAccompagnement établissement={établissement}/>
				</DependenciesProvider>);

				const buttonDemandeContact = screen.getByRole('button', { name: 'Je souhaite être contacté(e)' });
				expect(buttonDemandeContact).toBeVisible();
				await user.click(buttonDemandeContact);

				await remplirFormulaire();

				await user.click(screen.getByRole('button', { name: 'Envoyer mes informations afin d‘être rappelé(e)' }));


				const modaleErreur = screen.getByRole('dialog', { name: 'Une erreur est survenue lors de l‘envoi du formulaire' });
				await user.click(within(modaleErreur).getByRole('button', { name: 'Fermer' }));
				expect(modaleErreur).not.toBeInTheDocument();

				expect(screen.queryByRole('dialog', { name: 'Je souhaite être contacté(e) par la Mission Locale' })).not.toBeInTheDocument();
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

	await user.type(screen.getByRole('textbox', { name: 'Téléphone Exemple : 0606060606' }), formulaireContact.telephone);

	await user.type(screen.getByRole('combobox', { name: 'Localisation Exemples : Paris, Béziers…' }), formulaireContact.ville);
	const villeOption = await screen.findByText(formulaireContact.ville);
	await user.click(villeOption);

	await user.click(screen.getByRole('button', { name: 'Age Exemple : 16 ans' }));
	await user.click(screen.getByRole('radio', { name: formulaireContact.age }));
}
