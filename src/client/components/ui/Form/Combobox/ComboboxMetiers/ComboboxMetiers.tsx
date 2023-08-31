import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useId, useMemo, useState } from 'react';

import { useDependency } from '~/client/context/dependenciesContainer.context';
import { BffMetierService } from '~/client/services/metiers/bff.metier.service';
import { isSuccess } from '~/server/errors/either';

import { Combobox } from '../index';
import styles from './ComboboxMetiers.module.scss';

type ComboboxProps = React.ComponentPropsWithoutRef<typeof Combobox>;
export type MetierOption = {
	label: string,
	romes: string[],
};
type ComboboxMetiersProps = Omit<ComboboxProps, 'aria-label' | 'aria-labelledby' | 'defaultValue'> & {
  label: string;
	defaultValue?: MetierOption
  debounceTimeout?: number;
	'aria-label'?: React.HTMLProps<'input'>['aria-label'];
	'aria-labelledby'?: React.HTMLProps<'input'>['aria-labelledby'];
}

const MESSAGE_ERREUR_FETCH = 'Une erreur est survenue lors de la récupération des métiers. Veuillez réessayer plus tard.';
const MESSAGE_PAS_DE_RESULTAT
  = 'Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un métier. Exemple : boulanger, ...';
const MESSAGE_CHARGEMENT = 'Chargement ...';
const MESSAGE_CHAMP_VIDE = 'Commencez à taper pour rechercher un métier';

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
		label,
		defaultValue,
		onChange: onChangeProps = () => null,
		debounceTimeout = 300,
		id: idProps,
		onInvalid: onInvalidProps = () => {},
		'aria-describedby': ariaDescribedby = '',
		...comboboxProps
	} = props;

	const metierRechercheService = useDependency<BffMetierService>('metierService');

	const [fieldError, setFieldError] = useState<string | null>(null);
	const [metiers, setMetiers] =
		useState<MetierOption[]>(defaultValue ? [ defaultValue ] : []);
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
		if (!motCle) {
			setMetiers([]);
			return;
		}
		setStatus('pending');
		handleRechercherWithDebounce(motCle);

	}, [handleRechercherWithDebounce]);

	const isEmpty = value === '';

	return (
		<div>
			{label && (
				<label className={styles.label} htmlFor={inputId}>
					{label}
				</label>
			)}
			<Combobox
				ref={ref}
				autoComplete="off"
				id={inputId}
				valueName={'codeRomes'}
				name={'libelleMetier'}
				aria-label={label}
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
						<Combobox.Option key={suggestion.label} value={suggestion.romes}>{suggestion.label}</Combobox.Option>
					)))
				}
				<Combobox.AsyncMessage>
					{
						isEmpty && MESSAGE_CHAMP_VIDE
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
