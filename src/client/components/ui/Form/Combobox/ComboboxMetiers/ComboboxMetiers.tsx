import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import { useDependency } from '~/client/context/dependenciesContainer.context';
import { MetierService } from '~/client/services/metiers/metier.service';
import { isSuccess } from '~/server/errors/either';
import { Metier } from '~/server/metiers/domain/metier';

import { Combobox } from '../index';
import styles from './ComboboxMetiers.module.scss';

type ComboboxProps = Omit<React.ComponentPropsWithoutRef<typeof Combobox>, 'defaultValue'>;
type ComboboxMetiersProps = Omit<ComboboxProps, 'aria-label' | 'aria-labelledby'> & {
  label: string;
  name: string;
	defaultValue?: Metier
}

const DEBOUNCE_TIMEOUT = 300;

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

export const ComboboxMetiers = (props: ComboboxMetiersProps) => {
	const {
		label,
		name,
		defaultValue,
		onChange: onChangeProps = () => null,
		...comboboxProps
	} = props;

	// FIXME (GAFI 24-08-2023): voir si renommage toujours nécessaire après refacto
	const { label: libelle } = defaultValue ?? {};

	const comboboxRef = useRef<HTMLInputElement>(null);

	const metierRechercheService = useDependency<MetierService>('metierService');

	const [fieldError, setFieldError] = useState<string | null>(null);
	const [metiers, setMetiers] =
		useState<Metier[]>(defaultValue ? [ defaultValue ] : []);
	const [status, setStatus] = useState<'init' | 'pending' | 'success' | 'failure'>('init');
	const [ value, setValue ] = useState(libelle ?? '');

	const inputId = useId();
	const errorId = useId();

	const getMetiers = useCallback(async function getMetiers(motCle: string) {
		if (!motCle) {
			setMetiers([]);
			return;
		}

		setStatus('pending');
		const response = await metierRechercheService.rechercherMetier(motCle);
		if (isSuccess(response)) {
			setStatus('success');
			setMetiers(response.result);
		} else {
			setStatus('failure');
		}
	}, [metierRechercheService]);

	const handleRechercherWithDebounce = useMemo(() => {
		// FIXME (GAFI 18-07-2023): idéalement à injecter pour pouvoir tester
		return debounce(getMetiers, DEBOUNCE_TIMEOUT);
	}, [getMetiers]);

	useEffect(() => {
		return () => {
			handleRechercherWithDebounce.cancel();
		};
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
				ref={comboboxRef}
				autoComplete="off"
				id={inputId}
				name={name}
				valueName={'codeRomes'}
				aria-label={label}
				onChange={(event, newValue) => {
					setFieldError(null);
					handleRechercherWithDebounce(newValue);
					setValue(newValue);
					onChangeProps(event, newValue);
				}}
				onInvalid={(event) => {
					setFieldError(event.currentTarget.validationMessage);
				}}
				value={libelle}
				requireValidOption
				filter={Combobox.noFilter}
				aria-describedby={errorId}
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
};
