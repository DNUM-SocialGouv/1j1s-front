import debounce from 'lodash/debounce';
import React, { ChangeEvent, useCallback, useEffect, useId,useMemo, useRef, useState } from 'react';

import { Combobox } from '~/client/components/ui/Form/Combobox';
import styles from '~/client/components/ui/Form/Input.module.scss';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { MétierService } from '~/client/services/métiers/métier.service';
import { isSuccess } from '~/server/errors/either';
import { Métier } from '~/server/metiers/domain/métier';

type InputAutocomplétionMétierProps = Omit<React.ComponentPropsWithoutRef<typeof Combobox>, 'aria-label' | 'aria-labelledby'> & {
	label: string;
	name: string;
	libellé?: string;
	codeRomes?: string;
}

const ERROR_RETRIEVE_METIER = 'Une erreur est survenue lors de la récupération des métiers.';
const MESSAGE_PAS_DE_RESULTAT
	= 'Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un métier. Exemple : boulanger, ...';

export const InputAutocomplétionMétier = (props: InputAutocomplétionMétierProps) => {
	const {
		label,
		name,

		// default value
		libellé,
		codeRomes,

		...comboboxProps
	} = props;

	const comboboxRef = useRef<HTMLInputElement>(null);

	const métierRecherchéService = useDependency<MétierService>('métierService');

	const [ fieldError, setFieldError] = useState<string | null>(null);
	const [ métiers, setMétiers ] = useState<Métier[]>([]);
	const [ status, setStatus ] = useState<'success' | 'failure'>('success');

	const inputId = useId();
	const errorId = useId();

	const getMetiers = useCallback(async function getMetiers(motCle: string) {
		if (motCle) {
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
		// FIXME (GAFI 18-07-2023): magic number
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
						status === 'failure' && ERROR_RETRIEVE_METIER
						|| métiers.length === 0 && MESSAGE_PAS_DE_RESULTAT
					}
				</Combobox.AsyncMessage>
			</Combobox>
			<p id={errorId} className={styles.instructionMessageError}>{fieldError}</p>
		</div>
	);
};
