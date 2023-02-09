import classNames from 'classnames';
import debounce from 'lodash/debounce';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import styles from '~/client/components/ui/Form/Input.module.scss';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { AlternanceService } from '~/client/services/alternance/alternance.service';
import { MetierAlternance } from '~/server/alternances/domain/métier';
import { isSuccess } from '~/server/errors/either';

interface InputAutocomplétionMétierProps extends React.InputHTMLAttributes<unknown> {
	label?: string;
	required?: boolean;
	className?: string;
	name: string;
}

const ERROR_RETRIEVE_METIER = 'Une erreur est survenue lors de la récupération des métiers.';

export const InputAutocomplétionMétier = (props: InputAutocomplétionMétierProps) => {
	const { label, name, className, required, ...rest } = props;

	const métierRecherchéService = useDependency<AlternanceService>('alternanceService');

	const [suggestionsApi, setSuggestionsApi] = useState<MetierAlternance[]>([]);
	const [suggestionIndex, setSuggestionIndex] = useState(0);
	const [suggestionsActive, setSuggestionsActive] = useState(false);
	const [errorFromApi, setErrorFromApi] = useState('');
	const [métierRecherchéInput, setMétierRecherchéInput] = useState('');
	const [inputHiddenSelectedCodeRomes, setInputHiddenSelectedCodeRomes] = useState<string[]>([]);
	const [inputHiddenSelectedMétierLabel, setInputHiddenSelectedMétierLabel] = useState<string>('');
	const [isValueValidSelected, setIsValueValidSelected] = useState<boolean>(false);
	const [isTouched, setIsTouched] = useState<boolean>(false);

	const inputId = useRef(uuidv4());
	const errorId = useRef(uuidv4());

	const autocompleteRef = useRef<HTMLDivElement>(null);

	const CONTROL_ID = 'autocomplete-CONTROL_ID';

	const rechercherMétier = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
		setIsValueValidSelected(false);
		e.preventDefault();
		const { value } = e.target;
		if (value.length > 1) {
			const response = await métierRecherchéService.rechercherMétier(value);
			if (isSuccess(response)) {
				setSuggestionsApi(response.result);
				setErrorFromApi('');
				setSuggestionIndex(0);
				setSuggestionsActive(true);
			} else {
				setErrorFromApi(ERROR_RETRIEVE_METIER);
				setSuggestionsActive(false);
			}
		} else {
			setSuggestionsActive(false);
		}
	}, [métierRecherchéService]);

	const handleClick = (e: React.MouseEvent<HTMLLIElement>, selectedMétierRecherché: MetierAlternance) => {
		e.preventDefault();
		setIsValueValidSelected(true);
		setMétierRecherchéInput(selectedMétierRecherché.label);
		setInputHiddenSelectedCodeRomes(selectedMétierRecherché.romes);
		setInputHiddenSelectedMétierLabel(selectedMétierRecherché.label);
		setSuggestionsActive(false);
		setSuggestionsApi([]);
	};

	const closeSuggestionsOnClickOutside = useCallback((e: MouseEvent) => {
		if (!(autocompleteRef.current)?.contains(e.target as Node)) {
			setSuggestionsActive(false);
			setSuggestionsApi([]);
		}

	}, []);

	const closeSuggestionsOnKeyUp = useCallback((e: KeyboardEvent) => {
		if (e.key === KeyBoard.ESCAPE || e.key === KeyBoard.TAB) {
			setSuggestionsActive(false);
			setSuggestionsApi([]);
		}
	}, []);

	useEffect(() => {
		document.addEventListener('mousedown', closeSuggestionsOnClickOutside);
		document.addEventListener('keyup', closeSuggestionsOnKeyUp);

		return () => {
			document.removeEventListener('mousedown', closeSuggestionsOnClickOutside);
			document.removeEventListener('keyup', closeSuggestionsOnKeyUp);
		};
	}, [closeSuggestionsOnKeyUp, closeSuggestionsOnClickOutside]);

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
			setIsValueValidSelected(true);
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
				<span className={styles.aucunRésultat}>Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un métier. Exemple : boulangerie, cuisine...</span>
			) : (
				<ul
					className={styles.suggestionList}
					role="CONTROL_ID"
					aria-labelledby={label}
					id={CONTROL_ID}
				>
					{suggestionsApi.map((suggestion, index) => (
						<li
							className={index === suggestionIndex ? styles.hover : ''}
							key={index}
							onClick={(event) => handleClick(event, suggestion)}
							role="option"
							aria-selected={suggestion.label === inputHiddenSelectedMétierLabel}
						>
							{suggestion.label}
						</li>
					))}
				</ul>
			);
	};

	return (
		<div className={classNames(styles.wrapper, className)}>
			{label && (
				<label className={styles.inputLabel} htmlFor={inputId.current}>
					{label}
					{required && (
						<span className="text-small"> (champ obligatoire)</span>
					)}
				</label>
			)}
			<div ref={autocompleteRef}>
				<div
					role="combobox"
					aria-expanded={suggestionsActive}
					aria-controls={CONTROL_ID}
					aria-owns={CONTROL_ID}

					aria-haspopup="listbox"
				>
					<input
						className={styles.formControlInput}
						type="text"
						id={inputId.current}
						name={name}
						autoComplete="off"
						aria-autocomplete="list"
						aria-controls={CONTROL_ID}
						aria-activedescendant={inputId.current}
						value={métierRecherchéInput}
						onChange={(event) => {
							setMétierRecherchéInput(event.target.value);
							handleChange(event);
						}}
						onBlur={() => setIsTouched(true)}
						onKeyDown={handleKeyDown}
						required={required}
						{...rest}
					/>
					<input type="hidden" value={inputHiddenSelectedCodeRomes} name={name + '_codeRomes'}/>
					<input type="hidden" value={inputHiddenSelectedMétierLabel} name={name + 'métierSélectionné'}/>
				</div>
				{suggestionsActive && <Suggestions/>}
			</div>
			{errorFromApi && <p className={styles.textInputError} id={errorId.current}>{errorFromApi}</p>}
			{required && isTouched && !isValueValidSelected &&
		<p className={styles.textInputError} id={errorId.current}>rentre un vrai truc roh</p>}
		</div>
	);
};
