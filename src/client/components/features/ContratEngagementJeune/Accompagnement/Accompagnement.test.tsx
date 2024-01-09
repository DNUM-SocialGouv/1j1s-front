/**
 * @jest-environment jsdom
 */


import { act, render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { MODAL_ANIMATION_TIME_IN_MS } from '~/client/components/ui/Modal/ModalComponent';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { BffDemandeDeContactService } from '~/client/services/demandeDeContact/bff.demandeDeContact.service';
import { aDemandeDeContactService } from '~/client/services/demandeDeContact/demandeDeContact.service.fixture';
import { LocalisationService } from '~/client/services/localisation/localisation.service';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { aCommune } from '~/server/localisations/domain/localisationAvecCoordonnées.fixture';

import Accompagnement from './Accompagnement';

const formulaireContact = {
	adresseMail: 'mariotintin@mail.com',
	age: '16 ans',
	nom: 'Tintin',
	prenom: 'Mario',
	telephone: '0123456789',
	ville: 'Paris (75006)',
};

describe('<Accompagnement />', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	function renderComponent() {
		const demandeDeContactService: BffDemandeDeContactService = {
			envoyerPourLeCEJ: jest.fn().mockResolvedValue(createSuccess(undefined)),
			envoyerPourLesEntreprisesSEngagent: jest.fn().mockResolvedValue(createSuccess(undefined)),
		} as unknown as BffDemandeDeContactService;
		const localisationService = {} as unknown as LocalisationService;


		render(
			<DependenciesProvider demandeDeContactService={demandeDeContactService} localisationService={localisationService}>
				<Accompagnement/>
			</DependenciesProvider>,
		);

	}

	describe('quand il se passe rien', () => {
		it('on affiche le composant avec 3 boutons', () => {
			// Given
			renderComponent();
			const premierBouton = screen.getByText('Oui, je suis accompagné(e) par la Mission Locale');
			const deuxiemeBouton = screen.getByText('Oui, je suis accompagné(e) par Pôle emploi');
			const troisiemeBouton = screen.getByText('Non, je ne bénéficie d‘aucun accompagnement');
			// Then
			expect(premierBouton).toBeVisible();
			expect(deuxiemeBouton).toBeVisible();
			expect(troisiemeBouton).toBeVisible();
		});
	});

	describe('quand on clique sur Non, je ne bénéficie d‘aucun accompagnement', () => {
		it('ça affiche le formulaire avec l‘âge du capitaine', async () => {
			// Given
			const user = userEvent.setup();
			const pasDAccompagnement = 'Non, je ne bénéficie d‘aucun accompagnement';
			const quelÂgeAvezVous = 'Quel âge avez-vous ?';

			renderComponent();
			const troisièmeBouton = screen.getByText(pasDAccompagnement);

			// When
			await user.click(troisièmeBouton);

			// Then
			const preuveDExistence = screen.getByText(quelÂgeAvezVous);
			expect(troisièmeBouton).not.toBeVisible();
			expect(preuveDExistence).toBeVisible();
		});
	});

	describe('quand on clique sur Entre 18 et 25 ans', () => {
		it('ça affiche le formulaire des dispositifs', async () => {
			// Given
			const user = userEvent.setup();

			const contenuModal = 'Avez-vous besoin d’aide pour vous orienter, chercher un emploi, une alternance, une formation, ou travailler votre projet professionnel ?';
			const titreModal = 'Découvrez les dispositifs référencés sur le portail 1jeune1solution';

			renderComponent();

			// When
			await user.click(screen.getByRole('button', { name: 'Non, je ne bénéficie d‘aucun accompagnement' }));
			await user.click(screen.getByRole('button', { name: 'Entre 18 et 25 ans' }));
			await user.click(screen.getByRole('button', { name: 'Non' }));

			// Then
			expect(await screen.findByText(titreModal)).toBeVisible();
			expect(screen.getByText(contenuModal)).toBeVisible();
		});
	});

	describe('quand on clique sur Plus de 25 ans', () => {
		it('ça affiche le formulaire des dispositifs', async () => {
			// Given
			const user = userEvent.setup();
			const contenuModal = 'Avez-vous besoin d’aide pour vous orienter, chercher un emploi, une alternance, une formation, ou travailler votre projet professionnel ?';
			const titreModal = 'Découvrez les dispositifs référencés sur le portail 1jeune1solution';

			renderComponent();

			// When
			await user.click(screen.getByRole('button', { name: 'Non, je ne bénéficie d‘aucun accompagnement' }));
			await user.click(screen.getByRole('button', { name: 'Plus de 25 ans' }));
			await user.click(screen.getByRole('button', { name: 'Non' }));

			// Then
			expect(await screen.findByText(titreModal)).toBeVisible();
			expect(screen.getByText(contenuModal)).toBeVisible();
		});
		it('ça affiche le formulaire Handicap', async () => {
			// Given
			const user = userEvent.setup();
			const contenuModal = 'Êtes-vous en situation de handicap (RQTH) ?';

			renderComponent();

			// When
			await user.click(screen.getByRole('button', { name: 'Non, je ne bénéficie d‘aucun accompagnement' }));
			await user.click(screen.getByRole('button', { name: 'Plus de 25 ans' }));
			await user.click(screen.getByRole('button', { name: 'Oui' }));

			// Then
			expect(screen.getByText(contenuModal)).toBeVisible();
		});
		it('ça te renvoie chez Pôle emploi sur la page Inscription', async () => {
			// Given
			const user = userEvent.setup();
			const contenuModal = 'Vous pouvez bénéficier des services de Pôle emploi';
			const inscriptionPoleEmploi = 'S‘inscrire à Pôle emploi';

			renderComponent();
			// When
			await user.click(screen.getByRole('button', { name: 'Non, je ne bénéficie d‘aucun accompagnement' }));
			await user.click(screen.getByRole('button', { name: 'Plus de 25 ans' }));
			await user.click(screen.getByRole('button', { name: 'Oui' }));
			await user.click(screen.getByRole('button', { name: 'Non' }));

			// Then
			expect(screen.getByText(contenuModal)).toBeVisible();
			const link = screen.getByRole('link', { name: inscriptionPoleEmploi });
			expect(link).toBeVisible();
			expect(link).toHaveAttribute('href', expect.stringContaining('https://candidat.pole-emploi.fr/inscription-en-ligne/accueil'));
			expect(link).toHaveAttribute('target', '_blank');
			expect(link).toHaveAttribute('title', `${inscriptionPoleEmploi} - nouvelle fenêtre`);
		});
	});

	describe('quand je clique sur Oui je suis accompagné par la Mission Locale', () => {
		it('je vois le formulaire Mission Locale', async () => {
			const user = userEvent.setup();
			render(
				<DependenciesProvider
					demandeDeContactService={aDemandeDeContactService()}
					localisationService={aLocalisationService()}>
					<Accompagnement/>
				</DependenciesProvider>,
			);

			const boutonFormulaireMissionLocale = screen.getByRole('button', { name: 'Oui, je suis accompagné(e) par la Mission Locale' });
			await user.click(boutonFormulaireMissionLocale);

			expect(screen.getByRole('textbox', { name: 'Prénom' })).toBeVisible();
			expect(screen.getByRole('textbox', { name: 'Nom' })).toBeVisible();
			expect(screen.getByRole('textbox', { name: 'Adresse email' })).toBeVisible();
			expect(screen.getByRole('textbox', { name: 'Téléphone' })).toBeVisible();
			expect(screen.getByRole('combobox', { name: 'Ville' })).toBeVisible();
			expect(screen.getByRole('button', { name: 'Age' })).toBeVisible();

			expect(screen.getByRole('button', { name: 'Envoyer la demande' })).toBeVisible();
		});

		describe('lorsque je remplis le formulaire', () => {
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
						<Accompagnement/>
					</DependenciesProvider>,
				);
				const boutonFormulaireMissionLocale = screen.getByRole('button', { name: 'Oui, je suis accompagné(e) par la Mission Locale' });
				await user.click(boutonFormulaireMissionLocale);

				// NOTE (BRUJ 03/01/2024): rajout d'un delais pour gérer le setTimeout de la modale qui focus sur le premier élément
				await act(() => delay(MODAL_ANIMATION_TIME_IN_MS));
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
							<Accompagnement/>
						</DependenciesProvider>,
					);
					const boutonFormulaireMissionLocale = screen.getByRole('button', { name: 'Oui, je suis accompagné(e) par la Mission Locale' });
					await user.click(boutonFormulaireMissionLocale);

					// NOTE (BRUJ 03/01/2024): rajout d'un delais pour gérer le setTimeout de la modale qui focus sur le premier élément
					await act(() => delay(MODAL_ANIMATION_TIME_IN_MS));
					await remplirFormulaire();

					await user.click(screen.getByRole('button', { name: 'Envoyer la demande' }));

					expect(screen.getByRole('dialog', { name: 'Une erreur est survenue lors de l‘envoi du formulaire' })).toBeVisible();
					expect(screen.queryByRole('dialog', { name: 'Vous pouvez bénéficier d’un accompagnement répondant à vos besoins auprès de votre Mission Locale' })).not.toBeInTheDocument();
				});

				it('lorsque je ferme la modale d‘erreur, ouvre la modale de formulaire', async () => {
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
							<Accompagnement/>
						</DependenciesProvider>,
					);

					const boutonFormulaireMissionLocale = screen.getByRole('button', { name: 'Oui, je suis accompagné(e) par la Mission Locale' });
					await user.click(boutonFormulaireMissionLocale);

					// NOTE (BRUJ 03/01/2024): rajout d'un delais pour gérer le setTimeout de la modale qui focus sur le premier élément
					await act(() => delay(MODAL_ANIMATION_TIME_IN_MS));
					await remplirFormulaire();

					await user.click(screen.getByRole('button', { name: 'Envoyer la demande' }));

					const modaleErreur = screen.getByRole('dialog', { name: 'Une erreur est survenue lors de l‘envoi du formulaire' });
					await user.click(within(modaleErreur).getByRole('button', { name: 'Fermer' }));
					expect(modaleErreur).not.toBeInTheDocument();

					expect(screen.getByRole('dialog', { name: 'Vous pouvez bénéficier d’un accompagnement répondant à vos besoins auprès de votre Mission Locale' })).toBeVisible();
				});
			});
		});
	});

	describe('quand on clique sur Oui je suis accompagné par Pôle emploi', () => {
		it('ça te renvoie chez Pôle emploi', async () => {
			// Given
			const user = userEvent.setup();
			const poleEmploi = 'Oui, je suis accompagné(e) par Pôle emploi';
			const jeContacteMonConseiller = 'Contacter mon conseiller';
			renderComponent();

			// When
			await user.click(screen.getByText(poleEmploi));

			// Then
			const link = screen.getByRole('link', { name: jeContacteMonConseiller });
			expect(link).toBeVisible();
			expect(link).toHaveAttribute('href', expect.stringContaining('pole-emploi.fr'));
			expect(link).toHaveAttribute('target', '_blank');
			expect(link).toHaveAttribute('title', `${jeContacteMonConseiller} - nouvelle fenêtre`);
		});
	});

	describe('quand on clique sur Retour', () => {
		it('ça revient sur le formulaire de départ', async () => {
			// Given
			const user = userEvent.setup();
			const pasDAccompagnement = 'Non, je ne bénéficie d‘aucun accompagnement';
			const retour = 'Retour';
			const quelÂgeAvezVous = 'Quel âge avez-vous ?';

			renderComponent();
			await user.click(screen.getByText(pasDAccompagnement));

			// When
			await user.click(screen.getByText(retour));

			// Then
			expect(screen.getByText(pasDAccompagnement)).toBeVisible();
			expect(screen.queryByText(quelÂgeAvezVous)).not.toBeInTheDocument();
		});
	});
});

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function remplirFormulaire() {
	const user = userEvent.setup();
	const inputPrenom = screen.getByRole('textbox', { name: 'Prénom' });
	await user.type(inputPrenom, formulaireContact.prenom);

	const inputNom = screen.getByRole('textbox', { name: 'Nom' });
	await user.type(inputNom, formulaireContact.nom);

	const inputMail = screen.getByRole('textbox', { name: 'Adresse email' });
	await user.type(inputMail, formulaireContact.adresseMail);

	await user.type(screen.getByRole('textbox', { name: 'Téléphone' }), formulaireContact.telephone);

	await user.type(screen.getByRole('combobox', { name: 'Ville' }), formulaireContact.ville);
	const villeOption = await screen.findByText(formulaireContact.ville);
	await user.click(villeOption);

	await user.click(screen.getByRole('button', { name: 'Age' }));
	await user.click(screen.getByRole('radio', { name: formulaireContact.age }));
}
