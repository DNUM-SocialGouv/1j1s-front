/**
 * @jest-environment jsdom
 */


import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { ComboboxCommune } from '~/client/components/ui/Form/Combobox/ComboboxCommune/ComboboxCommune';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { radiusList } from '~/server/localisations/domain/localisation';
import {
	aCommune,
	aRésultatsRechercheCommune,
} from '~/server/localisations/domain/localisationAvecCoordonnées.fixture';

const MESSAGE_ERREUR_FETCH = 'Une erreur est survenue lors de la récupération des lieux. Veuillez réessayer plus tard.';
const MESSAGE_PAS_DE_RESULTAT = 'Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un lieu. Exemple : Paris, ...';
const MESSAGE_CHARGEMENT = 'Chargement ...';
const MESSAGE_CHAMP_VIDE = 'Commencez à saisir au moins 3 caractères, puis sélectionnez votre localisation';
const DEFAULT_RADIUS_VALUE = '10';

describe('<ComboboxCommune/>', () => {
	it('affiche le combobox', () => {
		const localisationService = aLocalisationService();
		render(<DependenciesProvider localisationService={localisationService}><ComboboxCommune/></DependenciesProvider>);
		expect(screen.getByRole('combobox')).toBeVisible();
	});

	describe('accepte les props', () => {
		it('accepte un label et fait le lien avec le combobox', () => {
			const localisationService = aLocalisationService();
			render(<DependenciesProvider localisationService={localisationService}>
				<ComboboxCommune label="je suis le label"/>
			</DependenciesProvider>);
			const combobox = screen.getByRole('combobox');
			const label = 'je suis le label';

			expect(combobox).toHaveAccessibleName(label);
			expect(combobox).toHaveAttribute('aria-label', label);
			expect(screen.getByText(label)).toBeVisible();
		});

		it('si le label n‘est pas donné, utilise le label par default', () => {
			const localisationService = aLocalisationService();
			render(<DependenciesProvider localisationService={localisationService}>
				<ComboboxCommune/>
			</DependenciesProvider>);
			const combobox = screen.getByRole('combobox');
			const defaultLabel = 'Localisation';

			expect(combobox).toHaveAccessibleName(defaultLabel);
			expect(screen.getByText(defaultLabel)).toBeVisible();
		});

		it('accepte un id', () => {
			const localisationService = aLocalisationService();
			render(<DependenciesProvider localisationService={localisationService}>
				<ComboboxCommune id={'test'}/>
			</DependenciesProvider>);
			const combobox = screen.getByRole('combobox');

			expect(combobox).toHaveAttribute('id', 'test');
		});

		it('accepte un onChange', async () => {
			const user = userEvent.setup();
			const localisationService = aLocalisationService();
			const onChange = jest.fn();

			render(<DependenciesProvider localisationService={localisationService}>
				<ComboboxCommune label={'comboboxLabel'} onChange={onChange}/>
			</DependenciesProvider>);
			const combobox = screen.getByRole('combobox', { name: 'comboboxLabel' });

			await user.type(combobox, 'a');

			expect(onChange).toHaveBeenCalledTimes(1);
		});

		it('accepte une default commune', () => {
			const localisationService = aLocalisationService();
			render(<DependenciesProvider localisationService={localisationService}>
				<ComboboxCommune defaultCommune={{
					code: '75056',
					latitude: '48.8',
					libelle: 'Paris 15e Arrondissement (75015)',
					longitude: '2.2',
				}}/>
			</DependenciesProvider>);
			const combobox = screen.getByRole('combobox');

			expect(combobox).toHaveValue('Paris 15e Arrondissement (75015)');
			expect(screen.getByDisplayValue('2.2')).toBeInTheDocument();
			expect(screen.getByDisplayValue('48.8')).toBeInTheDocument();
			expect(screen.getByDisplayValue('75056')).toBeInTheDocument();
		});

		it('accepte une default distance', () => {
			const localisationService = aLocalisationService();
			const radiusExpected = radiusList[1]
			render(<DependenciesProvider localisationService={localisationService}>
				<ComboboxCommune defaultCommune={{
					code: '75056',
					latitude: '48.8',
					libelle: 'Paris 15e Arrondissement (75015)',
					longitude: '2.2',
				}} defaultDistance={radiusExpected.valeur}/>
			</DependenciesProvider>);
			const radiusInput = screen.getByRole('textbox', { name: 'Rayon' });

			expect(radiusInput).toHaveValue(radiusExpected.valeur);
			expect(radiusInput).toHaveDisplayValue(radiusExpected.libellé);
		});

		it('accepte un aria-describedBy', () => {
			const localisationService = aLocalisationService();
			const aideSaisie = 'je suis une description';
			render(<DependenciesProvider localisationService={localisationService}>
				<ComboboxCommune aria-describedby={'aide-saisie'}/>
				<p id="aide-saisie">{aideSaisie}</p>
			</DependenciesProvider>);
			const combobox = screen.getByRole('combobox');

			expect(combobox).toHaveAccessibleDescription(/je suis une description/);
		});

		it('accepte une ref', () => {
			const localisationService = aLocalisationService();
			const ref = jest.fn();

			render(<DependenciesProvider localisationService={localisationService}>
				<ComboboxCommune ref={ref}/>
			</DependenciesProvider>);
			const combobox = screen.getByRole('combobox');

			expect(ref).toHaveBeenCalledTimes(1);
			expect(ref).toHaveBeenCalledWith(combobox);
		});

		it('accepte un onInvalid', async () => {
			const user = userEvent.setup();
			const localisationService = aLocalisationService();
			const onInvalid = jest.fn();

			render(<DependenciesProvider localisationService={localisationService}>
				<ComboboxCommune required onInvalid={onInvalid} defaultCommune={{ libelle: 'Paris' }}/>
			</DependenciesProvider>);
			const combobox = screen.getByRole('combobox');
			await user.clear(combobox);
			await user.tab();

			expect(onInvalid).toHaveBeenCalledWith(expect.objectContaining({ target: combobox }));
		});

		it('accepte un id, le passe au combobox et fait le lien avec le label', () => {
			const localisationService = aLocalisationService();
			const label = 'je suis le label';
			render(<DependenciesProvider localisationService={localisationService}>
				<ComboboxCommune id={'comboboxId'} label={label}/>
			</DependenciesProvider>);
			const combobox = screen.getByRole('combobox');

			expect(combobox).toHaveAccessibleName(expect.stringContaining(label));
			expect(combobox).toHaveAttribute('id', 'comboboxId');
		});

		it('accepte les propriétés du combobox', async () => {
			const localisationService = aLocalisationService();
			const onFocus = jest.fn();
			render(<DependenciesProvider localisationService={localisationService}>
				<ComboboxCommune onFocus={onFocus}/>
			</DependenciesProvider>);
			const combobox = screen.getByRole('combobox');

			await userEvent.click(combobox);
			expect(onFocus).toHaveBeenCalledTimes(1);
		});
	});

	it('lorsque je tappe un caractère, la valeur de l‘input est mise à jour', async () => {
		const user = userEvent.setup();
		const localisationService = aLocalisationService({
			rechercherCommune: jest.fn(),
		});

		render(<DependenciesProvider localisationService={localisationService}>
			<ComboboxCommune label={'comboboxLabel'}/>
		</DependenciesProvider>);
		const combobox = screen.getByRole('combobox', { name: 'comboboxLabel' });

		await user.type(combobox, 'ab');

		expect(combobox).toHaveValue('ab');
	});

	it('n‘appelle pas le service lorsque l‘utilisateur tappe moins de 3 charactères', async () => {
		const user = userEvent.setup();
		const localisationService = aLocalisationService({
			rechercherCommune: jest.fn(),
		});

		render(<DependenciesProvider localisationService={localisationService}>
			<ComboboxCommune label={'comboboxLabel'}/>
		</DependenciesProvider>);
		const combobox = screen.getByRole('combobox', { name: 'comboboxLabel' });

		await user.type(combobox, 'ab');

		expect(localisationService.rechercherCommune).not.toHaveBeenCalled();
	});

	it('n‘affiche pas l‘input de sélection du rayon', () => {
		const localisationService = aLocalisationService({
			rechercherCommune: jest.fn(),
		});
		render(<DependenciesProvider localisationService={localisationService}>
			<ComboboxCommune label={'comboboxLabel'}/>
		</DependenciesProvider>);

		expect(screen.queryByRole('button', { name: 'Rayon' })).not.toBeInTheDocument();
		expect(screen.queryByDisplayValue(DEFAULT_RADIUS_VALUE)).not.toBeInTheDocument();
	});

	describe('lorsque je fais une recherche avec au moins 3 caractères', () => {
		it('appelle le service lorsque l‘utilisateur tappe 3 charactères', async () => {
			const user = userEvent.setup();
			const localisationService = aLocalisationService({
				rechercherCommune: jest.fn(),
			});

			render(<DependenciesProvider localisationService={localisationService}>
				<ComboboxCommune label={'comboboxLabel'}/>
			</DependenciesProvider>);
			const combobox = screen.getByRole('combobox', { name: 'comboboxLabel' });

			await user.type(combobox, 'abc');

			expect(localisationService.rechercherCommune).toHaveBeenCalledTimes(1);
			expect(localisationService.rechercherCommune).toHaveBeenCalledWith('abc');
		});

		it('affiche les options', async () => {
			const user = userEvent.setup();
			const communeList = aRésultatsRechercheCommune([
				aCommune({ libelle: 'Paris' }),
				aCommune({ libelle: 'Toulon' }),
			]);
			const localisationService = aLocalisationService({
				rechercherCommune: jest.fn(),
			});
			jest.spyOn(localisationService, 'rechercherCommune').mockResolvedValue(createSuccess(communeList));
			render(<DependenciesProvider localisationService={localisationService}>
				<ComboboxCommune label={'comboboxLabel'}/>
			</DependenciesProvider>);
			const combobox = screen.getByRole('combobox', { name: 'comboboxLabel' });

			await user.type(combobox, 'abc');

			const options = screen.getAllByRole('option');
			expect(options.length).toBe(2);
			expect(options[0]).toBeVisible();
			expect(options[0]).toHaveTextContent('Paris');
			expect(options[1]).toBeVisible();
			expect(options[1]).toHaveTextContent('Toulon');
		});

		describe('lorsque je sélectionne une valeur valide', () => {
			it('l‘input est valide et n‘affiche pas de message d‘erreur', async () => {
				const user = userEvent.setup();
				const messageErreur = 'Veuillez sélectionner une option dans la liste';
				const communeList = aRésultatsRechercheCommune([
					aCommune({ code: '91000', libelle: 'Paris' }),
				]);
				const localisationService = aLocalisationService({
					rechercherCommune: jest.fn(),
				});
				jest.spyOn(localisationService, 'rechercherCommune').mockResolvedValue(createSuccess(communeList));
				render(<DependenciesProvider localisationService={localisationService}>
					<ComboboxCommune label={'comboboxLabel'}/>
				</DependenciesProvider>);
				const combobox = screen.getByRole('combobox', { name: 'comboboxLabel' });

				await user.type(combobox, 'abc');
				await user.click(screen.getByText('Paris'));

				expect(combobox).toBeValid();
				expect(screen.queryByText(messageErreur)).not.toBeInTheDocument();
			});

			it('met à jour la valeur du code commune', async () => {
				const user = userEvent.setup();
				const communeList = aRésultatsRechercheCommune([
					aCommune({ code: '91000', libelle: 'Paris' }),
				]);
				const localisationService = aLocalisationService({
					rechercherCommune: jest.fn(),
				});
				jest.spyOn(localisationService, 'rechercherCommune').mockResolvedValue(createSuccess(communeList));
				render(<DependenciesProvider localisationService={localisationService}>
					<ComboboxCommune label={'comboboxLabel'}/>
				</DependenciesProvider>);
				const combobox = screen.getByRole('combobox', { name: 'comboboxLabel' });

				await user.type(combobox, 'abc');
				await user.click(screen.getByText('Paris'));

				const inputCode = screen.getByDisplayValue('91000');
				expect(inputCode).toBeInTheDocument();
			});

			it('met à jour la valeur de la latitude', async () => {
				const user = userEvent.setup();
				const communeList = aRésultatsRechercheCommune([
					aCommune({ coordonnées: { latitude: 1.23, longitude: 4.56 }, libelle: 'Paris' }),
				]);
				const localisationService = aLocalisationService({
					rechercherCommune: jest.fn(),
				});
				jest.spyOn(localisationService, 'rechercherCommune').mockResolvedValue(createSuccess(communeList));
				render(<DependenciesProvider localisationService={localisationService}>
					<ComboboxCommune label={'comboboxLabel'}/>
				</DependenciesProvider>);
				const combobox = screen.getByRole('combobox', { name: 'comboboxLabel' });

				await user.type(combobox, 'abc');
				await user.click(screen.getByText('Paris'));

				const inputCode = screen.getByDisplayValue('1.23');
				expect(inputCode).toBeInTheDocument();
			});

			it('met à jour la valeur de la longitude', async () => {
				const user = userEvent.setup();
				const communeList = aRésultatsRechercheCommune([
					aCommune({ coordonnées: { latitude: 1.23, longitude: 4.56 }, libelle: 'Paris' }),
				]);
				const localisationService = aLocalisationService({
					rechercherCommune: jest.fn(),
				});
				jest.spyOn(localisationService, 'rechercherCommune').mockResolvedValue(createSuccess(communeList));
				render(<DependenciesProvider localisationService={localisationService}>
					<ComboboxCommune label={'comboboxLabel'}/>
				</DependenciesProvider>);
				const combobox = screen.getByRole('combobox', { name: 'comboboxLabel' });

				await user.type(combobox, 'abc');
				await user.click(screen.getByText('Paris'));

				const inputCode = screen.getByDisplayValue('4.56');
				expect(inputCode).toBeInTheDocument();
			});

			describe('selection du radius', () => {
				it('affiche le bouton de sélection du radius avec sa valeur par default', async () => {
					const user = userEvent.setup();
					const communeList = aRésultatsRechercheCommune([
						aCommune({ coordonnées: { latitude: 1.23, longitude: 4.56 }, libelle: 'Paris' }),
					]);
					const localisationService = aLocalisationService({
						rechercherCommune: jest.fn(),
					});
					jest.spyOn(localisationService, 'rechercherCommune').mockResolvedValue(createSuccess(communeList));
					render(<DependenciesProvider localisationService={localisationService}>
						<ComboboxCommune label={'comboboxLabel'}/>
					</DependenciesProvider>);
					const combobox = screen.getByRole('combobox', { name: 'comboboxLabel' });

					await user.type(combobox, 'abc');
					await user.click(screen.getByText('Paris'));

					expect(screen.getByRole('button', { name: 'Rayon' })).toBeVisible();
					expect(screen.getByDisplayValue(DEFAULT_RADIUS_VALUE)).toBeVisible();
				});

				it('quand on sélectionne un rayon, le rayon est sélectionné', async () => {
					const user = userEvent.setup();
					const radiusToSelect = radiusList[1];
					const communeList = aRésultatsRechercheCommune([
						aCommune({ coordonnées: { latitude: 1.23, longitude: 4.56 }, libelle: 'Paris' }),
					]);
					const localisationService = aLocalisationService({
						rechercherCommune: jest.fn(),
					});
					jest.spyOn(localisationService, 'rechercherCommune').mockResolvedValue(createSuccess(communeList));
					render(<DependenciesProvider localisationService={localisationService}>
						<ComboboxCommune label={'comboboxLabel'}/>
					</DependenciesProvider>);
					const combobox = screen.getByRole('combobox', { name: 'comboboxLabel' });

					await user.type(combobox, 'abc');
					await user.click(screen.getByText('Paris'));

					const rayonSelect = screen.getByRole('button', { name: 'Rayon' });
					await user.click(rayonSelect);
					await user.click(screen.getByRole('option', { name: radiusToSelect.libellé }));

					expect(screen.getByDisplayValue(radiusToSelect.valeur)).toBeVisible();
				});
			});

			it('lorsque le combobox est invalide après avoir été valide, le bouton de sélection du rayon n‘apparait pas', async () => {
				const user = userEvent.setup();
				const communeList = aRésultatsRechercheCommune([
					aCommune({ coordonnées: { latitude: 1.23, longitude: 4.56 }, libelle: 'Paris' }),
				]);
				const localisationService = aLocalisationService({
					rechercherCommune: jest.fn(),
				});
				jest.spyOn(localisationService, 'rechercherCommune').mockResolvedValue(createSuccess(communeList));
				render(<DependenciesProvider localisationService={localisationService}>
					<ComboboxCommune required/>
				</DependenciesProvider>);
				const combobox = screen.getByRole('combobox');

				await user.type(combobox, 'abc');
				await user.click(screen.getByText('Paris'));
				await user.tab();

				await user.clear(combobox);

				expect(screen.queryByRole('button', { name: 'Rayon' })).not.toBeInTheDocument();
			});
		});

		describe('lorsque je ne sélectionne pas une valeur valide', () => {
			it('l‘input est en erreur et affiche le message d‘erreur', async () => {
				const user = userEvent.setup();
				const messageErreur = 'Veuillez sélectionner une option dans la liste';
				render(
					<DependenciesProvider localisationService={aLocalisationService()}>
						<ComboboxCommune/>
					</DependenciesProvider>,
				);

				const combobox = screen.getByRole('combobox');
				await user.type(combobox, 'ABCE');
				await user.tab();

				expect(combobox).toBeInvalid();
				expect(screen.getByText(messageErreur)).toBeVisible();
			});
		});
	});

	it('merge la description accessible avec l‘erreur', async () => {
		const user = userEvent.setup();
		const messageErreur = 'Veuillez sélectionner une option dans la liste';
		const aideSaisie = 'Commencez à taper pour voir des suggestions';
		render(
			<DependenciesProvider localisationService={aLocalisationService()}>
				<ComboboxCommune aria-describedby="aide-saisie"/>
				<p id="aide-saisie">{aideSaisie}</p>
			</DependenciesProvider>,
		);

		const combobox = screen.getByRole('combobox');
		await user.type(combobox, 'ABCE');
		await user.tab();

		expect(combobox).toBeInvalid();
		expect(combobox).toHaveAccessibleDescription(expect.stringContaining(aideSaisie));
		expect(combobox).toHaveAccessibleDescription(expect.stringContaining(messageErreur));
	});

	describe('Message d‘asynchonisme', () => {
		it('affiche le message d‘aide quand il a intéragit avec le champ', async () => {
			const user = userEvent.setup();
			const communeList = aRésultatsRechercheCommune();
			const localisationService = aLocalisationService({
				rechercherCommune: jest.fn(),
			});
			jest.spyOn(localisationService, 'rechercherCommune').mockResolvedValue(createSuccess(communeList));


			render(<DependenciesProvider localisationService={localisationService}>
				<ComboboxCommune label={'comboboxLabel'}/>
			</DependenciesProvider>);

			const combobox = screen.getByRole('combobox', { name: 'comboboxLabel' });
			await user.type(combobox, 'ab');

			expect(screen.getByRole('status')).toHaveTextContent(MESSAGE_CHAMP_VIDE);
		});

		it('affiche le message de chargement quand les résultats sont en train de charger', async () => {
			const user = userEvent.setup();
			const localisationService = aLocalisationService({
				rechercherCommune: jest.fn(),
			});
			jest.spyOn(localisationService, 'rechercherCommune').mockReturnValue(new Promise(() => {
			}));


			render(<DependenciesProvider localisationService={localisationService}>
				<ComboboxCommune label={'comboboxLabel'}/>
			</DependenciesProvider>);

			const combobox = screen.getByRole('combobox', { name: 'comboboxLabel' });
			await user.type(combobox, 'abc');

			expect(screen.getByRole('status')).toHaveTextContent(MESSAGE_CHARGEMENT);
		});

		it('affiche le message d‘erreur quand la recherche a echouée', async () => {
			const user = userEvent.setup();
			const localisationService = aLocalisationService({
				rechercherCommune: jest.fn(),
			});
			jest.spyOn(localisationService, 'rechercherCommune').mockResolvedValue(createFailure(ErreurMetier.CONTENU_INDISPONIBLE));


			render(<DependenciesProvider localisationService={localisationService}>
				<ComboboxCommune label={'comboboxLabel'}/>
			</DependenciesProvider>);

			const combobox = screen.getByRole('combobox', { name: 'comboboxLabel' });
			await user.type(combobox, 'abc');

			expect(screen.getByRole('status')).toHaveTextContent(MESSAGE_ERREUR_FETCH);
		});

		it('affiche le message pas de résultat quand il n‘y a pas de résultat', async () => {
			const user = userEvent.setup();
			const communeList = aRésultatsRechercheCommune([]);
			const localisationService = aLocalisationService({
				rechercherCommune: jest.fn(),
			});
			jest.spyOn(localisationService, 'rechercherCommune').mockResolvedValue(createSuccess(communeList));


			render(<DependenciesProvider localisationService={localisationService}>
				<ComboboxCommune label={'comboboxLabel'}/>
			</DependenciesProvider>);

			const combobox = screen.getByRole('combobox', { name: 'comboboxLabel' });
			await user.type(combobox, 'abc');

			expect(screen.getByRole('status')).toHaveTextContent(MESSAGE_PAS_DE_RESULTAT);
		});

		it('n‘affiche pas de message quand la recherche est en succès avec des résultats', async () => {
			const user = userEvent.setup();
			const communeList = aRésultatsRechercheCommune();
			const localisationService = aLocalisationService({
				rechercherCommune: jest.fn(),
			});
			jest.spyOn(localisationService, 'rechercherCommune').mockResolvedValue(createSuccess(communeList));


			render(<DependenciesProvider localisationService={localisationService}>
				<ComboboxCommune label={'comboboxLabel'}/>
			</DependenciesProvider>);

			const combobox = screen.getByRole('combobox', { name: 'comboboxLabel' });
			await user.type(combobox, 'abc');

			expect(screen.getByRole('status')).toHaveTextContent(/^$/);
		});
	});
});
