import React, { useCallback, useMemo, useState } from 'react';
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';

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

	function onOptionSelected(localisation: string) {
		refine(localisation);
		setUserInput('');
	}

	function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key == KeyBoard.ENTER) {
			const selectedOptionID = event.currentTarget.getAttribute('aria-activedescendant');
			if (selectedOptionID) {
				const selectedElement = document.getElementById(selectedOptionID);
				selectedElement?.textContent && onOptionSelected(selectedElement.textContent);
			}
		}
	}

	function onClickOnOption(event: React.MouseEvent<HTMLLIElement>) {
		event.currentTarget.textContent && onOptionSelected(event.currentTarget.textContent);
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
				onKeyDown={onKeyDown}
				autoComplete="off"
				filter={Combobox.noFilter}
				onChange={(_, newValue) => {
					setUserInput(newValue);
				}}>
				{listeDeLocalisations.map((suggestion) => (
					<Combobox.Option key={suggestion} onClick={onClickOnOption}>
						{suggestion}
					</Combobox.Option>
				))}
				<Combobox.AsyncMessage>{listeDeLocalisations.length === 0 && MESSAGE_PAS_DE_RESULTAT}</Combobox.AsyncMessage>
			</Champ.Input>
			<Champ.Error/>
		</Champ>
	);
}
