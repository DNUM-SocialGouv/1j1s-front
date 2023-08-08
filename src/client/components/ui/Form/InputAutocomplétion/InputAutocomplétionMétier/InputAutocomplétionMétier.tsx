import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useId,useMemo, useRef, useState } from 'react';

import { Combobox } from '~/client/components/ui/Form/Combobox';
import styles from '~/client/components/ui/Form/Input.module.scss';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { MétierService } from '~/client/services/métiers/métier.service';
import { isSuccess } from '~/server/errors/either';
import { Métier } from '~/server/metiers/domain/métier';

type ComboboxProps = React.ComponentPropsWithoutRef<typeof Combobox>;
type InputAutocomplétionMétierProps = Omit<ComboboxProps, 'aria-label' | 'aria-labelledby'> & {
	label: string;
	name: string;
	libellé?: string;
	codeRomes?: string;
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

export const InputAutocomplétionMétier = (props: InputAutocomplétionMétierProps) => {
	const {
		label,
		name,

		// FIXME (GAFI 19-07-2023): Passer sous la forme d'une default value pour expliciter l'usage :
		//	defaultValue: { libellé, codeRomes }
		libellé,
		codeRomes,

		...comboboxProps
	} = props;

	const comboboxRef = useRef<HTMLInputElement>(null);

	const métierRecherchéService = useDependency<MétierService>('métierService');

	const [ fieldError, setFieldError] = useState<string | null>(null);
	const [ métiers, setMétiers ] = useState<Métier[]>([]);
	const [ status, setStatus ] = useState<'init' | 'pending' | 'success' | 'failure'>('init');

	const inputId = useId();
	const errorId = useId();

	const getMetiers = useCallback(async function getMetiers(motCle: string) {
		if (motCle) {
			setStatus('pending');
			const response = await métierRecherchéService.rechercherMétier(motCle);
			if (isSuccess(response)) {
				setStatus('success');
				setMétiers(response.result);
			} else {
				setStatus('failure');
			}
		}
	}, [métierRecherchéService]);

	const handleRechercherWithDebounce = useMemo(() => {
		// FIXME (GAFI 18-07-2023): magic number, idéalement à injecter pour pouvoir tester sinon au moins extraire dans const
		return debounce(getMetiers, 300);
	}, [getMetiers]);

	useEffect(() => {
		return () => {
			handleRechercherWithDebounce.cancel();
		};
	}, [handleRechercherWithDebounce]);

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
				onChange={(event) => {
					setFieldError(null);
					handleRechercherWithDebounce(event.currentTarget.value);
				}}
				onInvalid={(event) => {
					setFieldError(event.currentTarget.validationMessage);
				}}
				defaultValue={libellé}
				requireValidOption
				filter={Combobox.noFilter}
				aria-describedby={errorId}
				{...comboboxProps}
			>
				{
					(métiers.length === 0 && libellé && codeRomes && <Combobox.Option value={codeRomes}>{libellé}</Combobox.Option>)
					|| (métiers.map((suggestion) => (
						<Combobox.Option key={suggestion.label} value={suggestion.romes}>{suggestion.label}</Combobox.Option>
					)))
				}
				<Combobox.AsyncMessage>
					{
						status === 'init' && MESSAGE_CHAMP_VIDE
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
