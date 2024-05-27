import classNames from 'classnames';
import React, {
	FocusEvent,
	KeyboardEvent,
	SyntheticEvent,
	useCallback,
	useId,
	useReducer,
	useRef,
	useState,
} from 'react';

import { KeyBoard } from '../../../keyboard/keyboard.enum';
import { Icon } from '../../Icon/Icon';
import { Champ } from '../Champ/Champ';
import { Input } from '../Input';
import styles from './Select.module.scss';
import {
	SelectMultipleAction,
	SelectMultipleReducer,
	SelectReducer,
	SelectSimpleAction,
} from './SelectReducer';

type SelectProps = SelectSimpleProps & {
	multiple?: false;
	placeholder?: string;
	label: string;
	id?: string
	labelComplement?: string
} | SelectMultipleProps & {
	multiple: true;
	placeholder?: string;
	label: string;
	id?: string
	labelComplement?: string
}

type SelectMultipleProps = Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> & {
	optionList: Option[];
	value?: Array<string>;
	className?: string
	name?: string;
	required?: boolean;
	onChange?: (value: HTMLElement) => void;
	defaultValue?: Array<string>;
}

type SelectSimpleProps = Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> & {
	optionList: Option[];
	value?: string;
	className?: string
	name?: string;
	required?: boolean;
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

export function Select(props: SelectProps) {
	const {
		className,
		id,
		label,
		labelComplement,
		...rest
	} = props;
	const selectIdState = useId();
	const selectId = id ?? selectIdState;
	const labelledBy = useId();

	function isSelectMultipleProps(rest: SelectSimpleProps | SelectMultipleProps): rest is SelectMultipleProps {
		return rest.multiple === true;
	}

	function isSelectSimpleProps(rest: SelectSimpleProps | SelectMultipleProps): rest is SelectSimpleProps {
		return !rest.multiple;
	}

	return (
		<div className={classNames(styles.selectWrapper, className)}>
			<Champ.Label htmlFor={selectId} className={styles.selectLabel} id={labelledBy}>
				{label}
				{labelComplement && <Champ.Label.Complement>{labelComplement}</Champ.Label.Complement>}
			</Champ.Label>
			{isSelectMultipleProps(rest) && <SelectMultiple labelledBy={labelledBy} {...rest}/>}
			{isSelectSimpleProps(rest) && <SelectSimple labelledBy={labelledBy} {...rest}/>}
		</div>
	);
}

// TODO (BRUJ 25/05/2024): gestion d'erreur !!
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
		if (required) {
			setErrorMessage(ERROR_LABEL_REQUIRED_SIMPLE);
		}
	}, [required]);

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

	const onKeyDown = useCallback(function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
		switch (event.key) {
			case KeyBoard.ARROW_UP:
			case KeyBoard.IE_ARROW_UP:
				if (state.isListOptionsOpen) {
					dispatch(new SelectSimpleAction.PreviousOption());
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
				closeList();
				event.preventDefault();
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
					dispatch(new SelectSimpleAction.OpenList());
				}
				break;
			}
			case KeyBoard.TAB: {
				if (state.isListOptionsOpen) {
					const selectedOptionID = event.currentTarget.getAttribute('aria-activedescendant');
					if (selectedOptionID) {
						selectOption(selectedOptionID);
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
	}, [closeList, selectOption, state.isListOptionsOpen]);

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
		<div className={styles.container}>
			<div
				className={styles.combobox}
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
				tabIndex={-1}
				hidden={!state.isListOptionsOpen}>
				{optionList.map((option, index) => {
					const optionId = `${optionsId}-${index}`;
					return <li
						className={classNames(styles.optionComboboxSimple, state.activeDescendant === optionId ? styles.optionVisuallyFocus : '')}
						tabIndex={-1}
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
			<span id={errorId}>{errorMessage}</span>
			<Input
				type="hidden"
				name={name}
				value={optionSelectedValue}
			/>
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

		if (required) {
			setErrorMessage(ERROR_LABEL_REQUIRED_MULTIPLE);
		}
	}, [required]);

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
		return state.optionsSelectedValues.includes(optionValue);
	}, [state.optionsSelectedValues]);

	const onKeyDown = useCallback(function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
		switch (event.key) {
			case KeyBoard.ARROW_UP:
			case KeyBoard.IE_ARROW_UP:
				if (state.isListOptionsOpen) {
					dispatch(new SelectMultipleAction.PreviousOption());
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
			case KeyBoard.ESCAPE:
			case KeyBoard.IE_ESCAPE:
				closeList();
				event.preventDefault();
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
			case KeyBoard.TAB: {
				if (state.isListOptionsOpen) {
					const selectedOptionID = event.currentTarget.getAttribute('aria-activedescendant');
					if (selectedOptionID) {
						selectOption(selectedOptionID);
					}
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
	}, [closeList, selectOption, state.isListOptionsOpen]);

	function PlaceholderSelectedOptions() {
		const optionsSelectedValueLength = optionsSelectedValues.length;
		if (optionsSelectedValueLength > 1) return `${optionsSelectedValueLength} choix séléctionnés`;
		if (optionsSelectedValueLength === 1) return '1 choix séléctionné';
		if (placeholder) return placeholder;
		return SELECT_PLACEHOLDER_MULTIPLE;
	}

	return (
		<div className={styles.container}>
			<div
				role="combobox"
				className={styles.combobox}
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
				tabIndex={-1}
				hidden={!state.isListOptionsOpen}>
				{optionList.map((option, index) => {
					const optionId = `${optionsId}-${index}`;
					return <li
						className={classNames(styles.optionComboboxMultiple, state.activeDescendant === optionId ? styles.optionVisuallyFocus : '')}
						tabIndex={-1}
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
			<span id={errorId}>{errorMessage}</span>
			{
				optionsSelectedValues?.map((optionValue) => {
					return <Input
						key={optionValue}
						type="hidden"
						name={name}
						value={optionValue}
					/>;
				})
			}
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
