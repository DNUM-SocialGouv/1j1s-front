import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useDependency } from '~/client/context/dependenciesContainer.context';
import { LocalisationService } from '~/client/services/localisation/localisation.service';
import { isSuccess } from '~/server/errors/either';
import { Commune } from '~/server/localisations/domain/localisationAvecCoordonnées';

import { Combobox } from '../index';

type ComboboxProps = React.ComponentPropsWithoutRef<typeof Combobox>;
type ComboboxPropsWithOmit = Omit<ComboboxProps, 'label' | 'defaultValue'>
type FetchStatus = 'init' | 'pending' | 'success' | 'failure';

type ComboboxCommuneProps = {
	label?: string,
	id?: string,
	debounceTimeout?: number,
	defaultValue?: string
} & ComboboxPropsWithOmit

const MINIMUM_CHARACTER_NUMBER_FOR_SEARCH = 3;
const MESSAGE_ERREUR_FETCH = 'Une erreur est survenue lors de la récupération des lieux. Veuillez réessayer plus tard.';
const MESSAGE_PAS_DE_RESULTAT = 'Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un lieu. Exemple : Paris, ...';
const MESSAGE_CHARGEMENT = 'Chargement ...';
const MESSAGE_CHAMP_VIDE = 'Commencez à saisir au moins 3 caractères, puis sélectionnez votre localisation';


export function ComboboxCommune({
	label = 'Localisation',
	id,
	onChange: onChangeProps = doNothing,
	defaultValue = '',
	debounceTimeout = 0,
	...rest
}: ComboboxCommuneProps) {
	const localisationService = useDependency<LocalisationService>('localisationService');

	const [communeList, setCommuneList] = useState<Array<Commune>>([]);
	const [userInput, setUserInput] = useState<string>(defaultValue);
	const [codeCommune, setCodeCommune] = useState<string>('');
	const [latitudeCommune, setLatitudeCommune] = useState<string>('');
	const [longitudeCommune, setLongitudeCommune] = useState<string>('');
	const [status, setStatus] = useState<FetchStatus>('init');

	function isUserInputValid(commune: string) {
		return commune.length >= MINIMUM_CHARACTER_NUMBER_FOR_SEARCH;
	}

	const rechercherCommunesWithUserInputValid = useCallback(async (commune: string) => {
		const response = await localisationService.rechercherCommune(commune);
		if (response && isSuccess(response)) {
			setStatus('success');
			setCommuneList(response.result.résultats ?? []);
		} else {
			setStatus('failure');
			// TODO (BRUJ 16/11/2023): rajouter la gestion d‘erreur
		}
	}, [localisationService]);

	const handleRechercherWithDebounce = useMemo(() => {
		return debounce(rechercherCommunesWithUserInputValid, debounceTimeout);
	}, [rechercherCommunesWithUserInputValid, debounceTimeout]);

	const rechercherCommunes = useCallback(function (commune: string) {
		if (isUserInputValid(commune)) {
			setStatus('pending');
			handleRechercherWithDebounce(commune);
		}
	}, [handleRechercherWithDebounce]);

	useEffect(function updateSupplementaryInformation() {
		const communeFound = communeList.find((commune) => userInput === commune.libelle);
		setCodeCommune(communeFound?.code ?? '');
		setLatitudeCommune(communeFound?.coordonnées.latitude.toString() ?? '');
		setLongitudeCommune(communeFound?.coordonnées.longitude.toString() ?? '');
	}, [communeList, userInput]);


	function isPasDeResultat() {
		return communeList.length === 0;
	}

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
					rechercherCommunes(newValue);
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
				<Combobox.AsyncMessage>{
					!isUserInputValid(userInput) && MESSAGE_CHAMP_VIDE
					|| status === 'failure' && MESSAGE_ERREUR_FETCH
					|| status === 'pending' && MESSAGE_CHARGEMENT
					|| isPasDeResultat() && MESSAGE_PAS_DE_RESULTAT
					|| ''
				}</Combobox.AsyncMessage>
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


