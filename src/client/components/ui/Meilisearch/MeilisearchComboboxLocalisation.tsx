import React, { useCallback, useMemo, useState } from 'react';
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch';

import { Champ } from '../Form/Champ/Champ';
import { Combobox } from '../Form/Combobox';

const MESSAGE_PAS_DE_RESULTAT = 'Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un lieu. Exemple : Paris, Marseille …';
const NOMBRE_RESULTAT_MAXIMUM = 20;

export function MeilisearchComboboxLocalisation(props: UseRefinementListProps) {
	const { refine, items } = useRefinementList(props);
	const [userInput, setUserInput] = useState<string>('');

	const filterLocalisations = useCallback(function filterLocalisation() {
		function isLocalisationMatchingUserInput(localisation: string) {
			return localisation.toLowerCase().includes(userInput.toLowerCase());
		}

		return items.filter(({ value, isRefined }) => !isRefined && isLocalisationMatchingUserInput(value));
	}, [items, userInput]);

	const listeDeLocalisations = useMemo(() => filterLocalisations().map(({ value }) => value).slice(0, NOMBRE_RESULTAT_MAXIMUM),
		[filterLocalisations]);

	function findMatchingOption(userInput: string) {
		listeDeLocalisations.map((localisation) => {
			if (localisation === userInput) {
				refine(localisation);
				setUserInput('');
			}
		});
	}

	return (
		<Champ>
			<Champ.Label>
				Localisation
			</Champ.Label>
			<Champ.Input
				render={Combobox}
				valueName="inputLocalisation"
				requireValidOption
				optionsAriaLabel="villes"
				placeholder={'Exemples : Toulouse, Paris…'}
				value={userInput}
				autoComplete="off"
				filter={Combobox.noFilter}
				onChange={(_, newValue) => {
					setUserInput(newValue);
					findMatchingOption(newValue);
				}}>
				{listeDeLocalisations.map((suggestion) => (
					<Combobox.Option key={suggestion}>
						{suggestion}
					</Combobox.Option>
				))}
				<Combobox.AsyncMessage>{listeDeLocalisations.length === 0 && MESSAGE_PAS_DE_RESULTAT}</Combobox.AsyncMessage>
			</Champ.Input>
			<Champ.Error/>
		</Champ>
	);
}
