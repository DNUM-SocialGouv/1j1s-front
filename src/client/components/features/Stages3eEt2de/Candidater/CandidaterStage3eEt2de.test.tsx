/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import CandidaterStage3eEt2de from '~/client/components/features/Stages3eEt2de/Candidater/CandidaterStage3eEt2de';
import {
	aDonneesEntrepriseStage3eEt2de,
} from '~/client/components/features/Stages3eEt2de/Candidater/donneesEntreprise.fixture';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSessionStorage } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aStage3eEt2deService } from '~/client/services/stage3eEt2de/stage3eEt2de.service.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { ModeDeContact } from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de';
import {
	aCandidatureEnPersonneStage3eEt2de,
	aCandidatureTelephoneStage3eEt2de,
} from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de.fixture';

describe('Candidater à un stage de 3e et 2de', () => {
	beforeEach(() => {
		mockUseRouter({});
	});
	it('affiche un titre avec le nom de l’entreprise', () => {
		// GIVEN
		const donneesEntreprise = aDonneesEntrepriseStage3eEt2de(
			{
				appellations: [
					{
						code: 'code',
						label: 'label',
					},
				],
				modeDeContact: ModeDeContact.IN_PERSON,
				nomEntreprise: 'Carrefour',
				siret: '37000000000000',
			});

		// WHEN
		render(
			<DependenciesProvider stage3eEt2deService={aStage3eEt2deService()}>
				<CandidaterStage3eEt2de
					donneesEntreprise={donneesEntreprise}
				/>
			</DependenciesProvider>,
		);

		// THEN
		const titre = screen.getByRole('heading', { level: 1 });
		expect(titre).toBeVisible();
		expect(titre).toHaveTextContent('Je candidate à l’offre de stage de 3e ou de 2de de l’entreprise Carrefour');
	});

	describe('lorsque le mode de contact est par téléphone', () => {
		it('affiche un texte explicatif du process de candidature', () => {
			// GIVEN
			const donneesEntreprise = aDonneesEntrepriseStage3eEt2de(
				{
					appellations: [
						{
							code: 'code',
							label: 'label',
						},
					],
					modeDeContact: ModeDeContact.PHONE,
					nomEntreprise: 'Carrefour',
					siret: '37000000000000',
				});

			// WHEN
			render(
				<DependenciesProvider stage3eEt2deService={aStage3eEt2deService()}>
					<CandidaterStage3eEt2de
						donneesEntreprise={donneesEntreprise}
					/>
				</DependenciesProvider>,
			);

			// THEN
			const explicationPart1 = screen.getByText('Cette entreprise souhaite être contactée par téléphone. Merci de nous indiquer vos coordonnées.');
			const explicationPart2 = screen.getByText('Nous allons vous transmettre par e-mail le nom de la personne à contacter, son numéro de téléphone ainsi que des conseils pour présenter votre demande d’immersion. Ces informations sont personnelles et confidentielles. Elles ne peuvent pas être communiquées à d’autres personnes.');
			expect(explicationPart1).toBeVisible();
			expect(explicationPart2).toBeVisible();
		});
	});

	describe('lorsque le mode de contact est en personne', () => {
		it('affiche un texte explicatif du process de candidature', () => {
			// GIVEN
			const donneesEntreprise = aDonneesEntrepriseStage3eEt2de(
				{
					appellations: [
						{
							code: 'code',
							label: 'label',
						},
					],
					modeDeContact: ModeDeContact.IN_PERSON,
					nomEntreprise: 'Carrefour',
					siret: '37000000000000',
				});

			// WHEN
			render(
				<DependenciesProvider stage3eEt2deService={aStage3eEt2deService()}>
					<CandidaterStage3eEt2de
						donneesEntreprise={donneesEntreprise}
					/>
				</DependenciesProvider>,
			);

			// THEN
			const explicationPart1 = screen.getByText('Cette entreprise souhaite que vous vous présentiez directement pour candidater. Merci de nous indiquer vos coordonnées.');
			const explicationPart2 = screen.getByText('Vous recevrez par e-mail le nom de la personne à contacter ainsi que des conseils pour présenter votre demande d’immersion. Ces informations sont personnelles et confidentielles. Elles ne peuvent pas être communiquées à d’autres personnes.');
			expect(explicationPart1).toBeVisible();
			expect(explicationPart2).toBeVisible();
		});
	});

	describe('lorsque le mode de contact est par email', () => {
		it('affiche un texte explicatif du process de candidature', () => {
			// GIVEN
			const donneesEntreprise = aDonneesEntrepriseStage3eEt2de(
				{
					modeDeContact: ModeDeContact.EMAIL,
				});

			// WHEN
			render(
				<DependenciesProvider stage3eEt2deService={aStage3eEt2deService()}>
					<CandidaterStage3eEt2de
						donneesEntreprise={donneesEntreprise}
					/>
				</DependenciesProvider>,
			);

			// THEN
			const explicationPart = screen.getByText('Cette entreprise a choisi d’être contactée par e-mail. Veuillez compléter ce formulaire qui sera transmis à l’entreprise.');
			expect(explicationPart).toBeVisible();
		});
	});


	describe('formulaire de candidature', () => {
		describe('lorsque que le mode de contact est par téléphone ou en personne', () => {
			it('affiche un bouton de retour à la recherche', async () => {
				// GIVEN
				const routerBack = jest.fn();
				mockUseRouter({ back: routerBack });
				mockSessionStorage({
					getItem: jest.fn().mockReturnValue('/page-1'),
				});
				const user = userEvent.setup();
				const donneesEntreprise = aDonneesEntrepriseStage3eEt2de(
					{
						appellations: [
							{
								code: 'code',
								label: 'label',
							},
						],
						modeDeContact: ModeDeContact.IN_PERSON,
						nomEntreprise: 'Carrefour',
						siret: '37000000000000',
					});

				// WHEN
				render(
					<DependenciesProvider stage3eEt2deService={aStage3eEt2deService()}>
						<CandidaterStage3eEt2de
							donneesEntreprise={donneesEntreprise}
						/>
					</DependenciesProvider>,
				);
				const boutonRetour = screen.getByRole('button', { name: 'Retour à la recherche' });
				await user.click(boutonRetour);

				// THEN
				expect(boutonRetour).toBeVisible();
				expect(routerBack).toHaveBeenCalled();
			});

			it('affiche un message indiquant que tous les champs sont obligatoires', () => {
				// GIVEN
				const donneesEntreprise = aDonneesEntrepriseStage3eEt2de(
					{
						appellations: [
							{
								code: 'code',
								label: 'label',
							},
						],
						modeDeContact: ModeDeContact.IN_PERSON,
						nomEntreprise: 'Carrefour',
						siret: '37000000000000',
					});

				// WHEN
				render(
					<DependenciesProvider stage3eEt2deService={aStage3eEt2deService()}>
						<CandidaterStage3eEt2de
							donneesEntreprise={donneesEntreprise}
						/>
					</DependenciesProvider>,
				);
				// THEN
				const message = screen.getByText('Tous les champs sont obligatoires (sauf mention contraire)');
				expect(message).toBeVisible();
			});
			it('affiche un formulaire de candidature en une étape', () => {
				// GIVEN
				const donneesEntreprise = aDonneesEntrepriseStage3eEt2de(
					{
						appellations: [
							{
								code: 'code',
								label: 'label',
							},
						],
						modeDeContact: ModeDeContact.IN_PERSON,
						nomEntreprise: 'Carrefour',
						siret: '37000000000000',
					});

				// WHEN
				render(
					<DependenciesProvider stage3eEt2deService={aStage3eEt2deService()}>
						<CandidaterStage3eEt2de
							donneesEntreprise={donneesEntreprise}
						/>
					</DependenciesProvider>,
				);
				// THEN
				const formulaire = screen.getByRole('form', { name: 'Candidater à l’offre de stage de 3e et 2de de l’entreprise Carrefour' });
				expect(formulaire).toBeVisible();
				const inputPrenom = screen.getByRole('textbox', { name: 'Prénom Exemple : Alexis' });
				expect(inputPrenom).toHaveAttribute('autocomplete', 'given-name');
				expect(inputPrenom).toBeVisible();
				const inputNom = screen.getByRole('textbox', { name: 'Nom Exemple : Dupont' });
				expect(inputNom).toHaveAttribute('autocomplete', 'family-name');
				expect(inputNom).toBeVisible();
				const inputEmail = screen.getByRole('textbox', { name: 'E-mail Exemple : alexis.dupont@example.com' });
				expect(inputEmail).toHaveAttribute('autocomplete', 'email');
				expect(inputEmail).toBeVisible();
				const boutonEnvoyer = screen.getByRole('button', { name: 'Envoyer les informations' });
				expect(boutonEnvoyer).toBeVisible();
			});
			it('affiche un message indiquant que les données sont collectées et traitées par la DGEFP', () => {
				// GIVEN
				const donneesEntreprise = aDonneesEntrepriseStage3eEt2de(
					{
						appellations: [
							{
								code: 'code',
								label: 'label',
							},
						],
						modeDeContact: ModeDeContact.IN_PERSON,
						nomEntreprise: 'Carrefour',
						siret: '37000000000000',
					},
				);

				// WHEN
				render(
					<DependenciesProvider stage3eEt2deService={aStage3eEt2deService()}>
						<CandidaterStage3eEt2de
							donneesEntreprise={donneesEntreprise}
						/>
					</DependenciesProvider>,
				);

				// THEN
				const message = screen.getByText('Vous êtes informé que vos données à caractère personnel sont collectées et traitées par la DGEFP pour répondre à votre demande. Pour en savoir plus vous pouvez consulter la politique de confidentialité et les CGU de la DGEFP. En cliquant sur "Envoyer mes informations", vos données seront transmises à la mission locale de la zone géographique dans laquelle vous résidez pour que celle-ci prenne contact avec vous');
				expect(message).toBeVisible();
			});
		});
		describe('lorsque que le mode de contact est par mail', () => {
			it('affiche un bouton de retour à la recherche', async () => {
				// GIVEN
				const routerBack = jest.fn();
				mockUseRouter({ back: routerBack });
				mockSessionStorage({
					getItem: jest.fn().mockReturnValue('/page-1'),
				});
				const user = userEvent.setup();
				const donneesEntreprise = aDonneesEntrepriseStage3eEt2de(
					{
						modeDeContact: ModeDeContact.EMAIL,
					});

				// WHEN
				render(
					<DependenciesProvider stage3eEt2deService={aStage3eEt2deService()}>
						<CandidaterStage3eEt2de
							donneesEntreprise={donneesEntreprise}
						/>
					</DependenciesProvider>,
				);
				const boutonRetour = screen.getByRole('button', { name: 'Retour à la recherche' });
				await user.click(boutonRetour);

				// THEN
				expect(boutonRetour).toBeVisible();
				expect(routerBack).toHaveBeenCalled();
			});
			it('affiche un message indiquant que tous les champs sont obligatoires', () => {
				// GIVEN
				const donneesEntreprise = aDonneesEntrepriseStage3eEt2de(
					{
						modeDeContact: ModeDeContact.EMAIL,
					});

				// WHEN
				render(
					<DependenciesProvider stage3eEt2deService={aStage3eEt2deService()}>
						<CandidaterStage3eEt2de
							donneesEntreprise={donneesEntreprise}
						/>
					</DependenciesProvider>,
				);
				// THEN
				const message = screen.getByText('Tous les champs sont obligatoires (sauf mention contraire)');
				expect(message).toBeVisible();
			});

			describe('Etape 1', () => {
				it('affiche l’étape courante du formulaire', () => {
					// GIVEN
					const donneesEntreprise = aDonneesEntrepriseStage3eEt2de(
						{
							modeDeContact: ModeDeContact.EMAIL,
						});

					// WHEN
					render(
						<DependenciesProvider stage3eEt2deService={aStage3eEt2deService()}>
							<CandidaterStage3eEt2de
								donneesEntreprise={donneesEntreprise}
							/>
						</DependenciesProvider>,
					);

					// THEN
					const etapeCourante = screen.getByText('Étape 1 sur 2 : Informations personnelles');
					expect(etapeCourante).toBeVisible();
				});
				it('affiche une étape de formulaire concernant les données personnelles qui peuvent être remplis automatiquement', () => {
					// GIVEN
					const donneesEntreprise = aDonneesEntrepriseStage3eEt2de(
						{
							modeDeContact: ModeDeContact.EMAIL,
							nomEntreprise: 'Carrefour',
						});

					// WHEN
					render(
						<DependenciesProvider stage3eEt2deService={aStage3eEt2deService()}>
							<CandidaterStage3eEt2de
								donneesEntreprise={donneesEntreprise}
							/>
						</DependenciesProvider>,
					);

					// THEN
					const formulaire = screen.getByRole('form', { name: 'Candidater à l’offre de stage de 3e et 2de de l’entreprise Carrefour' });
					expect(formulaire).toBeVisible();
					const inputPrenom = screen.getByRole('textbox', { name: 'Prénom Exemple : Alexis' });
					expect(inputPrenom).toHaveAttribute('autocomplete', 'given-name');
					expect(inputPrenom).toBeVisible();
					const inputNom = screen.getByRole('textbox', { name: 'Nom Exemple : Dupont' });
					expect(inputNom).toHaveAttribute('autocomplete', 'family-name');
					expect(inputNom).toBeVisible();
					const inputEmail = screen.getByRole('textbox', { name: 'E-mail Exemple : alexis.dupont@example.com' });
					expect(inputEmail).toHaveAttribute('autocomplete', 'email');
					expect(inputEmail).toBeVisible();
					const inputTelephone = screen.getByRole('textbox', { name: 'Téléphone Exemples : 0601020304 ou +33601020304' });
					expect(inputTelephone).toHaveAttribute('autocomplete', 'tel');
					expect(inputTelephone).toBeVisible();

					const boutonEtapeSuivante = screen.getByRole('button', { name: 'Étape suivante' });
					expect(boutonEtapeSuivante).toBeVisible();
				});
				it('on peut passer à l’étape 2, une fois les champs remplis', async () => {
					// GIVEN
					const donneesEntreprise = aDonneesEntrepriseStage3eEt2de(
						{
							modeDeContact: ModeDeContact.EMAIL,
							nomEntreprise: 'Carrefour',
						});
					const user = userEvent.setup();

					// WHEN
					render(
						<DependenciesProvider stage3eEt2deService={aStage3eEt2deService()}>
							<CandidaterStage3eEt2de
								donneesEntreprise={donneesEntreprise}
							/>
						</DependenciesProvider>,
					);

					// THEN
					const boutonEtapeSuivante = screen.getByRole('button', { name: 'Étape suivante' });
					expect(boutonEtapeSuivante).toBeDisabled();

					const inputPrenom = screen.getByRole('textbox', { name: 'Prénom Exemple : Alexis' });
					await user.type(inputPrenom, 'Alexis');

					const inputNom = screen.getByRole('textbox', { name: 'Nom Exemple : Dupont' });
					await user.type(inputNom, 'Dupont');

					const inputEmail = screen.getByRole('textbox', { name: 'E-mail Exemple : alexis.dupont@example.com' });
					await user.type(inputEmail, 'alexis.dupont@example.com');

					const inputTelephone = screen.getByRole('textbox', { name: 'Téléphone Exemples : 0601020304 ou +33601020304' });
					await user.type(inputTelephone, '0601020304');

					expect(boutonEtapeSuivante).not.toBeDisabled();
					await user.click(boutonEtapeSuivante);

					const etapeCourante = screen.getByText('Étape 2 sur 2 : Objet de votre demande');
					expect(etapeCourante).toBeVisible();
				});
			});
			describe('Etape 2', () => {
				it.todo('le focus est replacé sur l’élément indiquant l’étape du formulaire');
				it.todo('je peux retourner a l’étape précédente');
				it.todo('le champ du message pour l’entreprise est limité à 500 caractères');
				it.todo('le champ du message pour l’entreprise est pré-rempli');
				it.todo('affiche un message indiquant que les données sont collectées et traitées par la DGEFP');
			});
		});
	});


	describe('affiche les métiers de l’entreprise dans le formulaire', () => {
		describe('lorsque l’entreprise ne propose qu’un seul métier', () => {
			it('affiche un champ de sélection du métier désactivé avec comme valeur le métier', () => {
				// GIVEN
				const donneesEntreprise = aDonneesEntrepriseStage3eEt2de(
					{
						appellations: [
							{
								code: 'code',
								label: 'label du métier',
							},
						],
						modeDeContact: ModeDeContact.IN_PERSON,
						nomEntreprise: 'Carrefour',
						siret: '37000000000000',
					},
				);

				// WHEN
				render(
					<DependenciesProvider stage3eEt2deService={aStage3eEt2deService()}>
						<CandidaterStage3eEt2de
							donneesEntreprise={donneesEntreprise}
						/>
					</DependenciesProvider>,
				);
				// THEN
				const inputAppellation = screen.getByRole('textbox', { name: 'Métier sur lequel porte la demande d’immersion Un ou plusieurs métiers ont été renseignés par l’entreprise' });
				expect(inputAppellation).toBeVisible();
				expect(inputAppellation).toHaveAttribute('readonly');
				expect(inputAppellation).toHaveValue('label du métier');
				expect(inputAppellation).toHaveAttribute('type', 'text');
			});
		});

		describe('lorsque l’entreprise propose plusieurs métiers', () => {
			it('affiche un champ de sélection du métier actif', async () => {
				// GIVEN
				const user = userEvent.setup();
				const donneesEntreprise = aDonneesEntrepriseStage3eEt2de(
					{
						appellations: [
							{
								code: 'code',
								label: 'label',
							},
							{
								code: 'code2',
								label: 'label2',
							}],
						modeDeContact: ModeDeContact.IN_PERSON,
						nomEntreprise: 'Carrefour',
						siret: '37000000000000',
					},
				);

				// WHEN
				render(
					<DependenciesProvider stage3eEt2deService={aStage3eEt2deService()}>
						<CandidaterStage3eEt2de
							donneesEntreprise={donneesEntreprise}
						/>
					</DependenciesProvider>,
				);
				const inputAppellation = screen.getByRole('button', { name: 'Métier sur lequel porte la demande d’immersion Un ou plusieurs métiers ont été renseignés par l’entreprise' });

				await user.click(inputAppellation);
				const options = screen.getByRole('listbox');
				const metierOptions = within(options).getAllByRole('option');

				// THEN
				expect(inputAppellation).toBeVisible();
				expect(inputAppellation).not.toBeDisabled();
				expect(metierOptions).toHaveLength(2);
				expect(metierOptions[0]).toHaveTextContent('label');
				expect(metierOptions[1]).toHaveTextContent('label2');
			});
		});
	});

	describe('soumission du formulaire', () => {
		describe('lorsque la candidature est par telephone', () => {
			describe('lorsque plusieurs métiers sont proposés', () => {
				it('envoie les données de la candidature', async () => {
					// GIVEN
					const donneesEntreprise = aDonneesEntrepriseStage3eEt2de(
						{
							appellations: [
								{
									code: '12345',
									label: 'Chargé / Chargée de relations entreprises',
								},
								{
									code: '67890',
									label: 'Boulanger / Boulangère',
								}],
							modeDeContact: ModeDeContact.PHONE,
							nomEntreprise: 'Carrefour',
							siret: '12345678912345',
						},
					);
					const user = userEvent.setup();
					const stage3eEt2deService = aStage3eEt2deService();
					render(<DependenciesProvider stage3eEt2deService={stage3eEt2deService}>
						<CandidaterStage3eEt2de
							donneesEntreprise={donneesEntreprise}
						/>
					</DependenciesProvider>);
					await remplirLeFormulaire({
						email: 'alexis.dupont@example.com',
						metierLabel: 'Chargé / Chargée de relations entreprises',
						nom: 'Dupont',
						prenom: 'Alexis',
					});

					// WHEN
					const envoyerBouton = screen.getByRole('button', { name: 'Envoyer les informations' });
					await user.click(envoyerBouton);

					// THEN
					const expectedCandidature3eEt2de = aCandidatureTelephoneStage3eEt2de({
						appellationCode: '12345',
						email: 'alexis.dupont@example.com',
						modeDeContact: ModeDeContact.PHONE,
						nom: 'Dupont',
						prenom: 'Alexis',
						siret: '12345678912345',
					});
					expect(stage3eEt2deService.candidaterStage3eEt2de).toHaveBeenCalledWith(expectedCandidature3eEt2de);
				});
			});

			describe('lorsque un seul métier est proposé', () => {
				it('envoie les données de la candidature', async () => {
					// GIVEN
					const donneesEntreprise = aDonneesEntrepriseStage3eEt2de(
						{
							appellations: [
								{
									code: '12345',
									label: 'Boulanger / Boulangère',
								},
							],
							modeDeContact: ModeDeContact.PHONE,
							nomEntreprise: 'Carrefour',
							siret: '12345678912345',
						},
					);
					const user = userEvent.setup();
					const stage3eEt2deService = aStage3eEt2deService();
					render(<DependenciesProvider stage3eEt2deService={stage3eEt2deService}>
						<CandidaterStage3eEt2de
							donneesEntreprise={donneesEntreprise}
						/>
					</DependenciesProvider>);
					await remplirLeFormulaire({
						email: 'alexis.dupont@example.com',
						nom: 'Dupont',
						prenom: 'Alexis',
					});

					// WHEN
					const envoyerBouton = screen.getByRole('button', { name: 'Envoyer les informations' });
					await user.click(envoyerBouton);

					// THEN
					const expectedCandidature3eEt2de = aCandidatureTelephoneStage3eEt2de({
						appellationCode: '12345',
						email: 'alexis.dupont@example.com',
						modeDeContact: ModeDeContact.PHONE,
						nom: 'Dupont',
						prenom: 'Alexis',
						siret: '12345678912345',
					});
					expect(stage3eEt2deService.candidaterStage3eEt2de).toHaveBeenCalledWith(expectedCandidature3eEt2de);
				});
			});
		});

		describe('lorsque la candidature est en personne', () => {
			describe('lorsque plusieurs métiers sont proposés', () => {
				it('envoie les données de la candidature', async () => {
					// GIVEN
					const donneesEntreprise = aDonneesEntrepriseStage3eEt2de(
						{
							appellations: [
								{
									code: '12345',
									label: 'Chargé / Chargée de relations entreprises',
								},
								{
									code: '67890',
									label: 'Boulanger / Boulangère',
								}],
							modeDeContact: ModeDeContact.IN_PERSON,
							nomEntreprise: 'Carrefour',
							siret: '12345678912345',
						},
					);
					const user = userEvent.setup();
					const stage3eEt2deService = aStage3eEt2deService();
					render(<DependenciesProvider stage3eEt2deService={stage3eEt2deService}>
						<CandidaterStage3eEt2de
							donneesEntreprise={donneesEntreprise}
						/>
					</DependenciesProvider>);
					await remplirLeFormulaire({
						email: 'alexis.dupont@example.com',
						metierLabel: 'Chargé / Chargée de relations entreprises',
						nom: 'Dupont',
						prenom: 'Alexis',
					});

					// WHEN
					const envoyerBouton = screen.getByRole('button', { name: 'Envoyer les informations' });
					await user.click(envoyerBouton);

					// THEN
					const expectedCandidature3eEt2de = aCandidatureEnPersonneStage3eEt2de({
						appellationCode: '12345',
						email: 'alexis.dupont@example.com',
						modeDeContact: ModeDeContact.IN_PERSON,
						nom: 'Dupont',
						prenom: 'Alexis',
						siret: '12345678912345',
					});
					expect(stage3eEt2deService.candidaterStage3eEt2de).toHaveBeenCalledWith(expectedCandidature3eEt2de);
				});
			});

			describe('lorsque un seul métier est proposé', () => {
				it('envoie les données de la candidature', async () => {
					// GIVEN
					const donneesEntreprise = aDonneesEntrepriseStage3eEt2de(
						{
							appellations: [
								{
									code: '12345',
									label: 'Boulanger / Boulangère',
								},
							],
							modeDeContact: ModeDeContact.IN_PERSON,
							nomEntreprise: 'Carrefour',
							siret: '12345678912345',
						},
					);
					const user = userEvent.setup();
					const stage3eEt2deService = aStage3eEt2deService();
					render(<DependenciesProvider stage3eEt2deService={stage3eEt2deService}>
						<CandidaterStage3eEt2de
							donneesEntreprise={donneesEntreprise}
						/>
					</DependenciesProvider>);
					await remplirLeFormulaire({
						email: 'alexis.dupont@example.com',
						nom: 'Dupont',
						prenom: 'Alexis',
					});

					// WHEN
					const envoyerBouton = screen.getByRole('button', { name: 'Envoyer les informations' });
					await user.click(envoyerBouton);

					// THEN
					const expectedCandidature3eEt2de = aCandidatureEnPersonneStage3eEt2de({
						appellationCode: '12345',
						email: 'alexis.dupont@example.com',
						modeDeContact: ModeDeContact.IN_PERSON,
						nom: 'Dupont',
						prenom: 'Alexis',
						siret: '12345678912345',
					});
					expect(stage3eEt2deService.candidaterStage3eEt2de).toHaveBeenCalledWith(expectedCandidature3eEt2de);
				});
			});
		});

		describe('lorsque la candidature est envoyée avec succès', () => {
			describe('lorsque la candidature est par téléphone', () => {
				it('affiche une page de succès', async () => {
					// GIVEN
					mockUseRouter({ query: { modeDeContact: ModeDeContact.PHONE } });
					const donneesEntreprise = aDonneesEntrepriseStage3eEt2de({
						appellations: [
							{
								code: '12345',
								label: 'Chargé / Chargée de relations entreprises',
							},
							{
								code: '67890',
								label: 'Boulanger / Boulangère',
							}],
						modeDeContact: ModeDeContact.PHONE,
						nomEntreprise: 'Carrefour',
						siret: '12345678912345',
					});
					const user = userEvent.setup();
					const stage3eEt2deService = aStage3eEt2deService();
					jest.spyOn(stage3eEt2deService, 'candidaterStage3eEt2de').mockResolvedValue(createSuccess(undefined));

					// WHEN
					render(<DependenciesProvider stage3eEt2deService={stage3eEt2deService}>
						<CandidaterStage3eEt2de
							donneesEntreprise={donneesEntreprise}
						/>
					</DependenciesProvider>);

					await remplirLeFormulaire({
						email: 'alexis.dupont@example.com',
						metierLabel: 'Chargé / Chargée de relations entreprises',
						nom: 'Dupont',
						prenom: 'Alexis',
					});
					const envoyerBouton = screen.getByRole('button', { name: 'Envoyer les informations' });
					await user.click(envoyerBouton);

					// THEN
					const contenuStatus = screen.getByRole('status');
					const titre = within(contenuStatus).getByRole('heading', { level: 1 });
					expect(titre).toBeVisible();
					expect(titre).toHaveTextContent('Félicitations, vos informations ont bien été envoyées');
					const texte = screen.getByText('L’entreprise a choisi d’être contactée par télephone. Elle recevra donc vos informations et vous recontactera par la suite.');
					expect(texte).toBeVisible();
				});
			});

			describe('lorsque la candidature est en personne', () => {
				it('affiche une page de succès', async () => {
					// GIVEN
					mockUseRouter({ query: { modeDeContact: ModeDeContact.IN_PERSON } });
					const donneesEntreprise = aDonneesEntrepriseStage3eEt2de({
						appellations: [
							{
								code: '12345',
								label: 'Chargé / Chargée de relations entreprises',
							},
							{
								code: '67890',
								label: 'Boulanger / Boulangère',
							}],
						modeDeContact: ModeDeContact.IN_PERSON,
						nomEntreprise: 'Carrefour',
						siret: '12345678912345',
					});
					const user = userEvent.setup();
					const stage3eEt2deService = aStage3eEt2deService();
					jest.spyOn(stage3eEt2deService, 'candidaterStage3eEt2de').mockResolvedValue(createSuccess(undefined));

					// WHEN
					render(<DependenciesProvider stage3eEt2deService={stage3eEt2deService}>
						<CandidaterStage3eEt2de
							donneesEntreprise={donneesEntreprise}
						/>
					</DependenciesProvider>);
					await remplirLeFormulaire({
						email: 'alexis.dupont@example.com',
						metierLabel: 'Chargé / Chargée de relations entreprises',
						nom: 'Dupont',
						prenom: 'Alexis',
					});
					const envoyerBouton = screen.getByRole('button', { name: 'Envoyer les informations' });
					await user.click(envoyerBouton);

					// THEN
					const contenuStatus = screen.getByRole('status');
					const titre = within(contenuStatus).getByRole('heading', { level: 1 });
					expect(titre).toBeVisible();
					expect(titre).toHaveTextContent('Félicitations, vos informations ont bien été envoyées');
					const texte = screen.getByText('L’entreprise a choisi que vous vous présentiez directement pour candidater. Elle recevra donc vos informations et vous recontactera par la suite.');
					expect(texte).toBeVisible();
				});
			});

			it('affiche un lien de retour à l’accueil', async () => {
				// GIVEN
				const donneesEntreprise = aDonneesEntrepriseStage3eEt2de({
					appellations: [
						{
							code: '12345',
							label: 'Chargé / Chargée de relations entreprises',
						},
						{
							code: '67890',
							label: 'Boulanger / Boulangère',
						}],
					modeDeContact: ModeDeContact.PHONE,
					nomEntreprise: 'Carrefour',
					siret: '12345678912345',
				});
				const user = userEvent.setup();
				const stage3eEt2deService = aStage3eEt2deService();
				jest.spyOn(stage3eEt2deService, 'candidaterStage3eEt2de').mockResolvedValue(createSuccess(undefined));

				// WHEN
				render(<DependenciesProvider stage3eEt2deService={stage3eEt2deService}>
					<CandidaterStage3eEt2de
						donneesEntreprise={donneesEntreprise}
					/>
				</DependenciesProvider>);
				await remplirLeFormulaire({
					email: 'alexis.dupont@example.com',
					metierLabel: 'Chargé / Chargée de relations entreprises',
					nom: 'Dupont',
					prenom: 'Alexis',
				});
				const envoyerBouton = screen.getByRole('button', { name: 'Envoyer les informations' });
				await user.click(envoyerBouton);

				// THEN
				const lienAccueil = screen.getByRole('link', { name: 'Retour à l’accueil' });
				expect(lienAccueil).toBeVisible();
				expect(lienAccueil).toHaveAttribute('href', '/');
			});

			it('affiche un bouton de retour à la recherche', async () => {
				// GIVEN
				const donneesEntreprise = aDonneesEntrepriseStage3eEt2de(
					{
						appellations: [
							{
								code: '12345',
								label: 'Chargé / Chargée de relations entreprises',
							},
							{
								code: '67890',
								label: 'Boulanger / Boulangère',
							},
						],
						modeDeContact: ModeDeContact.PHONE,
						nomEntreprise: 'Carrefour',
						siret: '12345678912345',
					});
				const routerBack = jest.fn();
				mockUseRouter({ back: routerBack });
				mockSessionStorage({
					getItem: jest.fn().mockReturnValue('/page-1'),
				});
				const user = userEvent.setup();
				const stage3eEt2deService = aStage3eEt2deService();
				jest.spyOn(stage3eEt2deService, 'candidaterStage3eEt2de').mockResolvedValue(createSuccess(undefined));

				// WHEN
				render(<DependenciesProvider stage3eEt2deService={stage3eEt2deService}>
					<CandidaterStage3eEt2de
						donneesEntreprise={donneesEntreprise}
					/>
				</DependenciesProvider>);
				await remplirLeFormulaire({
					email: 'alexis.dupont@example.com',
					metierLabel: 'Chargé / Chargée de relations entreprises',
					nom: 'Dupont',
					prenom: 'Alexis',
				});
				const envoyerBouton = screen.getByRole('button', { name: 'Envoyer les informations' });
				await user.click(envoyerBouton);
				const boutonRetour = screen.getByRole('button', { name: 'Continuer la recherche' });
				await user.click(boutonRetour);

				// THEN
				expect(boutonRetour).toBeVisible();
				expect(routerBack).toHaveBeenCalled();
			});
		});

		describe('lorsque l’envoi de la candidature échoue', () => {
			it('affiche une page d’erreur', async () => {
				// GIVEN
				const donneesEntreprise = aDonneesEntrepriseStage3eEt2de(
					{
						appellations: [
							{
								code: 'code',
								label: 'label',
							},
						],
						modeDeContact: ModeDeContact.IN_PERSON,
						nomEntreprise: 'Carrefour',
						siret: '37000000000000',
					},
				);
				const user = userEvent.setup();
				const stage3eEt2deService = aStage3eEt2deService();
				jest.spyOn(stage3eEt2deService, 'candidaterStage3eEt2de').mockResolvedValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));

				// WHEN
				render(<DependenciesProvider stage3eEt2deService={stage3eEt2deService}>
					<CandidaterStage3eEt2de
						donneesEntreprise={donneesEntreprise}
					/>
				</DependenciesProvider>);
				await remplirLeFormulaire({
					email: 'alexis.dupont@example.com',
					nom: 'Dupont',
					prenom: 'Alexis',
				});
				const envoyerBouton = screen.getByRole('button', { name: 'Envoyer les informations' });
				await user.click(envoyerBouton);

				// THEN
				const contenuAlert = screen.getByRole('alert');
				const title = within(contenuAlert).getByRole('heading', { level: 1, name: 'Une erreur est survenue' });
				expect(title).toBeVisible();
				const text = screen.getByText('Nous n’avons pas pu envoyer vos informations à l’entreprise. Veuillez réessayer plus tard');
				expect(text).toBeVisible();
			});

			it('affiche un bouton de retour au formulaire', async () => {
				// GIVEN
				const donneesEntreprise = aDonneesEntrepriseStage3eEt2de(
					{
						appellations: [
							{
								code: 'code',
								label: 'label',
							},
						],
						modeDeContact: ModeDeContact.IN_PERSON,
						nomEntreprise: 'Carrefour',
						siret: '37000000000000',
					},
				);
				const user = userEvent.setup();
				const stage3eEt2deService = aStage3eEt2deService();
				jest.spyOn(stage3eEt2deService, 'candidaterStage3eEt2de').mockResolvedValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));

				// WHEN
				render(<DependenciesProvider stage3eEt2deService={stage3eEt2deService}>
					<CandidaterStage3eEt2de
						donneesEntreprise={donneesEntreprise}
					/>
				</DependenciesProvider>);
				await remplirLeFormulaire({
					email: 'alexis.dupont@example.com',
					nom: 'Dupont',
					prenom: 'Alexis',
				});
				const envoyerBouton = screen.getByRole('button', { name: 'Envoyer les informations' });
				await user.click(envoyerBouton);
				const boutonRetour = screen.getByRole('button', { name: 'Retour au formulaire' });
				await user.click(boutonRetour);

				// THEN
				const formulaire = screen.getByRole('form');
				expect(formulaire).toBeVisible();
				const nouveauInputPrenom = screen.getByRole('textbox', { name: 'Prénom Exemple : Alexis' });
				expect(nouveauInputPrenom).toBeVisible();
				const nouveauInputNom = screen.getByRole('textbox', { name: 'Nom Exemple : Dupont' });
				expect(nouveauInputNom).toBeVisible();
				const nouveauInputEmail = screen.getByRole('textbox', { name: 'E-mail Exemple : alexis.dupont@example.com' });
				expect(nouveauInputEmail).toBeVisible();
				const nouveauEnvoyerBouton = screen.getByRole('button', { name: 'Envoyer les informations' });
				expect(nouveauEnvoyerBouton).toBeVisible();
			});

			it('affiche un bouton de retour à la recherche', async () => {
				// GIVEN
				const routerBack = jest.fn();
				mockUseRouter({ back: routerBack });
				mockSessionStorage({
					getItem: jest.fn().mockReturnValue('/page-1'),
				});
				const user = userEvent.setup();
				const stage3eEt2deService = aStage3eEt2deService();
				jest.spyOn(stage3eEt2deService, 'candidaterStage3eEt2de').mockResolvedValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));
				const donneesEntreprise = aDonneesEntrepriseStage3eEt2de({
					appellations: [
						{
							code: '12345',
							label: 'Chargé / Chargée de relations entreprises',
						},
					],
					modeDeContact: ModeDeContact.PHONE,
					nomEntreprise: 'Carrefour',
					siret: '12345678912345',
				});

				// WHEN
				render(<DependenciesProvider stage3eEt2deService={stage3eEt2deService}>
					<CandidaterStage3eEt2de
						donneesEntreprise={donneesEntreprise}
					/>
				</DependenciesProvider>);
				await remplirLeFormulaire({
					email: 'test@example.com',
					nom: 'Dupont',
					prenom: 'Alexis',
				});
				const envoyerBouton = screen.getByRole('button', { name: 'Envoyer les informations' });
				await user.click(envoyerBouton);
				const boutonRetour = screen.getByRole('button', { name: 'Retour à la recherche' });
				await user.click(boutonRetour);

				// THEN
				expect(boutonRetour).toBeVisible();
				expect(routerBack).toHaveBeenCalled();
			});
		});

		describe('pendant l’envoi de la candidature', () => {
			it('le bouton de soumission n’est pas disponible', async () => {
				// GIVEN
				const user = userEvent.setup();
				const stage3eEt2deService = aStage3eEt2deService();
				jest.spyOn(stage3eEt2deService, 'candidaterStage3eEt2de').mockResolvedValue(new Promise(() => {
				}));
				const donneesEntreprise = aDonneesEntrepriseStage3eEt2de({
					appellations: [
						{
							code: '12345',
							label: 'Chargé / Chargée de relations entreprises',
						},
						{
							code: '67890',
							label: 'Boulanger / Boulangère',
						},
					],
					modeDeContact: ModeDeContact.PHONE,
					nomEntreprise: 'Carrefour',
					siret: '12345678912345',
				});

				render(<DependenciesProvider stage3eEt2deService={stage3eEt2deService}>
					<CandidaterStage3eEt2de
						donneesEntreprise={donneesEntreprise}
					/>
				</DependenciesProvider>);

				await remplirLeFormulaire({
					email: 'test@example.com',
					metierLabel: 'Chargé / Chargée de relations entreprises',
					nom: 'Dupont',
					prenom: 'Alexis',
				});

				// WHEN
				const envoyerBouton = screen.getByRole('button', { name: 'Envoyer les informations' });
				await user.click(envoyerBouton);

				// THEN
				expect(envoyerBouton).toBeDisabled();
			});
		});
	});
});

type DonneesFormulaires = {
	prenom: string
	nom: string
	email: string
	metierLabel?: string
}
async function remplirLeFormulaire(donneesFormulaire: DonneesFormulaires) {
	const user = userEvent.setup();

	const inputPrenom = screen.getByRole('textbox', { name: 'Prénom Exemple : Alexis' });
	await user.type(inputPrenom, donneesFormulaire.prenom);
	const inputNom = screen.getByRole('textbox', { name: 'Nom Exemple : Dupont' });
	await user.type(inputNom, donneesFormulaire.nom);
	const inputEmail = screen.getByRole('textbox', { name: 'E-mail Exemple : alexis.dupont@example.com' });
	await user.type(inputEmail, donneesFormulaire.email);
	if (donneesFormulaire.metierLabel) {
		await selectionnerUnMetier(donneesFormulaire.metierLabel);
	}
}

async function selectionnerUnMetier(metierLabel: string) {
	const user = userEvent.setup();
	const inputMetier = screen.getByRole('button', { name: 'Métier sur lequel porte la demande d’immersion Un ou plusieurs métiers ont été renseignés par l’entreprise' });
	await user.click(inputMetier);
	const options = screen.getByRole('listbox');
	const optionDuMetierLabel = within(options).getByRole('radio', { name: metierLabel });
	await user.click(optionDuMetierLabel);
}
