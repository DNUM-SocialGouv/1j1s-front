/**
 * @jest-environment jsdom
 */


import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { mockScrollIntoView, mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aDemandeDeContactService } from '~/client/services/demandeDeContact/demandeDeContact.service.fixture';
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
		mockScrollIntoView();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	function renderComponent() {
		const demandeDeContactService = aDemandeDeContactService();
		const localisationService = aLocalisationService();


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
			const deuxiemeBouton = screen.getByText('Oui, je suis accompagné(e) par France Travail');
			const troisiemeBouton = screen.getByText('Non, je ne bénéficie d‘aucun accompagnement');
			// Then
			expect(premierBouton).toBeVisible();
			expect(deuxiemeBouton).toBeVisible();
			expect(troisiemeBouton).toBeVisible();
		});
	});

	describe('quand on clique sur Non, je ne bénéficie d‘aucun accompagnement', () => {
		it('ça affiche le formulaire avec l‘âge', async () => {
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

		describe('quand on clique sur moins de 18 ans', () => {
			it('je vois la modale avec le formulaire Mission Locale', async () => {
				const user = userEvent.setup();
				render(
					<DependenciesProvider
						demandeDeContactService={aDemandeDeContactService()}
						localisationService={aLocalisationService()}>
						<Accompagnement/>
					</DependenciesProvider>,
				);

				await user.click(screen.getByRole('button', { name: 'Non, je ne bénéficie d‘aucun accompagnement' }));
				await user.click(screen.getByRole('button', { name: 'Moins de 18 ans' }));

				expect(screen.getByRole('dialog', { name: 'Vous pouvez bénéficier d’un accompagnement répondant à vos besoins auprès de votre Mission Locale' })).toBeVisible();
				expect(screen.getByRole('textbox', { name: 'Prénom Exemple : Jean' })).toBeVisible();
				expect(screen.getByRole('textbox', { name: 'Nom Exemple : Dupont' })).toBeVisible();
				expect(screen.getByRole('textbox', { name: 'Adresse e-mail Exemple : jean.dupont@gmail.com' })).toBeVisible();
				expect(screen.getByRole('textbox', { name: 'Téléphone Exemple : 0606060606' })).toBeVisible();
				expect(screen.getByRole('combobox', { name: 'Ville Exemples : Paris, Béziers…' })).toBeVisible();
				expect(screen.getByRole('combobox', { name: 'Age Exemple : 16 ans' })).toBeVisible();

				expect(screen.getByRole('button', { name: 'Envoyer la demande' })).toBeVisible();
			});
		});

		describe('quand on clique sur Entre 18 et 25 ans', () => {
			it('quand on clique sur je ne souhaite pas être orienté, affiche la modale avec les dispositifs référencés sur 1J1S', async () => {
				const user = userEvent.setup();

				renderComponent();

				await user.click(screen.getByRole('button', { name: 'Non, je ne bénéficie d‘aucun accompagnement' }));
				await user.click(screen.getByRole('button', { name: 'Entre 18 et 25 ans' }));
				await user.click(screen.getByRole('button', { name: 'Non' }));

				expect(screen.getByRole('dialog', { name: 'Découvrez les dispositifs référencés sur le portail 1jeune1solution' })).toBeVisible();

				const linkDecouvrezOffres = screen.getByRole('link', { name: 'Découvrez nos offres' });
				expect(linkDecouvrezOffres).toBeVisible();
				expect(linkDecouvrezOffres).toHaveAttribute('href', '/#offres');

				const linkFormation = screen.getByRole('link', { name: 'Formation et orientation' });
				expect(linkFormation).toBeVisible();
				expect(linkFormation).toHaveAttribute('href', '/#formation');

				const linkAidesAccompagnement = screen.getByRole('link', { name: 'Aides et accompagnement' });
				expect(linkAidesAccompagnement).toBeVisible();
				expect(linkAidesAccompagnement).toHaveAttribute('href', '/#aides-orientation-accompagnement');

				const linkEngagement = screen.getByRole('link', { name: 'Engagement' });
				expect(linkEngagement).toBeVisible();
				expect(linkEngagement).toHaveAttribute('href', '/#engagement-benevolat');
			});

			it('quand on clique sur je souhaite être orienté, je vois le formulaire sur les autres besoins', async () => {
				const user = userEvent.setup();

				renderComponent();

				await user.click(screen.getByRole('button', { name: 'Non, je ne bénéficie d‘aucun accompagnement' }));
				await user.click(screen.getByRole('button', { name: 'Entre 18 et 25 ans' }));
				await user.click(screen.getByRole('button', { name: 'Oui' }));

				expect(screen.getByText('Rencontrez-vous d’autres besoins ?')).toBeVisible();
				// TODO (BRUJ 04/06/2024): ne devrait pas être des boutons mais des checkbox
				expect(screen.getByRole('button', { name: 'Logement' })).toBeVisible();
				expect(screen.getByRole('button', { name: 'Santé' })).toBeVisible();
				expect(screen.getByRole('button', { name: 'Difficultés administratives ou juridiques' })).toBeVisible();
				expect(screen.getByRole('button', { name: 'Problématique d‘accès aux droits' })).toBeVisible();
				expect(screen.getByRole('button', { name: 'Maîtrise de français' })).toBeVisible();
				expect(screen.getByRole('button', { name: 'Contraintes familiales' })).toBeVisible();
			});
		});

		describe('quand on clique sur Plus de 25 ans', () => {
			describe('et qu‘on souhaite être orienté', () => {
				it('affiche le formulaire sur le handicao', async () => {
					// Given
					const user = userEvent.setup();
					const contenuModal = 'Êtes-vous en situation de handicap (RQTH) ?';

					renderComponent();

					// When
					await user.click(screen.getByRole('button', { name: 'Non, je ne bénéficie d‘aucun accompagnement' }));
					await user.click(screen.getByRole('button', { name: 'Plus de 25 ans' }));
					await user.click(screen.getByRole('button', { name: 'Oui' }));

					expect(screen.getByText(contenuModal)).toBeVisible();
					expect(screen.getByRole('button', { name: 'Oui' })).toBeVisible();
					expect(screen.getByRole('button', { name: 'Non' })).toBeVisible();
				});

				it('et qu‘on est en situation de handicap, affiche le formulaire autre besoin', async () => {
					const user = userEvent.setup();

					renderComponent();

					await user.click(screen.getByRole('button', { name: 'Non, je ne bénéficie d‘aucun accompagnement' }));
					await user.click(screen.getByRole('button', { name: 'Plus de 25 ans' }));
					await user.click(screen.getByRole('button', { name: 'Oui' }));
					await user.click(screen.getByRole('button', { name: 'Oui' }));

					expect(screen.getByText('Rencontrez-vous d’autres besoins ?')).toBeVisible();
					// TODO (BRUJ 04/06/2024): ne devrait pas être des boutons mais des checkbox
					expect(screen.getByRole('button', { name: 'Logement' })).toBeVisible();
					expect(screen.getByRole('button', { name: 'Santé' })).toBeVisible();
					expect(screen.getByRole('button', { name: 'Difficultés administratives ou juridiques' })).toBeVisible();
					expect(screen.getByRole('button', { name: 'Problématique d‘accès aux droits' })).toBeVisible();
					expect(screen.getByRole('button', { name: 'Maîtrise de français' })).toBeVisible();
					expect(screen.getByRole('button', { name: 'Contraintes familiales' })).toBeVisible();				});

				it('et qu‘on n‘est pas en situation de handicap, affiche la modale de redirection vers france travail', async () => {
					const user = userEvent.setup();

					renderComponent();

					await user.click(screen.getByRole('button', { name: 'Non, je ne bénéficie d‘aucun accompagnement' }));
					await user.click(screen.getByRole('button', { name: 'Plus de 25 ans' }));
					await user.click(screen.getByRole('button', { name: 'Oui' }));
					await user.click(screen.getByRole('button', { name: 'Non' }));

					expect(screen.getByRole('dialog', { name: 'Vous pouvez bénéficier des services de France Travail' })).toBeVisible();
					const linkFranceTravail = screen.getByRole('link', { name: 'S‘inscrire à France Travail - nouvelle fenêtre' });
					expect(linkFranceTravail).toBeVisible();
					expect(linkFranceTravail).toHaveAttribute('href', 'https://candidat.francetravail.fr/inscription-en-ligne/accueil');
				});
			});
			it('et qu‘on ne souhaite pas être orienté, affiche le formulaire des dispositifs', async () => {
				const user = userEvent.setup();
				renderComponent();

				await user.click(screen.getByRole('button', { name: 'Non, je ne bénéficie d‘aucun accompagnement' }));
				await user.click(screen.getByRole('button', { name: 'Plus de 25 ans' }));
				await user.click(screen.getByRole('button', { name: 'Non' }));

				expect(screen.getByRole('dialog', { name: 'Découvrez les dispositifs référencés sur le portail 1jeune1solution' })).toBeVisible();

				const linkDecouvrezOffres = screen.getByRole('link', { name: 'Découvrez nos offres' });
				expect(linkDecouvrezOffres).toBeVisible();
				expect(linkDecouvrezOffres).toHaveAttribute('href', '/#offres');

				const linkFormation = screen.getByRole('link', { name: 'Formation et orientation' });
				expect(linkFormation).toBeVisible();
				expect(linkFormation).toHaveAttribute('href', '/#formation');

				const linkAidesAccompagnement = screen.getByRole('link', { name: 'Aides et accompagnement' });
				expect(linkAidesAccompagnement).toBeVisible();
				expect(linkAidesAccompagnement).toHaveAttribute('href', '/#aides-orientation-accompagnement');

				const linkEngagement = screen.getByRole('link', { name: 'Engagement' });
				expect(linkEngagement).toBeVisible();
				expect(linkEngagement).toHaveAttribute('href', '/#engagement-benevolat');
			});

			it('ça te renvoie chez France Travail sur la page Inscription', async () => {
				// Given
				const user = userEvent.setup();
				const contenuModal = 'Vous pouvez bénéficier des services de France Travail';
				const inscriptionFranceTravail = 'S‘inscrire à France Travail - nouvelle fenêtre';

				renderComponent();
				// When
				await user.click(screen.getByRole('button', { name: 'Non, je ne bénéficie d‘aucun accompagnement' }));
				await user.click(screen.getByRole('button', { name: 'Plus de 25 ans' }));
				await user.click(screen.getByRole('button', { name: 'Oui' }));
				await user.click(screen.getByRole('button', { name: 'Non' }));

				// Then
				expect(screen.getByText(contenuModal)).toBeVisible();
				const link = screen.getByRole('link', { name: inscriptionFranceTravail });
				expect(link).toBeVisible();
				expect(link).toHaveAttribute('href', expect.stringContaining('https://candidat.francetravail.fr/inscription-en-ligne/accueil'));
				expect(link).toHaveAttribute('target', '_blank');
			});
		});
	});

	describe('quand je clique sur "Oui je suis accompagné par la Mission Locale"', () => {
		it('je vois la modale avec le formulaire Mission Locale', async () => {
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

			expect(screen.getByRole('dialog', { name: 'Vous pouvez bénéficier d’un accompagnement répondant à vos besoins auprès de votre Mission Locale' })).toBeVisible();
			expect(screen.getByRole('textbox', { name: 'Prénom Exemple : Jean' })).toBeVisible();
			expect(screen.getByRole('textbox', { name: 'Nom Exemple : Dupont' })).toBeVisible();
			expect(screen.getByRole('textbox', { name: 'Adresse e-mail Exemple : jean.dupont@gmail.com' })).toBeVisible();
			expect(screen.getByRole('textbox', { name: 'Téléphone Exemple : 0606060606' })).toBeVisible();
			expect(screen.getByRole('combobox', { name: 'Ville Exemples : Paris, Béziers…' })).toBeVisible();
			expect(screen.getByRole('combobox', { name: 'Age Exemple : 16 ans' })).toBeVisible();

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

					await remplirFormulaire();

					await user.click(screen.getByRole('button', { name: 'Envoyer la demande' }));

					expect(screen.getByRole('dialog', { name: 'Une erreur est survenue lors de l‘envoi du formulaire' })).toBeVisible();
					expect(screen.queryByRole('dialog', { name: 'Vous pouvez bénéficier d’un accompagnement répondant à vos besoins auprès de votre Mission Locale' })).not.toBeInTheDocument();
				});

				it('lorsque je clique sur le bouton Retour au formulaire, ferme la modale d‘erreur et ouvre la modale de formulaire', async () => {
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

					await remplirFormulaire();

					await user.click(screen.getByRole('button', { name: 'Envoyer la demande' }));

					const modaleErreur = screen.getByRole('dialog', { name: 'Une erreur est survenue lors de l‘envoi du formulaire' });
					await user.click(within(modaleErreur).getByRole('button', { name: 'Retour au formulaire' }));
					expect(modaleErreur).not.toBeInTheDocument();

					expect(screen.getByRole('dialog', { name: 'Vous pouvez bénéficier d’un accompagnement répondant à vos besoins auprès de votre Mission Locale' })).toBeVisible();
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
							<Accompagnement/>
						</DependenciesProvider>,
					);

					const boutonFormulaireMissionLocale = screen.getByRole('button', { name: 'Oui, je suis accompagné(e) par la Mission Locale' });
					await user.click(boutonFormulaireMissionLocale);

					await remplirFormulaire();

					await user.click(screen.getByRole('button', { name: 'Envoyer la demande' }));

					const modaleErreur = screen.getByRole('dialog', { name: 'Une erreur est survenue lors de l‘envoi du formulaire' });
					await user.click(within(modaleErreur).getByRole('button', { name: 'Fermer' }));
					expect(modaleErreur).not.toBeInTheDocument();

					expect(screen.queryByRole('dialog', { name: 'Vous pouvez bénéficier d’un accompagnement répondant à vos besoins auprès de votre Mission Locale' })).not.toBeInTheDocument();
				});
			});
		});
	});

	describe('quand l‘utilisateur clique sur "Oui je suis accompagné(e) par France Travail"', () => {
		it('ouvre une modale avec la redirection vers France Travail', async () => {
			// Given
			const user = userEvent.setup();
			const franceTravail = 'Oui, je suis accompagné(e) par France Travail';
			const jeContacteMonConseiller = 'Contacter mon conseiller';
			renderComponent();

			// When
			await user.click(screen.getByText(franceTravail));

			// Then
			expect(screen.getByRole('dialog', { name: 'Vous pouvez bénéficier d’informations sur le Contrat d’Engagement Jeune auprès de votre conseiller France Travail' })).toBeVisible();
			const link = screen.getByRole('link', { name: `${jeContacteMonConseiller} - nouvelle fenêtre` });
			expect(link).toBeVisible();
			expect(link).toHaveAttribute('href', expect.stringContaining('francetravail.fr'));
			expect(link).toHaveAttribute('target', '_blank');
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

	const selectAge = screen.getByRole('combobox', { name: 'Age Exemple : 16 ans' });
	await user.click(selectAge);
	await user.click(screen.getByRole('option', { name: formulaireContact.age }));
}
