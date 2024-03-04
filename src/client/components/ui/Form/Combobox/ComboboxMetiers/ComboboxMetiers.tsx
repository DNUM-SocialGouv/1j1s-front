import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useId, useMemo, useState } from 'react';

import { Metier } from '~/client/components/ui/Form/Combobox/ComboboxMetiers/Metier';
import { useMetierDependency } from '~/client/context/metier.context';
import { isSuccess } from '~/server/errors/either';

import { Combobox } from '..';
import styles from './ComboboxMetiers.module.scss';

type ComboboxProps = React.ComponentPropsWithoutRef<typeof Combobox>;
type ComboboxMetiersProps = Omit<ComboboxProps, 'defaultValue' | 'optionsAriaLabel'> & {
  label?: string,
	defaultValue?: Metier,
  debounceTimeout?: number,
}

const DEFAULT_DEBOUNCE_TIMEOUT = 300;

// NOTE (BRUJ 05/02/2024): 3 caractère min pour éviter d'avoir 9 000 métiers et des soucis de performance
const MINIMUM_CHARACTER_NUMBER_FOR_SEARCH = 3;
const MESSAGE_ERREUR_FETCH = 'Une erreur est survenue lors de la récupération des métiers. Veuillez réessayer plus tard.';
const MESSAGE_PAS_DE_RESULTAT
  = 'Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un métier. Exemple : boulanger, …';
const MESSAGE_CHARGEMENT = 'Chargement…';
const MESSAGE_CHAMP_CARACTERE_MIN = 'Commencez à saisir au moins 3 caractères';
const DEFAULT_LABEL = 'Domaine';

function MetiersTrouves({ quantity }: { quantity: number }) {
	return (
		<small className={styles.nombreResultats}>{
			quantity > 1
				? `${quantity} métiers trouvés`
				: `${quantity} métier trouvé`
		}</small>
	);
}

type FetchStatus = 'init' | 'pending' | 'success' | 'failure';
type ComboboxRef = React.ComponentRef<typeof Combobox>;
export const ComboboxMetiers = React.forwardRef<ComboboxRef, ComboboxMetiersProps>(function ComboboxMetiers(props, ref) {
	const {
		label = DEFAULT_LABEL,
		defaultValue,
		onChange: onChangeProps = () => null,
		debounceTimeout = DEFAULT_DEBOUNCE_TIMEOUT,
		id: idProps,
		onInvalid: onInvalidProps = () => {},
		'aria-describedby': ariaDescribedby = '',
		...comboboxProps
	} = props;

	const metierRechercheService = useMetierDependency('metierService');
	function isInputValueLengthValid(inputValue: string) {
		return inputValue.length >= MINIMUM_CHARACTER_NUMBER_FOR_SEARCH;
	}

	const [fieldError, setFieldError] = useState<string | null>(null);
	const [metiers, setMetiers] =
		useState<Metier[]>(defaultValue ? [ defaultValue ] : []);
	const [status, setStatus] = useState<FetchStatus>('init');
	const [ value, setValue ] = useState(defaultValue?.label ?? '');

	const idState = useId();
	const inputId = idProps ?? idState;
	const errorId = useId();

	const getMetiersCall = useMemo( () => {
		return async function (motCle: string) {
			const response = await metierRechercheService.rechercherMetier(motCle);

			if (response && isSuccess(response)) {
				setStatus('success');
				setMetiers(response.result);
			} else {
				setStatus('failure');
			}
		};
	}, [metierRechercheService]);

	const handleRechercherWithDebounce = useMemo(() => {
		return debounce(getMetiersCall, debounceTimeout);
	}, [debounceTimeout, getMetiersCall]);

	useEffect(() => {
		return () => {
			handleRechercherWithDebounce.cancel();
		};
	}, [handleRechercherWithDebounce]);

	const getMetiersDebounced = useCallback(async function getMetiers(motCle: string) {
		if (!isInputValueLengthValid(motCle)) {
			handleRechercherWithDebounce.cancel();
			setMetiers([]);
			return;
		}
		setStatus('pending');
		handleRechercherWithDebounce(motCle);

	}, [handleRechercherWithDebounce]);

	return (
		<div>
			<label className={styles.label} htmlFor={inputId}>
				{label}
			</label>
			<Combobox
				ref={ref}
				optionsAriaLabel="métiers"
				autoComplete="off"
				id={inputId}
				valueName={comboboxProps.valueName || 'codeMetier'}
				name={comboboxProps.name || 'libelleMetier'}
				onChange={(event, newValue) => {
					setFieldError(null);
					getMetiersDebounced(newValue);
					setValue(newValue);
					onChangeProps(event, newValue);
				}}
				onInvalid={(event) => {
					setFieldError(event.currentTarget.validationMessage);
					onInvalidProps(event);
				}}
				value={value}
				requireValidOption
				filter={Combobox.noFilter}
				aria-describedby={`${ariaDescribedby} ${errorId}`}
				{...comboboxProps}
			>
				{
					(metiers.map((suggestion) => (
						<Combobox.Option key={suggestion.label} value={suggestion.code}>{suggestion.label}</Combobox.Option>
					)))
				}
				<Combobox.AsyncMessage>
					{
						!isInputValueLengthValid(value) && MESSAGE_CHAMP_CARACTERE_MIN
						|| status === 'failure' && MESSAGE_ERREUR_FETCH
						|| status === 'pending' && MESSAGE_CHARGEMENT
						|| metiers.length === 0 && MESSAGE_PAS_DE_RESULTAT
						|| <MetiersTrouves quantity={metiers.length} />
					}
				</Combobox.AsyncMessage>
			</Combobox>
			<p id={errorId} className={styles.instructionMessageError}>{fieldError}</p>
		</div>
	);
});
