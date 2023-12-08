/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { KeyBoard } from '~/client/components/keyboard.fixture';
import { ComboboxMetiersStage3eme } from '~/client/components/ui/Form/Combobox/ComboboxMetiersStage3eme';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockScrollIntoView } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aStage3emeService } from '~/client/services/stage3eme/stage3eme.service.fixture';
import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { MetierStage3eme } from '~/server/stage-3eme/domain/metierStage3eme';

describe('<ComboboxMetiersStage3eme />', () => {
	beforeAll(() => {
		mockScrollIntoView();
		mockUseRouter({});
	});

	describe('props', () => {
		it('accepte une ref', () => {
			const ref = jest.fn();

			render(
				<DependenciesProvider stage3emeService={aStage3emeService()}>
					<ComboboxMetiersStage3eme name={'métier'} label={'Rechercher un métier'} debounceTimeout={0} ref={ref} />
				</DependenciesProvider>,
			);

			expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
		});
		it('accepte un id', () => {
			const id = 'id';

			render(
				<DependenciesProvider stage3emeService={aStage3emeService()}>
					<ComboboxMetiersStage3eme name='métier' label='Rechercher un métier' id={id} />
				</DependenciesProvider>,
			);

			const combobox = screen.getByRole('combobox', { name: /Rechercher un métier/i });
			expect(combobox).toHaveAttribute('id', id);
		});
		it('accepte un onInvalid', async () => {
			const user = userEvent.setup();
			const onInvalid = jest.fn();
			render(
				<DependenciesProvider stage3emeService={aStage3emeService()}>
					<ComboboxMetiersStage3eme name='métier' label='Rechercher un métier' onInvalid={onInvalid}/>
				</DependenciesProvider>,
			);

			const combobox = screen.getByRole('combobox', { name: /Rechercher un métier/i });
			await user.type(combobox, 'A');
			await user.tab();

			expect(onInvalid).toHaveBeenCalled();
			expect(combobox).toBeInvalid();
		});
		it('merge le aria-describedby en props avec celui du message d’erreur', async () => {
			const user = userEvent.setup();
			const messageErreur = 'Veuillez sélectionner une option dans la liste';
			const aideSaisie = 'Commencez à taper pour voir des suggestions';
			render(
				<DependenciesProvider stage3emeService={aStage3emeService()}>
					<ComboboxMetiersStage3eme name='métier' label='Rechercher un métier' aria-describedby="aide-saisie" />
					<p id="aide-saisie">{aideSaisie}</p>
				</DependenciesProvider>,
			);

			const combobox = screen.getByRole('combobox', { name: /Rechercher un métier/i });
			await user.type(combobox, 'A');
			await user.tab();

			expect(combobox).toBeInvalid();
			expect(combobox).toHaveAccessibleDescription(expect.stringContaining(aideSaisie));
			expect(combobox).toHaveAccessibleDescription(expect.stringContaining(messageErreur));
		});
		it('utilise le label "Domaine" par défaut', () => {
			const id = 'id';

			render(
				<DependenciesProvider stage3emeService={aStage3emeService()}>
					<ComboboxMetiersStage3eme name='métier' id={id} />
				</DependenciesProvider>,
			);

			const combobox = screen.getByRole('combobox');
			expect(combobox).toHaveAccessibleName('Domaine');
		});
	});

	describe('quand la recherche ne correspond à aucun métier', () => {
		it('affiche un message et ne propose pas de métier', async () => {
			const stage3emeServiceMock = aStage3emeService();
			jest.spyOn(stage3emeServiceMock, 'rechercherAppellationMetier').mockResolvedValue(createSuccess([]));
			const user = userEvent.setup();

			render(<DependenciesProvider stage3emeService={stage3emeServiceMock}>
				<ComboboxMetiersStage3eme name={'métier'} label={'Rechercher un métier'} debounceTimeout={0}/>
			</DependenciesProvider>);
			const comboboxMetiersStage3eme = screen.getByRole('combobox', { name: 'Rechercher un métier' });
			await user.type(comboboxMetiersStage3eme, 'dddddd');
			const emptyResultText = await screen.findByText('Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un métier. Exemple : boulanger, …');

			expect(emptyResultText).toBeVisible();
			expect(screen.queryByRole('option')).not.toBeInTheDocument();
		});
	});

	describe('quand la recherche correspond à des métiers', () => {
		it('affiche les métiers possibles', async () => {
			const stage3emeServiceMock = aStage3emeService();
			jest.spyOn(stage3emeServiceMock, 'rechercherAppellationMetier').mockResolvedValue(createSuccess([
				{ code: 'H1209', libelle: 'Génie électrique' },
				{ code: 'I1304', libelle: 'Aéronautique' },
				{ code: 'H1201', libelle: 'Chimie' },
			]));
			const user = userEvent.setup();

			render(<DependenciesProvider stage3emeService={stage3emeServiceMock}>
				<ComboboxMetiersStage3eme name={'métier'} label={'Rechercher un métier'} debounceTimeout={0}/>
			</DependenciesProvider>);
			const comboboxMetiersStage3eme = screen.getByRole('combobox', { name: 'Rechercher un métier' });
			await user.type(comboboxMetiersStage3eme, 'boulang');

			expect(await screen.findAllByRole('option')).toHaveLength(3);
			expect(screen.getByRole('option', { name: 'Génie électrique' })).toBeVisible();
			expect(screen.getByRole('option', { name: 'Aéronautique' })).toBeVisible();
			expect(screen.getByRole('option', { name: 'Chimie' })).toBeVisible();
		});

		describe('affiche un message du nombre de résultat', () => {
			it('le message est au pluriel quand plusieurs résultats sont trouvés', async () => {
				const user = userEvent.setup();
				const stage3emeServiceMock = aStage3emeService();
				jest.spyOn(stage3emeServiceMock, 'rechercherAppellationMetier').mockResolvedValue(createSuccess([
					{ code: 'H1209', libelle: 'Génie électrique' },
					{ code: 'I1304', libelle: 'Aéronautique' },
					{ code: 'H1201', libelle: 'Chimie' },
				]));
				render(
					<DependenciesProvider stage3emeService={stage3emeServiceMock}>
						<ComboboxMetiersStage3eme
							name='métier'
							label='Rechercher un métier'
							debounceTimeout={0}
						/>
					</DependenciesProvider>,
				);

				await user.type(screen.getByRole('combobox'), 'test');

				const message = screen.getByRole('status');
				expect(message).toBeVisible();
				expect(message).toHaveTextContent('3 métiers trouvés');
			});
			it('le message est au singulier quand un seul résultat est trouvé', async () => {
				const user = userEvent.setup();
				const stage3emeServiceMock = aStage3emeService();
				jest.spyOn(stage3emeServiceMock, 'rechercherAppellationMetier').mockResolvedValue(createSuccess([
					{ code: 'H1209', libelle: 'Génie électrique' },
				]));
				render(
					<DependenciesProvider stage3emeService={stage3emeServiceMock}>
						<ComboboxMetiersStage3eme
							name='métier'
							label='Rechercher un métier'
							debounceTimeout={0}
						/>
					</DependenciesProvider>,
				);

				await user.type(screen.getByRole('combobox'), 'test');

				const message = screen.getByRole('status');
				expect(message).toBeVisible();
				expect(message).toHaveTextContent('1 métier trouvé');
			});
		});

		describe('quand je clique sur un métier', () => {
			it('affiche le métier sélectionné', async () => {
				const stage3emeServiceMock = aStage3emeService();
				jest.spyOn(stage3emeServiceMock, 'rechercherAppellationMetier').mockResolvedValue(createSuccess([
					{ code: 'F1201', libelle: 'Conduite de travaux, direction de chantier' },
					{ code: 'F1202', libelle: 'Encadrement de chantier du BTP' },
					{ code: 'I1101', libelle: 'Management et ingénierie de production' },
				]));
				const user = userEvent.setup();

				render(
					<form aria-label="Métier">
						<DependenciesProvider stage3emeService={stage3emeServiceMock}>
							<ComboboxMetiersStage3eme name={'métier'} label={'Rechercher un métier'} debounceTimeout={0}/>
						</DependenciesProvider>
					</form>,
				);
				const comboboxMetiersStage3eme = screen.getByRole('combobox', { name: 'Rechercher un métier' });
				await user.type(comboboxMetiersStage3eme, 'boulang');
				await user.click(screen.getByRole('option', { name: 'Conduite de travaux, direction de chantier' }));

				expect(comboboxMetiersStage3eme).toHaveValue('Conduite de travaux, direction de chantier');
				expect(screen.getByRole('form')).toHaveFormValues({ codeMetier: 'F1201' });
			});
		});
		describe('quand je choisi un métier avec le clavier', () => {
			it('affiche le métier sélectionné', async () => {
				const stage3emeServiceMock = aStage3emeService();
				jest.spyOn(stage3emeServiceMock, 'rechercherAppellationMetier').mockResolvedValue(createSuccess([
					{ code: 'F1106', libelle: 'Ingénierie en BTP' },
				]));
				const user = userEvent.setup();

				render(
					<DependenciesProvider stage3emeService={stage3emeServiceMock}>
						<ComboboxMetiersStage3eme name={'métier'} label={'Rechercher un métier'} debounceTimeout={0}/>
					</DependenciesProvider>,
				);
				const comboboxMetiersStage3eme = screen.getByRole('combobox', { name: 'Rechercher un métier' });
				await user.type(comboboxMetiersStage3eme, 'Ingé');
				await user.keyboard(KeyBoard.ARROW_DOWN);
				await user.keyboard(KeyBoard.ENTER);

				expect(comboboxMetiersStage3eme).toHaveValue('Ingénierie en BTP');
			});
		});
	});

	it('par défaut, la recherche n’est lancée qu’au bout d’un certain temps après le dernier input utilisateur', async() => {
		// GIVEN
		const user = userEvent.setup();
		const stage3emeServiceMock = aStage3emeService();
		jest.spyOn(stage3emeServiceMock, 'rechercherAppellationMetier').mockResolvedValue(createSuccess([
			{ code: 'H1209', libelle: 'Génie électrique' },
		]));
		render(
			<DependenciesProvider stage3emeService={stage3emeServiceMock}>
				<ComboboxMetiersStage3eme
					name='métier'
					label='Rechercher un métier'
				/>
			</DependenciesProvider>,
		);

		// WHEN
		await user.type(screen.getByRole('combobox'), 'genie');
		await user.type(screen.getByRole('combobox'), ' él');

		// THEN
		await screen.findAllByRole('option');
		expect(stage3emeServiceMock.rechercherAppellationMetier).toHaveBeenCalledTimes(1);
	});

	it('accepte une valeur par défaut', () => {
		const stage3emeServiceMock = aStage3emeService();

		render(
			<DependenciesProvider stage3emeService={stage3emeServiceMock}>
				<form aria-label="form">
					<ComboboxMetiersStage3eme
						name='métier'
						label='Rechercher un métier'
						defaultValue={{
							code: 'I1234',
							libelle: 'Ingénieur en ingénierie',
						}} debounceTimeout={0}/>
				</form>
			</DependenciesProvider>,
		);

		const form = screen.getByRole('form');
		expect(form).toHaveFormValues({
			codeMetier: 'I1234',
		});
	});

	it('affiche un message quand l’appel au service est en échec', async () => {
		const user = userEvent.setup();
		const stage3emeServiceMock = aStage3emeService();
		jest.spyOn(stage3emeServiceMock, 'rechercherAppellationMetier').mockResolvedValue(createFailure(ErreurMetier.CONTENU_INDISPONIBLE));

		render(
			<DependenciesProvider stage3emeService={stage3emeServiceMock}>
				<ComboboxMetiersStage3eme
					name='métier'
					label='Rechercher un métier'
					debounceTimeout={0}
				/>
			</DependenciesProvider>,
		);

		await user.type(screen.getByRole('combobox'), 'test');

		const message = await screen.findByText( 'Une erreur est survenue lors de la récupération des métiers. Veuillez réessayer plus tard.' );
		expect(message).toBeVisible();
	});

	it('affiche un message quand la liste de suggestions est en train de charger des résultats', async () => {
		const user = userEvent.setup();
		const stage3emeServiceMock = aStage3emeService({
			rechercherAppellationMetier: jest.fn(() => new Promise<Either<MetierStage3eme[]>>(() => {
			})),
		});
		render(
			<DependenciesProvider stage3emeService={stage3emeServiceMock}>
				<ComboboxMetiersStage3eme
					name='métier'
					label='Rechercher un métier'
					debounceTimeout={0}
				/>
			</DependenciesProvider>,
		);

		await user.type(screen.getByRole('combobox'), 'test');

		const message = screen.getByRole('status');
		expect(message).toBeVisible();
		expect(message).toHaveTextContent('Chargement…');
	});

	it('affiche un message d’erreur quand le champ est en erreur', async () => {
		const user = userEvent.setup();
		const stage3emeServiceMock = aStage3emeService();
		jest.spyOn(stage3emeServiceMock, 'rechercherAppellationMetier').mockResolvedValue(createSuccess([]));
		render(
			<DependenciesProvider stage3emeService={stage3emeServiceMock}>
				<ComboboxMetiersStage3eme
					name='métier'
					label='Rechercher un métier'
					debounceTimeout={0}
				/>
			</DependenciesProvider>,
		);

		await user.type(screen.getByRole('combobox'), 'test');
		await user.tab();

		const erreur = screen.getByText('Veuillez sélectionner une option dans la liste');
		expect(erreur).toBeVisible();
		const combobox = screen.getByRole('combobox');
		expect(combobox).toHaveAccessibleDescription('Veuillez sélectionner une option dans la liste');
	});

	it('affiche un message dans les suggestions quand le champ est vide et que l’utilisateur déplie les suggestions', async () => {
		const user = userEvent.setup();
		const stage3emeServiceMock = aStage3emeService();
		render(
			<DependenciesProvider stage3emeService={stage3emeServiceMock}>
				<ComboboxMetiersStage3eme
					name='métier'
					label='Rechercher un métier'
					debounceTimeout={0}
				/>
			</DependenciesProvider>,
		);

		const deplierSuggestions = screen.getByRole('button', { name: 'Rechercher un métier' });
		await user.click(deplierSuggestions);

		const message = screen.getByRole('status');
		expect(message).toBeVisible();
		expect(message).toHaveTextContent('Commencez à taper pour rechercher un métier');
	});

	describe('quand le champ est vidé', () => {
		it('affiche un message dans les suggestions', async () => {
			const user = userEvent.setup();
			const stage3emeServiceMock = aStage3emeService();
			jest.spyOn(stage3emeServiceMock, 'rechercherAppellationMetier').mockResolvedValue(createSuccess([
				{ code: 'H1209', libelle: 'Génie électrique' },
			]));
			render(
				<DependenciesProvider stage3emeService={stage3emeServiceMock}>
					<ComboboxMetiersStage3eme
						name='métier'
						label='Rechercher un métier'
						debounceTimeout={0}
					/>
				</DependenciesProvider>,
			);

			const combobox = screen.getByRole('combobox');
			await user.type(combobox, 'Test');
			await user.clear(combobox);

			const message = screen.getByRole('status');
			expect(message).toBeVisible();
			expect(message).toHaveTextContent('Commencez à taper pour rechercher un métier');
		});

		it('n’affiche aucune suggestion', async () => {
			const user = userEvent.setup();
			const stage3emeServiceMock = aStage3emeService();
			jest.spyOn(stage3emeServiceMock, 'rechercherAppellationMetier').mockResolvedValue(createSuccess([
				{ code: 'H1209', libelle: 'Génie électrique' },
			]));
			render(
				<DependenciesProvider stage3emeService={stage3emeServiceMock}>
					<ComboboxMetiersStage3eme
						name='métier'
						label='Rechercher un métier'
						debounceTimeout={0}
					/>
				</DependenciesProvider>,
			);

			const combobox = screen.getByRole('combobox');
			await user.type(combobox, 'Test');
			await user.clear(combobox);

			const option = screen.queryByRole('option');
			expect(option).not.toBeInTheDocument();
		});
	});
});
