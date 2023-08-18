import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import { useDependency } from '~/client/context/dependenciesContainer.context';
import { MétierService } from '~/client/services/métiers/métier.service';
import { isSuccess } from '~/server/errors/either';
import { Métier } from '~/server/metiers/domain/métier';

import { Combobox } from '../index';
import styles from './ComboboxMetiers.module.scss';

type ComboboxProps = React.ComponentPropsWithoutRef<typeof Combobox>;
type InputAutocomplétionMétierProps = Omit<ComboboxProps, 'aria-label' | 'aria-labelledby'> & {
  label: string;
  name: string;
  libellé?: string;
  codeRomes?: string;
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

export const ComboboxMetiers = (props: InputAutocomplétionMétierProps) => {
	const {
		label,
		name,

		// FIXME (GAFI 19-07-2023): Passer sous la forme d'une default value pour expliciter l'usage :
		//	defaultValue: { libellé, codeRomes }
		libellé,
		codeRomes,

		onChange: onChangeProps = () => null,
		...comboboxProps
	} = props;

	const comboboxRef = useRef<HTMLInputElement>(null);

	const métierRecherchéService = useDependency<MétierService>('métierService');

	const [fieldError, setFieldError] = useState<string | null>(null);
	const [métiers, setMétiers] = useState<Métier[]>([]);
	const [status, setStatus] = useState<'init' | 'pending' | 'success' | 'failure'>('init');
	const [ value, setValue ] = useState(libellé ?? '');

	const inputId = useId();
	const errorId = useId();

	const getMetiers = useCallback(async function getMetiers(motCle: string) {
		if (!motCle) { return; }

		setStatus('pending');
		const response = await métierRecherchéService.rechercherMétier(motCle);
		if (isSuccess(response)) {
			setStatus('success');
			setMétiers(response.result);
		} else {
			setStatus('failure');
		}
	}, [métierRecherchéService]);

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
	const hasDefaultValue = libellé && codeRomes;
	const noResult = métiers.length === 0;
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
				value={libellé}
				requireValidOption
				filter={Combobox.noFilter}
				aria-describedby={errorId}
				{...comboboxProps}
			>
				{
					!isEmpty &&
					// FIXME (GAFI 18-08-2023): Simplifiable avec default value en object by adding it to the list
					((noResult && hasDefaultValue && <Combobox.Option value={codeRomes}>{libellé}</Combobox.Option>)
					|| (métiers.map((suggestion) => (
						<Combobox.Option key={suggestion.label} value={suggestion.romes}>{suggestion.label}</Combobox.Option>
					))))
				}
				<Combobox.AsyncMessage>
					{
						isEmpty && MESSAGE_CHAMP_VIDE
						|| status === 'failure' && MESSAGE_ERREUR_FETCH
						|| status === 'pending' && MESSAGE_CHARGEMENT
						|| métiers.length === 0 && MESSAGE_PAS_DE_RESULTAT
						|| <MetiersTrouves quantity={métiers.length} />
					}
				</Combobox.AsyncMessage>
			</Combobox>
			<p id={errorId} className={styles.instructionMessageError}>{fieldError}</p>
		</div>
	);
};
