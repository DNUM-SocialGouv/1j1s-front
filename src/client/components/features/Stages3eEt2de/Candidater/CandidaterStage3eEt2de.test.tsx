/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import CandidaterStage3eEt2de from '~/client/components/features/Stages3eEt2de/Candidater/CandidaterStage3eEt2de';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSessionStorage } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aStage3eEt2deService } from '~/client/services/stage3eEt2de/stage3eEt2de.service.fixture';
import { createSuccess } from '~/server/errors/either';
import { ModeDeContact } from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de';
import { aCandidatureStage3eEt2de } from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de.fixture';

describe('Candidater à un stage de 3e et 2de', () => {
	beforeEach(() => {
		mockUseRouter({});
	});
	it('affiche un titre avec le nom de l’entreprise', () => {
		// GIVEN

		// WHEN
		render(
			<DependenciesProvider stage3eEt2deService={aStage3eEt2deService()}>
				<CandidaterStage3eEt2de
					appellations={[
						{
							code: 'code',
							label: 'label',
						},
					]}
					modeDeContact={ ModeDeContact.IN_PERSON}
					nomEntreprise="Carrefour"
					siret="37000000000000"
				/>
			</DependenciesProvider>,
		);

		// THEN
		const titre = screen.getByRole('heading', { level: 1 });
		expect(titre).toBeVisible();
		expect(titre).toHaveTextContent('Je candidate à l’offre de stage de 3e ou de 2de de l’entreprise Carrefour');
	});

	it('affiche un texte explicatif du process de candidature', () => {
		// GIVEN

		// WHEN
		render(
			<DependenciesProvider stage3eEt2deService={aStage3eEt2deService()}>
				<CandidaterStage3eEt2de
					appellations={[
						{
							code: 'code',
							label: 'label',
						},
					]}
					modeDeContact={ModeDeContact.IN_PERSON}
					nomEntreprise="Carrefour"
					siret="37000000000000"
				/>
			</DependenciesProvider>,
		);

		// THEN
		const explicationPart1 = screen.getByText('Cette entreprise souhaite être contactée par téléphone. Merci de nous indiquer vos coordonnées.');
		const explicationPart2 = screen.getByText('Nous allons vous transmettre par e-mail le nom de la personne à contacter, son numéro de téléphone ainsi que des conseils pour présenter votre demande d’immersion. Ces informations sont personnelles et confidentielles. Elles ne peuvent pas être communiquées à d’autres personnes.');
		expect(explicationPart1).toBeVisible();
		expect(explicationPart2).toBeVisible();
	});

	it('affiche un bouton de retour à la recherche', async () => {
		// GIVEN
		const routerBack = jest.fn();
		mockUseRouter({ back: routerBack });
		mockSessionStorage({
			getItem: jest.fn().mockReturnValue('/page-1'),
		});
		const user = userEvent.setup();

		// WHEN
		render(
			<DependenciesProvider stage3eEt2deService={aStage3eEt2deService()}>
				<CandidaterStage3eEt2de
					appellations={[
						{
							code: 'code',
							label: 'label',
						},
					]}
					modeDeContact={ModeDeContact.IN_PERSON}
					nomEntreprise="Carrefour"
					siret="37000000000000"
				/>
			</DependenciesProvider>,
		);
		const boutonRetour = screen.getByRole('button', { name: 'Retour vers la page précédente' });
		await user.click(boutonRetour);

		// THEN
		expect(boutonRetour).toBeVisible();
		expect(routerBack).toHaveBeenCalled();
	});

	it('affiche un message indiquant que tous les champs sont obligatoires', () => {
		// GIVEN

		// WHEN
		render(
			<DependenciesProvider stage3eEt2deService={aStage3eEt2deService()}>
				<CandidaterStage3eEt2de
					appellations={[
						{
							code: 'code',
							label: 'label',
						},
					]}
					modeDeContact={ModeDeContact.IN_PERSON}
					nomEntreprise="Carrefour"
					siret="37000000000000"
				/>
			</DependenciesProvider>,
		);
		// THEN
		const message = screen.getByText('Tous les champs sont obligatoires (sauf mention contraire)');
		expect(message).toBeVisible();
	});

	it('affiche un formulaire de candidature', () => {
		// WHEN
		render(
			<DependenciesProvider stage3eEt2deService={aStage3eEt2deService()}>
				<CandidaterStage3eEt2de
					appellations={[
						{
							code: 'code',
							label: 'label',
						},
					]}
					modeDeContact={ModeDeContact.IN_PERSON}
					nomEntreprise="Carrefour"
					siret="37000000000000"
				/>
			</DependenciesProvider>,
		);
		// THEN
		const formulaire = screen.getByRole('form');
		expect(formulaire).toBeVisible();
		const inputPrenom = screen.getByRole('textbox', { name:'Prénom Exemple : Alexis' });
		expect(inputPrenom).toBeVisible();
		const inputNom = screen.getByRole('textbox', { name:'Nom Exemple : Dupont' });
		expect(inputNom).toBeVisible();
		const inputEmail = screen.getByRole('textbox', { name:'E-mail Exemple : alexis.dupont@example.com' });
		expect(inputEmail).toBeVisible();
		const boutonEnvoyer = screen.getByRole('button', { name: 'Envoyer les informations' });
		expect(boutonEnvoyer).toBeVisible();
	});

	describe('affiche les métiers de l’entreprise dans le formulaire', () => {
		describe('lorsque l’entreprise ne propose qu’un seul métier', () => {
			it('affiche un champ de sélection du métier désactivé avec comme valeur le métier', () => {
				// GIVEN

				// WHEN
				render(
					<DependenciesProvider stage3eEt2deService={aStage3eEt2deService()}>
						<CandidaterStage3eEt2de
							appellations={[
								{
									code: 'code',
									label: 'label du métier',
								},
							]}
							modeDeContact={ModeDeContact.IN_PERSON}
							nomEntreprise="Carrefour"
							siret="37000000000000"
						/>
					</DependenciesProvider>,
				);
				// THEN
				const inputAppellation = screen.getByRole('textbox', { name:'Métier sur lequel porte la demande d’immersion Un ou plusieurs métiers ont été renseignés par l’entreprise' });
				expect(inputAppellation).toBeVisible();
				expect(inputAppellation).toBeDisabled();
				expect(inputAppellation).toHaveValue('label du métier');
				expect(inputAppellation).toHaveAttribute('type', 'text');
			});
		});

		describe('lorsque l’entreprise propose plusieurs métiers', () => {
			it('affiche un champ de sélection du métier actif', async () => {
				// GIVEN
				const user = userEvent.setup();
				// WHEN
				render(
					<DependenciesProvider stage3eEt2deService={aStage3eEt2deService()}>
						<CandidaterStage3eEt2de
							appellations={[
								{
									code: 'code',
									label: 'label',
								},
								{
									code: 'code2',
									label: 'label2',
								},
							]}
							modeDeContact={ModeDeContact.IN_PERSON}
							nomEntreprise="Carrefour"
							siret="37000000000000"
						/>
					</DependenciesProvider>,
				);
				const inputAppellation = screen.getByRole('button', { name:'Métier sur lequel porte la demande d’immersion Un ou plusieurs métiers ont été renseignés par l’entreprise' });

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

	it('affiche un message indiquant que les données sont collectées et traitées par la DGEFP', () => {
		// GIVEN

		// WHEN
		render(
			<DependenciesProvider stage3eEt2deService={aStage3eEt2deService()}>
				<CandidaterStage3eEt2de
					appellations={[
						{
							code: 'code',
							label: 'label',
						},
					]}
					modeDeContact={ModeDeContact.IN_PERSON}
					nomEntreprise="Carrefour"
					siret="37000000000000"
				/>
			</DependenciesProvider>,
		);

		// THEN
		const message = screen.getByText('Vous êtes informé que vos données à caractère personnel sont collectées et traitées par la DGEFP pour répondre à votre demande. Pour en savoir plus vous pouvez consulter la politique de confidentialité et les CGU de la DGEFP. En cliquant sur "Envoyer mes informations", vos données seront transmises à la mission locale de la zone géographique dans laquelle vous résidez pour que celle-ci prenne contact avec vous');
		expect(message).toBeVisible();
	});

	describe('soumission du formulaire', () => {
		describe('lorsque plusieurs métiers sont proposés', () => {
			it('envoie les données de la candidature', async () => {
				// GIVEN
				const user = userEvent.setup();
				const stage3eEt2deService = aStage3eEt2deService();
				render(<DependenciesProvider stage3eEt2deService={stage3eEt2deService}>
					<CandidaterStage3eEt2de
						appellations={[
							{
								code: '12345',
								label: 'Chargé / Chargée de relations entreprises',
							},
							{
								code: '67891',
								label: 'Conseiller / Conseillère en insertion professionnelle',
							},
						]}
						modeDeContact={ModeDeContact.PHONE}
						nomEntreprise="Carrefour"
						siret="12345678912345"
					/>
				</DependenciesProvider>);
				const inputPrenom = screen.getByRole('textbox', { name:'Prénom Exemple : Alexis' });
				await user.type(inputPrenom, 'Alexis');
				const inputNom = screen.getByRole('textbox', { name:'Nom Exemple : Dupont' });
				await user.type(inputNom, 'Dupont');
				const inputEmail = screen.getByRole('textbox', { name:'E-mail Exemple : alexis.dupont@example.com' });
				await user.type(inputEmail, 'alexis.dupont@example.com');
				const inputMetier = screen.getByRole('button', { name:'Métier sur lequel porte la demande d’immersion Un ou plusieurs métiers ont été renseignés par l’entreprise' });
				await user.click(inputMetier);
				const options = screen.getByRole('listbox');
				const premiereOption = within(options).getByRole('radio', { name: 'Chargé / Chargée de relations entreprises' });
				await user.click(premiereOption);

				// WHEN
				const envoyerBouton = screen.getByRole('button', { name: 'Envoyer les informations' });
				await user.click(envoyerBouton);

				// THEN
				const expectedCandidature3eEt2de = aCandidatureStage3eEt2de({
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
				const user = userEvent.setup();
				const stage3eEt2deService = aStage3eEt2deService();
				render(<DependenciesProvider stage3eEt2deService={stage3eEt2deService}>
					<CandidaterStage3eEt2de
						appellations={[
							{
								code: '12345',
								label: 'Chargé / Chargée de relations entreprises',
							},
						]}
						modeDeContact={ModeDeContact.PHONE}
						nomEntreprise="Carrefour"
						siret="12345678912345"
					/>
				</DependenciesProvider>);
				const inputPrenom = screen.getByRole('textbox', { name:'Prénom Exemple : Alexis' });
				await user.type(inputPrenom, 'Alexis');
				const inputNom = screen.getByRole('textbox', { name:'Nom Exemple : Dupont' });
				await user.type(inputNom, 'Dupont');
				const inputEmail = screen.getByRole('textbox', { name:'E-mail Exemple : alexis.dupont@example.com' });
				await user.type(inputEmail, 'alexis.dupont@example.com');

				// WHEN
				const envoyerBouton = screen.getByRole('button', { name: 'Envoyer les informations' });
				await user.click(envoyerBouton);

				// THEN
				const expectedCandidature3eEt2de = aCandidatureStage3eEt2de({
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

		describe('lorsque la candidature est envoyée avec succès', () => {
			it('affiche une page de succès', async () => {
				// GIVEN
				const user = userEvent.setup();
				const stage3eEt2deService = aStage3eEt2deService();
				jest.spyOn(stage3eEt2deService, 'candidaterStage3eEt2de').mockResolvedValue(createSuccess(undefined));

				// WHEN
				render(<DependenciesProvider stage3eEt2deService={stage3eEt2deService}>
					<CandidaterStage3eEt2de
						appellations={[
							{
								code: '12345',
								label: 'Chargé / Chargée de relations entreprises',
							},
							{
								code: '67891',
								label: 'Conseiller / Conseillère en insertion professionnelle',
							},
						]}
						modeDeContact={ModeDeContact.PHONE}
						nomEntreprise="Carrefour"
						siret="12345678912345"
					/>
				</DependenciesProvider>);

				const inputPrenom = screen.getByRole('textbox', { name:'Prénom Exemple : Alexis' });
				await user.type(inputPrenom, 'Alexis');
				const inputNom = screen.getByRole('textbox', { name:'Nom Exemple : Dupont' });
				await user.type(inputNom, 'Dupont');
				const inputEmail = screen.getByRole('textbox', { name:'E-mail Exemple : alexis.dupont@example.com' });
				await user.type(inputEmail, 'test@example.com');
				const inputMetier = screen.getByRole('button', { name:'Métier sur lequel porte la demande d’immersion Un ou plusieurs métiers ont été renseignés par l’entreprise' });
				await user.click(inputMetier);
				const options = screen.getByRole('listbox');
				const premiereOption = within(options).getByRole('radio', { name: 'Chargé / Chargée de relations entreprises' });
				await user.click(premiereOption);
				const envoyerBouton = screen.getByRole('button', { name: 'Envoyer les informations' });
				await user.click(envoyerBouton);

				// THEN
				const titre = screen.getByRole('heading', { level: 1 });
				expect(titre).toBeVisible();
				expect(titre).toHaveTextContent('Féliciations, vos informations ont bien été envoyées');
				const texte = screen.getByText('L’entreprise a choisi d’être contactée par e-mail. Elle recevra donc vos informations et vous recontactera par la suite.');
				expect(texte).toBeVisible();
			});

			it('affiche un lien de retour à l’accueil', async () => {
				// GIVEN
				const user = userEvent.setup();
				const stage3eEt2deService = aStage3eEt2deService();
				jest.spyOn(stage3eEt2deService, 'candidaterStage3eEt2de').mockResolvedValue(createSuccess(undefined));

				// WHEN
				render(<DependenciesProvider stage3eEt2deService={stage3eEt2deService}>
					<CandidaterStage3eEt2de
						appellations={[
							{
								code: '12345',
								label: 'Chargé / Chargée de relations entreprises',
							},
							{
								code: '67891',
								label: 'Conseiller / Conseillère en insertion professionnelle',
							},
						]}
						modeDeContact={ModeDeContact.PHONE}
						nomEntreprise="Carrefour"
						siret="12345678912345"
					/>
				</DependenciesProvider>);
				const inputPrenom = screen.getByRole('textbox', { name:'Prénom Exemple : Alexis' });
				await user.type(inputPrenom, 'Alexis');
				const inputNom = screen.getByRole('textbox', { name:'Nom Exemple : Dupont' });
				await user.type(inputNom, 'Dupont');
				const inputEmail = screen.getByRole('textbox', { name:'E-mail Exemple : alexis.dupont@example.com' });
				await user.type(inputEmail, 'test@example.com');
				const inputMetier = screen.getByRole('button', { name:'Métier sur lequel porte la demande d’immersion Un ou plusieurs métiers ont été renseignés par l’entreprise' });
				await user.click(inputMetier);
				const options = screen.getByRole('listbox');
				const premiereOption = within(options).getByRole('radio', { name: 'Chargé / Chargée de relations entreprises' });
				await user.click(premiereOption);
				const envoyerBouton = screen.getByRole('button', { name: 'Envoyer les informations' });
				await user.click(envoyerBouton);

				// THEN
				const lienAccueil = screen.getByRole('link', { name: 'Retourner à l’accueil' });
				expect(lienAccueil).toBeVisible();
				expect(lienAccueil).toHaveAttribute('href', '/');
			});

			it('affiche un bouton revenant a la recherche', async () => {
				// GIVEN
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
						appellations={[
							{
								code: '12345',
								label: 'Chargé / Chargée de relations entreprises',
							},
							{
								code: '67891',
								label: 'Conseiller / Conseillère en insertion professionnelle',
							},
						]}
						modeDeContact={ModeDeContact.PHONE}
						nomEntreprise="Carrefour"
						siret="12345678912345"
					/>
				</DependenciesProvider>);
				const inputPrenom = screen.getByRole('textbox', { name:'Prénom Exemple : Alexis' });
				await user.type(inputPrenom, 'Alexis');
				const inputNom = screen.getByRole('textbox', { name:'Nom Exemple : Dupont' });
				await user.type(inputNom, 'Dupont');
				const inputEmail = screen.getByRole('textbox', { name:'E-mail Exemple : alexis.dupont@example.com' });
				await user.type(inputEmail, 'test@example.com');
				const inputMetier = screen.getByRole('button', { name:'Métier sur lequel porte la demande d’immersion Un ou plusieurs métiers ont été renseignés par l’entreprise' });
				await user.click(inputMetier);
				const options = screen.getByRole('listbox');
				const premiereOption = within(options).getByRole('radio', { name: 'Chargé / Chargée de relations entreprises' });
				await user.click(premiereOption);
				const envoyerBouton = screen.getByRole('button', { name: 'Envoyer les informations' });
				await user.click(envoyerBouton);
				const boutonRetour = screen.getByRole('button', { name: 'Déposer une autre offre de stage' });
				await user.click(boutonRetour);

				// THEN
				expect(boutonRetour).toBeVisible();
				expect(routerBack).toHaveBeenCalled();
			});
		});
	});
});
