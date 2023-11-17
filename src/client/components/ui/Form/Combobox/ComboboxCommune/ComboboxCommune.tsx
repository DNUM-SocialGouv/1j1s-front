import React, { useMemo, useState, useEffect } from 'react';

import { useDependency } from '~/client/context/dependenciesContainer.context';
import { LocalisationService } from '~/client/services/localisation/localisation.service';
import { isSuccess } from '~/server/errors/either';
import { Commune } from '~/server/localisations/domain/localisationAvecCoordonnées';

import { Combobox } from '../index';

type ComboboxProps = React.ComponentPropsWithoutRef<typeof Combobox>;
type ComboboxPropsWithOmit = Omit<ComboboxProps, 'label' | 'defaultValue'>

type ComboboxCommuneProps = {
	label?: string,
	id?: string,
	defaultValue?: string
} & ComboboxPropsWithOmit

const MINIMUM_CHARACTER_NUMBER_FOR_SEARCH = 3;

export function ComboboxCommune({ label = 'Localisation', id, onChange: onChangeProps = doNothing, defaultValue = '',...rest }: ComboboxCommuneProps) {
	const localisationService = useDependency<LocalisationService>('localisationService');

	const [communeList, setCommuneList] = useState<Array<Commune>>([]);
	const [userInput, setUserInput]= useState<string>(defaultValue);
	const [codeCommune, setCodeCommune] = useState<string>('');
	const [latitudeCommune, setLatitudeCommune] = useState<string>('');
	const [longitudeCommune, setLongitudeCommune] = useState<string>('');


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

	useEffect(function updateSupplementaryInformation () {
		const communeFound = communeList.find((commune) => userInput === commune.libelle);
		setCodeCommune(communeFound?.code ?? '');
		setLatitudeCommune(communeFound?.coordonnées.latitude.toString() ?? '');
		setLongitudeCommune(communeFound?.coordonnées.longitude.toString() ?? '');
	}, [communeList, userInput]);

	
	return (
		<div>
			<label htmlFor={id}>
				{label}
			</label>
			<Combobox
				filter={Combobox.noFilter}
				aria-label={label}
				id={id}
				value={userInput}
				onChange={(event, newValue) => {
					getCommunes(newValue);
					setUserInput(newValue);
					onChangeProps(event, newValue);
				}}
				{...rest}
			>
				{
					(communeList.map((option: Commune) => (
						<Combobox.Option key={option.libelle} value={option.libelle}>{option.libelle}</Combobox.Option>
					)))
				}
			</Combobox>
			<input type="hidden" name="codeCommune" value={codeCommune}/>
			<input type="hidden" name="latitudeCommune" value={latitudeCommune}/>
			<input type="hidden" name="longitudeCommune" value={longitudeCommune}/>
		</div>
	);
}

function doNothing() {
	return;
}


