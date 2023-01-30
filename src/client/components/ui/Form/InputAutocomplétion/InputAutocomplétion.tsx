import classNames from 'classnames';
import debounce from 'lodash/debounce';
import React, { ReactElement, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import Autosuggest from 'react-autosuggest';

import styles from '~/client/components/ui/Form/Input.module.scss';
import theme from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétion.module.scss';

interface AutocomplétionProps<T> {
	suggérer(préfixe: string): Promise<T[]> | T[];

	afficher(suggestion: T): string | ReactElement;

	valeur(suggestion: T): string;

	onChange?(event: SyntheticEvent, newValue: string): void;

	onSuggestionSelected?(event: SyntheticEvent, suggestion: T, suggestionValue: string, suggestionIndex: number, sectionIndex: number | null, method: string): void;

	shouldRenderSuggestions?(préfixe: string, reason: string): boolean;

	id?: string;
	valeurInitiale?: string;
	label?: string;
	debounce?: number;
	name?: string;
	placeholder?: string;
	required?: boolean;
	className?: string;
	focusInputOnSuggestionClick?: boolean;
	highlightFirstSuggestion?: boolean;
}

export default function InputAutocomplétion<T>(props: AutocomplétionProps<T>) {
	const {
		suggérer,
		afficher,
		valeur,
		onChange: onChangeCallback,
		onSuggestionSelected: onSuggestionSelectedCallback,
		debounce: debounceTimeout = 200,
		shouldRenderSuggestions: shouldRenderSuggestionsFunction,
		id,
		label,
		valeurInitiale,
		...rest
	} = props;

	const [inputVide, setInputVide] = useState(false);
	const [valeurInput, setValeurInput] = useState(valeurInitiale || '');
	const [suggestions, setSuggestions] = useState<T[]>([]);
	const [valeurSélectionnée, setValeurSélectionnée] = useState<T>();

	useEffect(() => {
		if (valeurInitiale) {
			setValeurInput(valeurInitiale);
		}
	}, [valeurInitiale]);

	const recalculerSuggestions = useMemo(() => {
		return debounce(async ({ value }: { value: string }) => setSuggestions(await suggérer(value)), debounceTimeout);
	}, [debounceTimeout, suggérer]);

	function isChampVide(texte: string): boolean {
		return texte.trim().length == 0;
	}

	function viderSuggestions() {
		setSuggestions([]);
	}

	function onChange(event: SyntheticEvent, { newValue }: { newValue: string }) {
		setValeurInput(newValue);
		setInputVide(isChampVide(newValue));
		onChangeCallback?.(event, newValue);
	}

	function onBlur() {
		setInputVide(isChampVide(valeurInput));
		if (!valeurSélectionnée) setValeurInput('');
	}

	function onSuggestionSelected(event: SyntheticEvent, {
		suggestion,
		suggestionValue,
		suggestionIndex,
		sectionIndex,
		method,
	}:
		{ suggestion: T, suggestionValue: string, suggestionIndex: number, sectionIndex: number | null, method: string }) {
		setValeurSélectionnée(suggestion);
		onSuggestionSelectedCallback?.(event, suggestion, suggestionValue, suggestionIndex, sectionIndex, method);
	}

	function shouldRenderSuggestions(préfixe: string, reason: string): boolean {
		if (shouldRenderSuggestionsFunction) {
			return shouldRenderSuggestionsFunction(préfixe, reason);
		}

		return préfixe.trim().length > 0;
	}

	const inputProps = {
		className: classNames(styles.formControlInput, inputVide && styles.formControlInputError),
		id: id,
		onBlur: onBlur,
		onChange: onChange,
		value: valeurInput,
		...rest,
	};

	return (
		<div className={styles.wrapper}>
			{label && <label htmlFor={id} className={styles.label}>{label}</label>}
			<Autosuggest
				focusInputOnSuggestionClick
				highlightFirstSuggestion
				theme={theme}
				inputProps={inputProps}
				suggestions={suggestions}
				onSuggestionsFetchRequested={recalculerSuggestions}
				onSuggestionsClearRequested={viderSuggestions}
				onSuggestionSelected={onSuggestionSelected}
				getSuggestionValue={valeur}
				renderSuggestion={afficher}
				shouldRenderSuggestions={shouldRenderSuggestions}
			/>
			{inputVide && <p className={styles.formControlInputHint}>Veuillez renseigner ce champ.</p>}
		</div>
	);
}
