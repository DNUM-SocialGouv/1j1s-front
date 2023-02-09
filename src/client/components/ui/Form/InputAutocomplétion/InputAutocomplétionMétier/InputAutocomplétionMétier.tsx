import debounce from 'lodash/debounce';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import styles
	// eslint-disable-next-line import/no-unresolved
	from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionMétier/InputAutocomplétionMétier.module.scss';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { AlternanceService } from '~/client/services/alternance/alternance.service';
import { MetierAlternance } from '~/server/alternances/domain/métier';
import { isSuccess } from '~/server/errors/either';

interface InputAutocomplétionMétierProps {
	label?: string;
	required?: boolean;
	className?: string;
	name: string;
}


const ERROR_RETRIEVE_METIER = 'Une erreur est survenue lors de la récupération des métiers.';

export const InputAutocomplétionMétier = (props: InputAutocomplétionMétierProps) => {
	const { label, name, className, required } = props;

	const métierRecherchéService = useDependency<AlternanceService>('alternanceService');

	const [suggestionsApi, setSuggestionsApi] = useState<MetierAlternance[]>([]);
	const [suggestionIndex, setSuggestionIndex] = useState(0);
	const [suggestionsActive, setSuggestionsActive] = useState(false);
	const [error, setError] = useState('');
	const [métierRecherchéInput, setMétierRecherchéInput] = useState('');
	const [inputHiddenSelectedCodeRomes, setInputHiddenSelectedCodeRomes] = useState<string[]>([]);
	const [inputHiddenSelectedMétierLabel, setInputHiddenSelectedMétierLabel] = useState<string>('');

	const inputId = useRef(uuidv4());
	const errorId = useRef(uuidv4());

	const autocompleteRef = useRef<HTMLDivElement>(null);

	const listbox = 'autocomplete-listbox';

	const rechercherMétier = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { value } = e.target;
		if (value.length > 1) {
			const response = await métierRecherchéService.rechercherMétier(value);
			if (isSuccess(response)) {
				setSuggestionsApi(response.result);
				setError('');
				setSuggestionIndex(0);
				setSuggestionsActive(true);
			} else {
				setError(ERROR_RETRIEVE_METIER);
				setSuggestionsActive(false);
			}
		} else {
			setSuggestionsActive(false);
		}
	}, [métierRecherchéService]);

	const handleClick = (e: React.MouseEvent<HTMLLIElement>, selectedMétierRecherché: MetierAlternance) => {
		e.preventDefault();
		setMétierRecherchéInput(selectedMétierRecherché.label);
		setInputHiddenSelectedCodeRomes(selectedMétierRecherché.romes);
		setInputHiddenSelectedMétierLabel(selectedMétierRecherché.label);
		setSuggestionsActive(false);
		setSuggestionsApi([]);
	};

	const handleChange = useMemo(() => {
		return debounce(rechercherMétier, 300);
	}, [rechercherMétier]);

	useEffect(() => {
		return () => {
			handleChange.cancel();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === KeyBoard.ARROW_UP) {
			if (suggestionIndex === 0) {
				return;
			}
			setSuggestionIndex(suggestionIndex - 1);
		} else if (event.key === KeyBoard.ARROW_DOWN) {
			if (suggestionIndex + 1 === suggestionsApi.length) {
				return;
			}
			setSuggestionIndex(suggestionIndex + 1);
		} else if (event.key === KeyBoard.ENTER && suggestionsActive) {
			setMétierRecherchéInput(suggestionsApi[suggestionIndex].label);
			setInputHiddenSelectedCodeRomes(suggestionsApi[suggestionIndex].romes);
			setInputHiddenSelectedMétierLabel(suggestionsApi[suggestionIndex].label);
			setSuggestionsActive(false);
			event.preventDefault();
		}
	};

	const Suggestions = () => {
		return suggestionsApi.length === 0 ?
			(
				<span className={styles.autocompletionSuggestion}>Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un métier. Exemple : boulangerie, cuisine...</span>
			) : (
				<ul
					className={styles.autocompletionSuggestion}
					role="listbox"
					aria-labelledby={label}
					id={listbox}
				>
					{suggestionsApi.map((suggestion, index) => (
						<li
							className={index === suggestionIndex ? styles.active : ''}
							key={index}
							onClick={(event) => handleClick(event, suggestion)}
							role="option"
							aria-selected={false}
						>
							{suggestion.label}
						</li>
					))}
				</ul>
			);
	};

	return (
		<div className={className}>
			<div ref={autocompleteRef}>
				<div
					role="combobox"
					aria-expanded={suggestionsActive}
					aria-controls={listbox}
					aria-owns={listbox}
					aria-haspopup="listbox"
				>
					{label && (
						<label className={styles.textInputLabel} htmlFor={inputId.current}>
							{label}
							{required && (
								<span className="text-small">champ obligatoire</span>
							)}
						</label>
					)}
					<input
						type="text"
						name={name}
						id={inputId.current}
						aria-autocomplete="list"
						aria-controls={listbox}
						aria-activedescendant={inputId.current}
						value={métierRecherchéInput}
						onChange={(event) => {
							setMétierRecherchéInput(event.target.value);
							handleChange(event);
						}}
						onKeyDown={handleKeyDown}
						autoComplete="off"
					/>
					<input type="hidden" value={inputHiddenSelectedCodeRomes} name={name + '_codeRomes'}/>
					<input type="hidden" value={inputHiddenSelectedMétierLabel} name={name + 'métierSélectionné'}/>
				</div>
				{suggestionsActive && <Suggestions/>}
			</div>
			{error && <p className={styles.textInputError} id={errorId.current}>{error}</p>
			}
		</div>
	);
};
