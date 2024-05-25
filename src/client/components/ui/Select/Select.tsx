import classNames from 'classnames';
import React, {
	FocusEvent,
	KeyboardEvent,
	SyntheticEvent,
	useCallback,
	useId,
	useMemo,
	useReducer,
	useRef,
} from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import { Champ } from '~/client/components/ui/Form/Champ/Champ';
import { Input } from '~/client/components/ui/Form/Input';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Radio } from '~/client/components/ui/Radio/Radio';
import styles from '~/client/components/ui/Select/Select.module.scss';
import {
	SelectMultipleAction,
	SelectMultipleReducer,
	SelectReducer,
	SelectSimpleAction,
} from '~/client/components/ui/Select/SelectReducer';

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

	// TODO (BRUJ 23/05/2024): ne plus utiliser ces fonctions et passer directement par champ
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

function SelectSimple(props: SelectSimpleProps & { labelledBy: string }) {
	const {
		optionList,
		value,
		placeholder,
		name,
		onChange: onChangeProps = doNothing,
		labelledBy,
		defaultValue,
	} = props;
	const listboxRef = useRef<HTMLUListElement>(null);
	const optionsId = useId();
	const listboxId = useId();
	const [state, dispatch] = useReducer(
		SelectReducer, {
			activeDescendant: undefined,
			isListOptionsOpen: false,
			optionSelectedValue: defaultValue ? defaultValue : '',
			suggestionList: listboxRef,
			visibleOptions: [],
		},
	);
	const optionSelectedValue = value ?? state.optionSelectedValue;

	function getLabelByValue(value: string) {
		const optionValue = optionList.find((option) => option.valeur === value);
		if (optionValue) {
			return optionValue.libellé;
		}
		return '';
	}

	const selectOption = useCallback((optionId: string) => {
		dispatch(new SelectSimpleAction.SelectOption(optionId));
		const option = document.getElementById(optionId);
		if (option) onChangeProps(option);
	}, [onChangeProps]);

	const valueSelected = useMemo(() => {
		if (value) return value;
		const optionValue = optionList.find((option) => option.valeur === optionSelectedValue);
		if (optionValue) {
			return optionValue.valeur;
		}
		return '';
	}, [optionList, optionSelectedValue, value]);

	function PlaceholderSelectedValue() {
		if (optionSelectedValue) return getLabelByValue(optionSelectedValue);
		if (placeholder) return placeholder;
		return SELECT_PLACEHOLDER_SINGULAR;
	}

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

		dispatch(new SelectSimpleAction.CloseList());
	}, []);

	const isCurrentItemSelected = useCallback((optionId?: string) => {
		return state.activeDescendant === optionId;
	}, [state.activeDescendant]);

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
				dispatch(new SelectSimpleAction.CloseList());
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
	}, [selectOption, state.isListOptionsOpen]);

	const renderOptionList = () => (
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
					tabIndex={-1}
					id={optionId}
					role="option"
					key={index}
					onMouseDown={onMouseDown}
					data-value={option.valeur}
					onClick={() => {
						selectOption(optionId);
					}}
					aria-selected={isCurrentItemSelected(optionId)}>
					{renderRadioButton(option)}
				</li>;
			})}
		</ul>
	);

	function renderRadioButton(option: Option) {
		return <Radio
			className={styles.option}
			label={option.libellé}
			value={option.valeur}
			onChange={doNothing}
			checked={option.valeur === optionSelectedValue}
			hidden={true}/>;
	}

	return (
		<div className={styles.container}>
			<div
				role="combobox"
				aria-controls={listboxId}
				aria-haspopup="listbox"
				aria-expanded={state.isListOptionsOpen}
				aria-labelledby={labelledBy}
				tabIndex={0}
				onClick={() => {
					dispatch(new SelectSimpleAction.ToggleList());
				}}
				aria-activedescendant={state.activeDescendant}
				onKeyDown={onKeyDown}
				onBlur={onBlur}
			>
				<PlaceholderSelectedValue/>
				{state.isListOptionsOpen ? <Icon name={'angle-up'}/> : <Icon name={'angle-down'}/>}
			</div>
			{renderOptionList()}
			<Input
				type="hidden"
				name={name}
				value={valueSelected}
			/>
		</div>
	);
}

const SELECT_PLACEHOLDER_MULTIPLE = 'Sélectionnez vos choix';

function SelectMultiple(props: SelectMultipleProps & { labelledBy: string }) {
	const {
		optionList,
		value,
		placeholder,
		name,
		onChange: onChangeProps = doNothing,
		labelledBy,
		defaultValue,
	} = props;
	const listboxRef = useRef<HTMLUListElement>(null);
	const optionsId = useId();
	const listboxId = useId();
	const [state, dispatch] = useReducer(
		SelectMultipleReducer, {
			activeDescendant: undefined,
			isListOptionsOpen: false,
			optionSelectedValue: defaultValue ? defaultValue : [],
			suggestionList: listboxRef,
			visibleOptions: [],
		},
	);
	const optionSelectedValue = value ?? state.optionSelectedValue;

	const selectOption = useCallback((optionId: string) => {
		dispatch(new SelectMultipleAction.SelectOption(optionId));
		const option = document.getElementById(optionId);
		if (option) onChangeProps(option);
	}, [onChangeProps]);

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

		dispatch(new SelectMultipleAction.CloseList());
	}, []);

	const isCurrentItemSelected = useCallback((optionValue: string) => {
		return state.optionSelectedValue.includes(optionValue);
	}, [state.optionSelectedValue]);

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
				dispatch(new SelectMultipleAction.CloseList());
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
	}, [selectOption, state.isListOptionsOpen]);

	function PlaceholderSelectedOptions() {
		const optionsSelectedValueLength = optionSelectedValue.length;
		if (optionsSelectedValueLength > 1) return `${optionsSelectedValueLength} choix séléctionnés`;
		if (optionsSelectedValueLength === 1) return '1 choix séléctionné';
		if (placeholder) return placeholder;
		return SELECT_PLACEHOLDER_MULTIPLE;
	}

	return (
		<div className={styles.container}>
			<div
				role="combobox"
				aria-controls={listboxId}
				aria-haspopup="listbox"
				aria-expanded={state.isListOptionsOpen}
				aria-labelledby={labelledBy}
				tabIndex={0}
				onClick={() => {
					dispatch(new SelectMultipleAction.ToggleList());
				}}
				aria-activedescendant={state.activeDescendant}
				onKeyDown={onKeyDown}
				onBlur={onBlur}
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
			{
				optionSelectedValue?.map((optionValue) => {
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
