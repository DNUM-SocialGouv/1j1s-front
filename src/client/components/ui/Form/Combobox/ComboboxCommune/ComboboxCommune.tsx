import React, { useMemo, useState } from 'react';

import { useDependency } from '~/client/context/dependenciesContainer.context';
import { LocalisationService } from '~/client/services/localisation/localisation.service';
import { isSuccess } from '~/server/errors/either';
import { Commune } from '~/server/localisations/domain/localisationAvecCoordonnées';

import { Combobox } from '../index';

type ComboboxProps = React.ComponentPropsWithoutRef<typeof Combobox>;
type ComboboxPropsWithOmit = Omit<ComboboxProps, 'label'>

type ComboboxCommuneProps = {
	label?: string,
	id?: string
} & ComboboxPropsWithOmit

const MINIMUM_CHARACTER_NUMBER_FOR_SEARCH = 3;

export function ComboboxCommune({ label = 'Localisation', id, onChange: onChangeProps = doNothing, ...rest }: ComboboxCommuneProps) {
	const localisationService = useDependency<LocalisationService>('localisationService');

	const [communeList, setCommuneList] = useState<Array<Commune>>([]);

	const getCommunes = useMemo(() => {
		return async function (commune: string) {
			if (commune.length >= MINIMUM_CHARACTER_NUMBER_FOR_SEARCH) {
				const response = await localisationService.rechercherCommune(commune);
				if (response && isSuccess(response)) {
					setCommuneList(response.result.résultats ?? []);
				} else {
					// TODO (BRUJ 16/11/2023): rajouter le status
				}
			}
		};
	}, [localisationService]);

	return (
		<div>
			<label htmlFor={id}>
				{label}
			</label>
			<Combobox
				filter={Combobox.noFilter}
				aria-label={label} 
				id={id}
				onChange={(event, newValue) => {
					getCommunes(newValue);
					onChangeProps(event, newValue);
				}}
				{...rest}
			>
				{
					(communeList.map((option: Commune) => (
						// TODO (BRUJ 16/11/2023): Code ??
						<Combobox.Option key={option.libelle} value={option.code}>{option.libelle}</Combobox.Option>
					)))
				}
			</Combobox>
		</div>
	);
}

function doNothing() {
	return;
}
