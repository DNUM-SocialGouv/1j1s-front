import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useId, useMemo, useState } from 'react';

import { useDependency } from '~/client/context/dependenciesContainer.context';
import { Stage3emeService } from '~/client/services/stage3eme/stage3eme.service';
import { isSuccess } from '~/server/errors/either';

import { Combobox } from '..';
import styles from './ComboboxMetiersStage3eme.module.scss';

type ComboboxProps = React.ComponentPropsWithoutRef<typeof Combobox>;
export type MetierStage3emeOption = {
	code: string;
	libelle: string;
};
type ComboboxMetiersStage3emeProps = Omit<ComboboxProps, 'aria-label' | 'aria-labelledby' | 'defaultValue'> & {
  label?: string,
	defaultValue?: MetierStage3emeOption,
  debounceTimeout?: number,
	'aria-label'?: React.HTMLProps<'input'>['aria-label'],
	'aria-labelledby'?: React.HTMLProps<'input'>['aria-labelledby'],
}

const DEFAULT_DEBOUNCE_TIMEOUT = 300;

const MESSAGE_ERREUR_FETCH = 'Une erreur est survenue lors de la récupération des métiers. Veuillez réessayer plus tard.';
const MESSAGE_PAS_DE_RESULTAT
  = 'Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un métier. Exemple : boulanger, …';
const MESSAGE_CHARGEMENT = 'Chargement…';
const MESSAGE_CHAMP_VIDE = 'Commencez à taper pour rechercher un métier';
const DEFAULT_LABEL = 'Domaine';

function MetiersStage3emeTrouves({ quantity }: { quantity: number }) {
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
export const ComboboxMetiersStage3eme = React.forwardRef<ComboboxRef, ComboboxMetiersStage3emeProps>(function ComboboxMetiers(props, ref) {
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

	const stage3emeRechercheService = useDependency<Stage3emeService>('stage3emeService');

	const [fieldError, setFieldError] = useState<string | null>(null);
	const [metiersStage3eme, setMetiersStage3eme] =
		useState<MetierStage3emeOption[]>(defaultValue ? [ defaultValue ] : []);
	const [status, setStatus] = useState<FetchStatus>('init');
	const [ value, setValue ] = useState(defaultValue?.libelle ?? '');

	const idState = useId();
	const inputId = idProps ?? idState;
	const errorId = useId();

	const getMetiersStage3emeCall = useMemo( () => {
		return async function (motCle: string) {
			const response = await stage3emeRechercheService.rechercherAppellationMetier(motCle);

			if (response && isSuccess(response)) {
				setStatus('success');
				setMetiersStage3eme(response.result);
			} else {
				setStatus('failure');
			}
		};
	}, [stage3emeRechercheService]);

	const handleRechercherWithDebounce = useMemo(() => {
		return debounce(getMetiersStage3emeCall, debounceTimeout);
	}, [debounceTimeout, getMetiersStage3emeCall]);

	useEffect(() => {
		return () => {
			handleRechercherWithDebounce.cancel();
		};
	}, [handleRechercherWithDebounce]);

	const getMetiersStage3emeDebounced = useCallback(async function getMetiersStage3eme(motCle: string) {
		if (!motCle) {
			setMetiersStage3eme([]);
			return;
		}
		setStatus('pending');
		handleRechercherWithDebounce(motCle);

	}, [handleRechercherWithDebounce]);

	const isEmpty = value === '';

	return (
		<div>
			<label className={styles.label} htmlFor={inputId}>
				{label}
			</label>
			<Combobox
				ref={ref}
				autoComplete="off"
				id={inputId}
				valueName={'codeMetier'}
				name={'libelleMetier'}
				aria-label={label}
				onChange={(event, newValue) => {
					setFieldError(null);
					getMetiersStage3emeDebounced(newValue);
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
					(metiersStage3eme.map((suggestion) => (
						<Combobox.Option key={suggestion.libelle} value={suggestion.code}>{suggestion.libelle}</Combobox.Option>
					)))
				}
				<Combobox.AsyncMessage>
					{
						isEmpty && MESSAGE_CHAMP_VIDE
						|| status === 'failure' && MESSAGE_ERREUR_FETCH
						|| status === 'pending' && MESSAGE_CHARGEMENT
						|| metiersStage3eme.length === 0 && MESSAGE_PAS_DE_RESULTAT
						|| <MetiersStage3emeTrouves quantity={metiersStage3eme.length} />
					}
				</Combobox.AsyncMessage>
			</Combobox>
			<p id={errorId} className={styles.instructionMessageError}>{fieldError}</p>
		</div>
	);
});
