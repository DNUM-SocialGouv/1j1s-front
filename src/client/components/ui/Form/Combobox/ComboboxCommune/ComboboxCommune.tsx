import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useId, useMemo, useState } from 'react';

import styles from '~/client/components/ui/Form/Input.module.scss';
import { Select } from '~/client/components/ui/Select/Select';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { LocalisationService } from '~/client/services/localisation/localisation.service';
import { isSuccess } from '~/server/errors/either';
import { radiusList } from '~/server/localisations/domain/localisation';
import { Commune } from '~/server/localisations/domain/localisationAvecCoordonnées';

import { Combobox } from '../index';

type ComboboxProps = React.ComponentPropsWithoutRef<typeof Combobox>;
type ComboboxRef = React.ComponentRef<typeof Combobox>;

type ComboboxPropsWithOmit = Omit<ComboboxProps, 'label' | 'defaultValue'>
type FetchStatus = 'init' | 'pending' | 'success' | 'failure';

type ComboboxCommuneProps = {
	label?: string,
	id?: string,
	debounceTimeout?: number,
	defaultCommune?: Commune
	defaultDistance?: string
	showRadiusInput?: boolean
} & ComboboxPropsWithOmit

const MINIMUM_CHARACTER_NUMBER_FOR_SEARCH = 3;
const MESSAGE_ERREUR_FETCH = 'Une erreur est survenue lors de la récupération des lieux. Veuillez réessayer plus tard.';
const MESSAGE_PAS_DE_RESULTAT = 'Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un lieu. Exemple : Paris, ...';
const MESSAGE_CHARGEMENT = 'Chargement ...';
const MESSAGE_CHAMP_VIDE = 'Commencez à saisir au moins 3 caractères ou le code postal de la ville, puis sélectionnez votre localisation';
const DEFAULT_RADIUS_VALUE = '10';
const DEFAULT_DEBOUNCE_TIMEOUT = 200;

export const ComboboxCommune = React.forwardRef<ComboboxRef, ComboboxCommuneProps>(function ComboboxCommune(props, ref) {
	const {
		label = 'Localisation',
		id: idProps,
		onChange: onChangeProps = doNothing,
		defaultCommune: defaultCommuneProps,
		defaultDistance: defaultDistanceProps,
		debounceTimeout = DEFAULT_DEBOUNCE_TIMEOUT,
		'aria-describedby': ariaDescribedby = '',
		onInvalid: onInvalidProps = doNothing,
		showRadiusInput = false,
		...rest
	} = props;
	const localisationService = useDependency<LocalisationService>('localisationService');

	const [communeOptions, setCommuneOptions] = useState<Array<Commune>>(defaultCommuneProps ? [defaultCommuneProps] : []);
	const [userInput, setUserInput] = useState<string>(defaultCommuneProps?.libelle ?? '');

	const [status, setStatus] = useState<FetchStatus>('init');
	const [distanceCommune, setDistanceCommune] = useState<string>(defaultDistanceProps || DEFAULT_RADIUS_VALUE);
	const [fieldError, setFieldError] = useState<string | null>(null);

	const matchingOption = findMatchingOptionFromUserInput(userInput, communeOptions);

	const errorId = useId();
	const id = useId();
	const inputId = idProps ?? id;

	function isUserInputValid(userInput: string) {
		return userInput.length >= MINIMUM_CHARACTER_NUMBER_FOR_SEARCH;
	}

	const rechercherCommunesWithUserInputValid = useCallback(async (userInputCommune: string) => {
		const response = await localisationService.rechercherCommune(userInputCommune);
		if (response && isSuccess(response)) {
			setStatus('success');
			setCommuneOptions(response.result.résultats);
		} else {
			setStatus('failure');
		}
	}, [localisationService, setCommuneOptions]);

	const handleRechercherWithDebounce = useMemo(() => {
		return debounce(rechercherCommunesWithUserInputValid, debounceTimeout);
	}, [rechercherCommunesWithUserInputValid, debounceTimeout]);

	const rechercherCommunes = useCallback(function (commune: string) {
		if (isUserInputValid(commune)) {
			setStatus('pending');
			handleRechercherWithDebounce(commune);
		}
	}, [handleRechercherWithDebounce]);


	useEffect(() => {
		return () => {
			handleRechercherWithDebounce.cancel();
		};
	}, [handleRechercherWithDebounce]);

	function isListeDeResultatEmpty() {
		return communeOptions.length === 0;
	}

	function findMatchingOptionFromUserInput(userInput: string, communeList: Array<Commune>) {
		return communeList.find((commune) => userInput === commune.libelle);
	}

	return (
		<>
			<div>
				<label htmlFor={inputId} className={styles.label}>
					{label}
				</label>
				<Combobox
					valueName="libelleCommune"
					ref={ref}
					autoComplete="off"
					filter={Combobox.noFilter}
					aria-label={label}
					placeholder={'Exemples : Paris, Béziers...'}
					id={inputId}
					value={userInput}
					requireValidOption
					onChange={(event, newValue) => {
						setFieldError(null);
						rechercherCommunes(newValue);
						setUserInput(newValue);
						onChangeProps(event, newValue);
					}}
					aria-describedby={`${ariaDescribedby} ${errorId}`}
					onInvalid={(event) => {
						onInvalidProps(event);
						setFieldError(event.currentTarget.validationMessage);
					}}
					{...rest}
				>
					{
						(communeOptions.map((commune: Commune) => (
							<Combobox.Option key={commune.libelle}>
								{commune.libelle}
							</Combobox.Option>
						)))
					}
					<Combobox.AsyncMessage>{
						!isUserInputValid(userInput) && MESSAGE_CHAMP_VIDE
						|| status === 'failure' && MESSAGE_ERREUR_FETCH
						|| status === 'pending' && MESSAGE_CHARGEMENT
						|| isListeDeResultatEmpty() && MESSAGE_PAS_DE_RESULTAT
						|| ''
					}</Combobox.AsyncMessage>
				</Combobox>
				<span id={errorId} className={styles.instructionMessageError}>{fieldError}</span>
				<input type="hidden" name="codeCommune" value={matchingOption?.code ?? ''}/>
				<input type="hidden" name="latitudeCommune" value={matchingOption?.coordonnées.latitude ?? ''}/>
				<input type="hidden" name="longitudeCommune" value={matchingOption?.coordonnées.longitude ?? ''}/>
				<input type="hidden" name="codePostal" value={matchingOption?.codePostal ?? ''}/>
				<input type="hidden" name="ville" value={matchingOption?.ville ?? ''}/>
			</div>
			{showRadiusInput && !fieldError && matchingOption?.code && userInput && <Select
				label="Rayon"
				name="distanceCommune"
				optionList={radiusList}
				onChange={setDistanceCommune}
				value={distanceCommune}
			/>}
		</>
	);
});

function doNothing() {
	return;
}


