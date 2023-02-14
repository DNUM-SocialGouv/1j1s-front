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

interface InputAutocomplétionMétierProps extends React.ComponentPropsWithoutRef<'input'> {
	label?: string;
	required?: boolean;
	className?: string;
	name: string;
	libellé?: string;
	codeRomes?: string;
}

const ERROR_RETRIEVE_METIER = 'Une erreur est survenue lors de la récupération des métiers.';
const HINT_INPUT_INVALID = 'Veuillez séléctionner un métier valide';

export const InputAutocomplétionMétier = (props: InputAutocomplétionMétierProps) => {
	const { label, libellé, name, className, required, onChange, onFocus, codeRomes, ...rest } = props;

	const métierRecherchéService = useDependency<AlternanceService>('alternanceService');

	const [suggestionsApi, setSuggestionsApi] = useState<MetierAlternance[]>([]);
	const [suggestionIndex, setSuggestionIndex] = useState(0);
	const [suggestionsActive, setSuggestionsActive] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [métierRecherchéInput, setMétierRecherchéInput] = useState(libellé || '');
	const [codeRomesInput, setcodeRomesInput] = useState<string[]>([]);
	const [isValueValidSelected, setIsValueValidSelected] = useState<boolean>(false);
	const [isFocus, setIsFocus] = useState<boolean>(false);
	const [isTouched, setIsTouched] = useState<boolean>(false);

	const inputId = useRef(uuidv4());
	const errorId = useRef(uuidv4());

	const autocompleteRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const CONTROL_ID = 'autocomplete-métier';

	useEffect(() => {
		if (libellé) {
			setMétierRecherchéInput(libellé);
			setIsValueValidSelected(true);
		}
		if (codeRomes) {
			setcodeRomesInput(codeRomes.split(','));
		}
	}, [libellé, codeRomes]);

	const retrieveMétiers = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
		setIsValueValidSelected(false);
		inputRef.current?.setCustomValidity(HINT_INPUT_INVALID);
		e.preventDefault();
		const { value } = e.target;
		if (value.length > 1) {
			const response = await métierRecherchéService.rechercherMétier(value);
			if (isSuccess(response)) {
				setSuggestionsApi(response.result);
				setErrorMessage('');
				setSuggestionIndex(0);
				setSuggestionsActive(true);
			} else {
				setErrorMessage(ERROR_RETRIEVE_METIER);
				setSuggestionsActive(false);
			}
		} else {
			setSuggestionsActive(false);
		}
	}, [métierRecherchéService]);

	const handleRechercherWithDebounce = useMemo(() => {
		return debounce(retrieveMétiers, 300);
	}, [retrieveMétiers]);

	useEffect(() => {
		return () => {
			handleRechercherWithDebounce.cancel();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleClick = (e: React.MouseEvent<HTMLLIElement>, selectedMétierRecherché: MetierAlternance) => {
		e.preventDefault();
		setIsValueValidSelected(true);
		inputRef.current?.setCustomValidity('');
		setMétierRecherchéInput(selectedMétierRecherché.label);
		setcodeRomesInput(selectedMétierRecherché.romes);
		handleCloseSuggestion();
	};

	const handleFocusChange = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
		if (onFocus) {
			onFocus(event);
		}
		setIsTouched(true);
		setIsFocus(true);
	}, [onFocus]);

	const handleChange = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(event);
		}
		setMétierRecherchéInput(event.target.value);
		handleRechercherWithDebounce(event);
	}, [onChange, handleRechercherWithDebounce]);

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
			inputRef.current?.setCustomValidity('');
			setMétierRecherchéInput(suggestionsApi[suggestionIndex].label);
			setcodeRomesInput(suggestionsApi[suggestionIndex].romes);
			setSuggestionsActive(false);
			event.preventDefault();
		}
	};

	const handleCloseSuggestion = useCallback(() => {
		setIsFocus(false);
		setSuggestionsActive(false);
		setSuggestionsApi([]);
	}, [setIsFocus]);

	const closeSuggestionsOnClickOutside = useCallback((e: MouseEvent) => {
		if (!(autocompleteRef.current)?.contains(e.target as Node)) {
			handleCloseSuggestion();
		}
	}, [handleCloseSuggestion]);

	const closeSuggestionsOnKeyUp = useCallback((e: KeyboardEvent) => {
		if (e.key === KeyBoard.ESCAPE || e.key === KeyBoard.TAB) {
			handleCloseSuggestion();
		}
	}, [handleCloseSuggestion]);

	useEffect(() => {
		document.addEventListener('mousedown', closeSuggestionsOnClickOutside);
		document.addEventListener('keyup', closeSuggestionsOnKeyUp);

		return () => {
			document.removeEventListener('mousedown', closeSuggestionsOnClickOutside);
			document.removeEventListener('keyup', closeSuggestionsOnKeyUp);
		};
	}, [closeSuggestionsOnKeyUp, closeSuggestionsOnClickOutside, suggestionsActive]);


	const suggestions = useMemo(() => {
		return <ul
			className={styles.suggestionList}
			role="listbox"
			aria-labelledby={label}
			id={CONTROL_ID}
		>
			{suggestionsApi.length === 0 &&
          <li>Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un métier.
              Exemple : boulanger, ...
          </li>
			}
			{suggestionsApi.map((suggestion, index) => (
				<li
					className={index === suggestionIndex ? styles.hover : ''}
					key={index}
					onClick={(event) => {
						handleClick(event, suggestion);
					}}
					role="option"
					aria-selected={suggestion.label === métierRecherchéInput}
				>
					{suggestion.label}
				</li>
			))}
		</ul>;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [suggestionsApi, label, suggestionIndex, métierRecherchéInput]);

	return (
		<div className={classNames(styles.wrapper, className)}>
			{label && (
				<label className={styles.label} htmlFor={inputId.current}>
					{label}
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
						ref={inputRef}
						className={classNames(styles.formControlInput, required && !isFocus && isTouched && !isValueValidSelected && styles.formControlInputError)}
						type="text"
						id={inputId.current}
						name={name}
						autoComplete="off"
						aria-autocomplete="list"
						aria-controls={CONTROL_ID}
						aria-activedescendant={inputId.current}
						value={métierRecherchéInput}
						onFocus={handleFocusChange}
						onChange={
							handleChange
						}
						onKeyDown={handleKeyDown}
						required={required}
						{...rest}
					/>
					<input type="hidden" value={codeRomesInput} name={'codeRomes'}/>
				</div>
				{suggestionsActive && suggestions}
			</div>
			{errorMessage && <p className={styles.instructionMessageError} id={errorId.current}>{errorMessage}</p>}
			{required && !isFocus && isTouched && !isValueValidSelected &&
          <p className={styles.instructionMessageError} id={errorId.current}>{HINT_INPUT_INVALID}</p>
			}
		</div>
	);
};
