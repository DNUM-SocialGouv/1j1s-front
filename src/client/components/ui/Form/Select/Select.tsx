import classNames from 'classnames';
import debounce from 'lodash.debounce';
import React, {
	FocusEvent,
	KeyboardEvent,
	SyntheticEvent,
	useCallback,
	useId,
	useLayoutEffect,
	useMemo,
	useReducer,
	useRef,
	useState,
} from 'react';

import { Error } from '~/client/components/ui/Form/Error';

import { KeyBoard } from '../../../keyboard/keyboard.enum';
import { Icon } from '../../Icon/Icon';
import { Champ } from '../Champ/Champ';
import { Input } from '../Input';
import styles from './Select.module.scss';
import {
	getOptionsElement,
	SelectMultipleAction,
	SelectMultipleReducer,
	SelectReducer,
	SelectSimpleAction,
} from './SelectReducer';

type SelectProps = {
	label: string;
	labelComplement?: string
} & (
	SelectSimpleProps & { multiple?: false }
	| SelectMultipleProps & { multiple: true }
	)

type SelectMultipleProps = Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> & {
	optionList: Option[];
	value?: Array<string>;
	onChange?: (value: HTMLElement) => void;
	defaultValue?: Array<string>;
}

type SelectSimpleProps = Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> & {
	optionList: Option[];
	value?: string;
	onChange?: (value: HTMLElement) => void;
	defaultValue?: string;
}

export interface Option {
	libellé: string;
	valeur: string;
}

const SELECT_PLACEHOLDER_SINGULAR = 'Sélectionnez votre choix';
const SELECT_PLACEHOLDER_MULTIPLE = 'Sélectionnez vos choix';
const ERROR_LABEL_REQUIRED_SIMPLE = 'Séléctionnez un élément de la liste';
const ERROR_LABEL_REQUIRED_MULTIPLE = 'Séléctionnez au moins un élément de la liste';
const DEFAULT_DEBOUNCE_TIMEOUT = 300;

export function Select(props: SelectProps) {
	const {
		className,
		label,
		labelComplement,
		multiple,
		...rest
	} = props;
	const labelledBy = useId();

	function isSelectMultipleProps(rest: SelectSimpleProps | SelectMultipleProps): rest is SelectMultipleProps {
		return multiple === true;
	}

	function isSelectSimpleProps(rest: SelectSimpleProps | SelectMultipleProps): rest is SelectSimpleProps {
		return !multiple;
	}

	return (
		<div className={classNames(styles.selectWrapper, className)}>
			<Champ.Label className={styles.selectLabel} id={labelledBy}>
				{label}
				{labelComplement && <Champ.Label.Complement>{labelComplement}</Champ.Label.Complement>}
			</Champ.Label>
			{isSelectMultipleProps(rest) && <SelectMultiple labelledBy={labelledBy} {...rest}/>}
			{isSelectSimpleProps(rest) && <SelectSimple labelledBy={labelledBy} {...rest}/>}
		</div>
	);
}

function SelectSimple(props: SelectSimpleProps & { labelledBy: string }) {
	const {
		optionList,
		value,
		placeholder,
		name,
		onChange: onChangeProps = doNothing,
		labelledBy,
		defaultValue,
		'aria-describedby': ariaDescribedby = '',
		required,
		...rest
	} = props;
	const listboxRef = useRef<HTMLUListElement>(null);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const errorId = useId();
	const optionsId = useId();
	const listboxId = useId();
	const [state, dispatch] = useReducer(
		SelectReducer, {
			activeDescendant: undefined,
			isListOptionsOpen: false,
			optionSelectedValue: defaultValue ? defaultValue : '',
			refListOption: listboxRef,
			valueTypedByUser: '',
			visibleOptions: [],
		},
	);

	const optionSelectedValue = value ?? state.optionSelectedValue;

	const selectOption = useCallback((optionId: string) => {
		setErrorMessage('');
		dispatch(new SelectSimpleAction.SelectOption(optionId));
		const option = document.getElementById(optionId);
		if (option) onChangeProps(option);
	}, [onChangeProps]);

	const closeList = useCallback(() => {
		dispatch(new SelectSimpleAction.CloseList());
		if (required && !optionSelectedValue) {
			setErrorMessage(ERROR_LABEL_REQUIRED_SIMPLE);
		}
	}, [optionSelectedValue, required]);

	useLayoutEffect(function scrollOptionIntoView() {
		if (state.activeDescendant) {
			document.getElementById(state.activeDescendant)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}
	}, [state.activeDescendant]);

	// NOTE (BRUJ 17-05-2023): Sinon on perd le focus avant la fin du clique ==> élément invalid pour la sélection.
	const onMouseDown = useCallback(function preventBlurOnOptionSelection(event: React.MouseEvent<HTMLLIElement>) {
		event.preventDefault();
	}, []);

	const onBlur = useCallback(function onBlur(event: FocusEvent<HTMLDivElement>) {
		const newFocusStillInSelect = event.currentTarget.contains(event.relatedTarget);
		if (newFocusStillInSelect) {
			cancelEvent(event);
			return;
		}

		closeList();
	}, [closeList]);

	const isCurrentItemSelected = useCallback((optionValue?: string) => {
		return optionSelectedValue === optionValue;
	}, [optionSelectedValue]);

	const resetValueTypedByUser = useCallback(() => {
		dispatch(new SelectSimpleAction.SetValueTypedByUser(''));
	}, []);

	const handlefocusOnTypeLetterDebounce = useMemo(() => {
		return debounce(resetValueTypedByUser, DEFAULT_DEBOUNCE_TIMEOUT);
	}, [resetValueTypedByUser]);

	const handleUserTypeNewLetter = useCallback((key: string) => {
		function optionMatchUserInput(optionElement: Element) {
			return optionElement.textContent?.toLowerCase().startsWith(allUserInput.toLowerCase());
		}

		const allUserInput = state.valueTypedByUser.concat(key);
		dispatch(new SelectSimpleAction.SetValueTypedByUser(allUserInput));

		const optionsElement = getOptionsElement(state.refListOption);
		const firstOptionMatchingUserInput = optionsElement.find(optionMatchUserInput);
		if (firstOptionMatchingUserInput) {
			dispatch(new SelectSimpleAction.VisualyFocusOption(firstOptionMatchingUserInput));
		}
		handlefocusOnTypeLetterDebounce();
	}, [handlefocusOnTypeLetterDebounce, state.refListOption, state.valueTypedByUser]);

	const onKeyDown = useCallback(function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
		const { key, altKey, ctrlKey, metaKey } = event;

		const isUserTypeLetter = event.key.length === 1 && event.key !== KeyBoard.SPACE && !altKey && !ctrlKey && !metaKey;
		if (isUserTypeLetter) {
			event.preventDefault();
			if (!state.isListOptionsOpen) {
				dispatch(new SelectSimpleAction.OpenList());
			}
			handleUserTypeNewLetter(key);
		}

		switch (key) {
			case KeyBoard.PAGE_UP:
				if (state.isListOptionsOpen) {
					event.preventDefault();
					dispatch(new SelectSimpleAction.PreviousOption(10));
				}
				break;
			case KeyBoard.PAGE_DOWN:
				if (state.isListOptionsOpen) {
					event.preventDefault();
					dispatch(new SelectSimpleAction.NextOption(10));
				}
				break;
			case KeyBoard.ARROW_UP:
			case KeyBoard.IE_ARROW_UP:
				if (state.isListOptionsOpen) {
					if (altKey) {
						state.activeDescendant && selectOption(state.activeDescendant);
					} else {
						dispatch(new SelectSimpleAction.PreviousOption());
					}
				} else {
					dispatch(new SelectSimpleAction.OpenList());
				}
				event.preventDefault();
				break;
			case KeyBoard.ARROW_DOWN:
			case KeyBoard.IE_ARROW_DOWN:
				if (state.isListOptionsOpen) {
					dispatch(new SelectSimpleAction.NextOption());
				} else {
					dispatch(new SelectSimpleAction.OpenList());
				}
				event.preventDefault();
				break;
			case KeyBoard.ESCAPE:
			case KeyBoard.IE_ESCAPE:
				if (state.isListOptionsOpen) event.preventDefault();
				closeList();
				break;
			case KeyBoard.SPACE:
			case KeyBoard.ENTER: {
				if (state.isListOptionsOpen) {
					if (state.activeDescendant) {
						selectOption(state.activeDescendant);
						event.preventDefault();
					}
				} else {
					cancelEvent(event);
					dispatch(new SelectSimpleAction.OpenList());
				}
				break;
			}
			case KeyBoard.TAB: {
				if (state.isListOptionsOpen) {
					if (state.activeDescendant) {
						selectOption(state.activeDescendant);
					}
				}
				break;
			}
			case KeyBoard.HOME: {
				if (!state.isListOptionsOpen) {
					dispatch(new SelectSimpleAction.OpenList());
				}
				dispatch(new SelectSimpleAction.VisualyFocusFirstOption());
				event.preventDefault();
				break;
			}
			case KeyBoard.END: {
				if (!state.isListOptionsOpen) {
					dispatch(new SelectSimpleAction.OpenList());
				}
				dispatch(new SelectSimpleAction.VisualyFocusLastOption());
				event.preventDefault();
				break;
			}
			default:
				break;

		}
	}, [closeList, handleUserTypeNewLetter, selectOption, state]);

	function PlaceholderSelectedValue() {
		function getLabelByValue(value: string) {
			const optionValue = optionList.find((option) => option.valeur === value);
			return optionValue?.libellé ?? '';
		}

		if (optionSelectedValue) return getLabelByValue(optionSelectedValue);
		if (placeholder) return placeholder;
		return SELECT_PLACEHOLDER_SINGULAR;
	}

	return (
		<div>
			<div className={styles.container}>
				<div
					className={classNames(styles.combobox, errorMessage ? styles.comboboxError : '')}
					role="combobox"
					aria-controls={listboxId}
					aria-haspopup="listbox"
					aria-expanded={state.isListOptionsOpen}
					aria-labelledby={labelledBy}
					aria-describedby={`${ariaDescribedby} ${errorId}`}
					tabIndex={0}
					onClick={() => {
						dispatch(new SelectSimpleAction.ToggleList());
					}}
					aria-activedescendant={state.activeDescendant}
					onKeyDown={onKeyDown}
					onBlur={onBlur}
					{...rest}
				>
					<PlaceholderSelectedValue/>
					{state.isListOptionsOpen ? <Icon name={'angle-up'}/> : <Icon name={'angle-down'}/>}
				</div>
				<ul
					role="listbox"
					ref={listboxRef}
					aria-labelledby={labelledBy}
					id={listboxId}
					hidden={!state.isListOptionsOpen}>
					{optionList.map((option, index) => {
						const optionId = `${optionsId}-${index}`;
						return <li
							className={classNames(styles.optionComboboxSimple, state.activeDescendant === optionId ? styles.optionVisuallyFocus : '')}
							id={optionId}
							role="option"
							key={index}
							onMouseDown={onMouseDown}
							data-value={option.valeur}
							onClick={() => {
								selectOption(optionId);
							}}
							aria-selected={isCurrentItemSelected(option.valeur)}>
							{option.libellé}
						</li>;
					})}
				</ul>
				<Input
					className={styles.inputHiddenValue}
					tabIndex={-1}
					required={required}
					aria-hidden={'true'}
					name={name}
					value={optionSelectedValue}
				/>
			</div>
			<Error id={errorId}>{errorMessage}</Error>
		</div>
	);
}

function SelectMultiple(props: SelectMultipleProps & { labelledBy: string }) {
	const {
		optionList,
		value,
		placeholder,
		name,
		onChange: onChangeProps = doNothing,
		labelledBy,
		defaultValue,
		'aria-describedby': ariaDescribedby = '',
		required,
		...rest
	} = props;
	const listboxRef = useRef<HTMLUListElement>(null);
	const optionsId = useId();
	const listboxId = useId();
	const errorId = useId();
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [state, dispatch] = useReducer(
		SelectMultipleReducer, {
			activeDescendant: undefined,
			isListOptionsOpen: false,
			optionsSelectedValues: defaultValue ? defaultValue : [],
			refListOption: listboxRef,
			valueTypedByUser: '',
			visibleOptions: [],
		},
	);
	const optionsSelectedValues = value ?? state.optionsSelectedValues;

	const selectOption = useCallback((optionId: string) => {
		setErrorMessage('');

		dispatch(new SelectMultipleAction.SelectOption(optionId));
		const option = document.getElementById(optionId);
		if (option) onChangeProps(option);
	}, [onChangeProps]);

	const closeList = useCallback(() => {
		dispatch(new SelectMultipleAction.CloseList());

		if (required && optionsSelectedValues.length === 0) {
			setErrorMessage(ERROR_LABEL_REQUIRED_MULTIPLE);
		}
	}, [optionsSelectedValues.length, required]);

	useLayoutEffect(function scrollOptionIntoView() {
		if (state.activeDescendant) {
			document.getElementById(state.activeDescendant)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}
	}, [state.activeDescendant]);

	// NOTE (BRUJ 17-05-2023): Sinon on perd le focus avant la fin du clique ==> élément invalid pour la sélection.
	const onMouseDown = useCallback(function preventBlurOnOptionSelection(event: React.MouseEvent<HTMLLIElement>) {
		event.preventDefault();
	}, []);

	const onBlur = useCallback(function onBlur(event: FocusEvent<HTMLDivElement>) {
		const newFocusStillInCombobox = event.currentTarget.contains(event.relatedTarget);
		if (newFocusStillInCombobox) {
			cancelEvent(event);
			return;
		}

		closeList();
	}, [closeList]);

	const isCurrentItemSelected = useCallback((optionValue: string) => {
		return optionsSelectedValues.includes(optionValue);
	}, [optionsSelectedValues]);

	const resetValueTypedByUser = useCallback(() => {
		dispatch(new SelectMultipleAction.SetValueTypedByUser(''));
	}, []);

	const handlefocusOnTypeLetterDebounce = useMemo(() => {
		return debounce(resetValueTypedByUser, DEFAULT_DEBOUNCE_TIMEOUT);
	}, [resetValueTypedByUser]);

	const handleUserTypeNewLetter = useCallback((key: string) => {
		function optionMatchUserInput(optionElement: Element) {
			return optionElement.textContent?.toLowerCase().startsWith(allUserInput.toLowerCase());
		}

		const allUserInput = state.valueTypedByUser.concat(key);
		dispatch(new SelectMultipleAction.SetValueTypedByUser(allUserInput));

		const optionsElement = getOptionsElement(state.refListOption);
		const firstOptionMatchingUserInput = optionsElement.find(optionMatchUserInput);
		if (firstOptionMatchingUserInput) {
			dispatch(new SelectMultipleAction.VisualyFocusOption(firstOptionMatchingUserInput));
		}
		handlefocusOnTypeLetterDebounce();
	}, [handlefocusOnTypeLetterDebounce, state.refListOption, state.valueTypedByUser]);

	const onKeyDown = useCallback(function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
		const { key, altKey, ctrlKey, metaKey } = event;

		const isUserTypeLetter = event.key.length === 1 && event.key !== KeyBoard.SPACE && !altKey && !ctrlKey && !metaKey;
		if (isUserTypeLetter) {
			event.preventDefault();
			if (!state.isListOptionsOpen) {
				dispatch(new SelectMultipleAction.OpenList());
			}
			handleUserTypeNewLetter(key);
		}

		switch (event.key) {
			case KeyBoard.ARROW_UP:
			case KeyBoard.IE_ARROW_UP:
				if (state.isListOptionsOpen) {
					if (altKey) {
						state.activeDescendant && selectOption(state.activeDescendant);
						dispatch(new SelectMultipleAction.CloseList());
					} else {
						dispatch(new SelectMultipleAction.PreviousOption());
					}
				} else {
					dispatch(new SelectMultipleAction.OpenList());
				}
				event.preventDefault();
				break;
			case KeyBoard.ARROW_DOWN:
			case KeyBoard.IE_ARROW_DOWN:
				if (state.isListOptionsOpen) {
					dispatch(new SelectMultipleAction.NextOption());
				} else {
					dispatch(new SelectMultipleAction.OpenList());
				}
				event.preventDefault();
				break;
			case KeyBoard.PAGE_UP:
				if (state.isListOptionsOpen) {
					event.preventDefault();
					dispatch(new SelectMultipleAction.PreviousOption(10));
				}
				break;
			case KeyBoard.PAGE_DOWN:
				if (state.isListOptionsOpen) {
					event.preventDefault();
					dispatch(new SelectMultipleAction.NextOption(10));
				}
				break;
			case KeyBoard.ESCAPE:
			case KeyBoard.IE_ESCAPE:
				if (state.isListOptionsOpen) event.preventDefault();
				closeList();
				break;
			case KeyBoard.SPACE:
			case KeyBoard.ENTER: {
				if (state.isListOptionsOpen) {
					const selectedOptionID = event.currentTarget.getAttribute('aria-activedescendant');
					if (selectedOptionID) {
						selectOption(selectedOptionID);
						event.preventDefault();
					}
				} else {
					cancelEvent(event);
					dispatch(new SelectMultipleAction.OpenList());
				}
				break;
			}
			case KeyBoard.HOME: {
				if (!state.isListOptionsOpen) {
					dispatch(new SelectMultipleAction.OpenList());
				}
				dispatch(new SelectMultipleAction.VisualyFocusFirstOption());
				event.preventDefault();
				break;
			}
			case KeyBoard.END: {
				if (!state.isListOptionsOpen) {
					dispatch(new SelectMultipleAction.OpenList());
				}
				dispatch(new SelectMultipleAction.VisualyFocusLastOption());
				event.preventDefault();
				break;
			}
			default:
				break;
		}
	}, [closeList, handleUserTypeNewLetter, selectOption, state]);

	function PlaceholderSelectedOptions() {
		const optionsSelectedValueLength = optionsSelectedValues.length;
		if (optionsSelectedValueLength > 1) return `${optionsSelectedValueLength} choix séléctionnés`;
		if (optionsSelectedValueLength === 1) return '1 choix séléctionné';
		if (placeholder) return placeholder;
		return SELECT_PLACEHOLDER_MULTIPLE;
	}

	return (
		<div>
			<div className={styles.container}>
				<div
					role="combobox"
					className={classNames(styles.combobox, errorMessage ? styles.comboboxError : '')}
					aria-controls={listboxId}
					aria-haspopup="listbox"
					aria-expanded={state.isListOptionsOpen}
					aria-describedby={`${ariaDescribedby} ${errorId}`}
					aria-labelledby={labelledBy}
					tabIndex={0}
					onClick={() => {
						dispatch(new SelectMultipleAction.ToggleList());
					}}
					aria-activedescendant={state.activeDescendant}
					onKeyDown={onKeyDown}
					onBlur={onBlur}
					{...rest}
				>
					<PlaceholderSelectedOptions/>
					{state.isListOptionsOpen ? <Icon name={'angle-up'}/> : <Icon name={'angle-down'}/>}
				</div>
				<ul
					role="listbox"
					ref={listboxRef}
					aria-labelledby={labelledBy}
					id={listboxId}
					hidden={!state.isListOptionsOpen}>
					{optionList.map((option, index) => {
						const optionId = `${optionsId}-${index}`;
						return <li
							className={classNames(styles.optionComboboxMultiple, state.activeDescendant === optionId ? styles.optionVisuallyFocus : '')}
							id={optionId}
							role="option"
							key={index}
							onMouseDown={onMouseDown}
							data-value={option.valeur}
							onClick={() => {
								selectOption(optionId);
							}}
							aria-selected={isCurrentItemSelected(option.valeur)}>
							<div className={styles.option}>{option.libellé}</div>
						</li>;
					})}
				</ul>
				{optionsSelectedValues.length === 0 ?
					<Input
						tabIndex={-1}
						className={styles.inputHiddenValue}
						required={required}
						aria-hidden="true"
						name={name}
						value={''}/> :
					optionsSelectedValues.map((optionValue) => {
						return <Input
							tabIndex={-1}
							className={styles.inputHiddenValue}
							required={required}
							key={optionValue}
							aria-hidden="true"
							name={name}
							value={optionValue}
						/>;
					})
				}
			</div>
			<Error id={errorId}>{errorMessage}</Error>
		</div>
	);
}


function cancelEvent(event: SyntheticEvent) {
	event.preventDefault();
	event.stopPropagation();
}

function doNothing() {
	return;
}
