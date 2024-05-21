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
import { Champ } from '~/client/components/ui/Form/Champ/Champ';
import { Input } from '~/client/components/ui/Form/Input';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Radio } from '~/client/components/ui/Radio/Radio';
import styles from '~/client/components/ui/Select/Select.module.scss';
import { SelectAction, SelectReducer } from '~/client/components/ui/Select/SelectReducer';

type SelectProps = Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> & {
	placeholder?: string;
	optionList: Option[];
	value?: string;
	className?: string
	label: string;
	name?: string;
	required?: boolean;
	id?: string
	onChange?: (value: HTMLElement) => void;
	labelComplement?: string
	defaultValue?: string;
	multiple?: boolean
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
		multiple,
		...rest
	} = props;
	const selectIdState = useId();
	const selectId = id ?? selectIdState;
	const labelledBy = useId();

	return (
		<div className={classNames(styles.selectWrapper, className)}>
			<Champ.Label htmlFor={selectId} className={styles.selectLabel} id={labelledBy}>
				{label}
				{labelComplement && <Champ.Label.Complement>{labelComplement}</Champ.Label.Complement>}
			</Champ.Label>
			{
				multiple ? <></> : <SelectSimple labelledBy={labelledBy} {...rest}/>
			}
		</div>
	);
}

type SelectSimpleProps = Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> & {
	placeholder?: string;
	optionList: Option[];
	value?: string;
	className?: string
	name?: string;
	required?: boolean;
	onChange?: (value: HTMLElement) => void;
	defaultValue?: string;
	labelledBy: string
}

function SelectSimple(props: SelectSimpleProps) {
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
		dispatch(new SelectAction.SelectOption(optionId));
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

		dispatch(new SelectAction.CloseList());
	}, []);

	const isCurrentItemSelected = useCallback((option: Option, optionId?: string) => {
		return state.activeDescendant === optionId;
	}, [state.activeDescendant]);

	const onKeyDown = useCallback(function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
		switch (event.key) {
			case KeyBoard.ARROW_UP:
			case KeyBoard.IE_ARROW_UP:
				dispatch(new SelectAction.PreviousOption());
				event.preventDefault();
				break;
			case KeyBoard.ARROW_DOWN:
			case KeyBoard.IE_ARROW_DOWN:
				if (event.altKey) {
					// TODO (BRUJ 21/05/2024): rajouter qqch là
				} else {
					dispatch(new SelectAction.NextOption());
				}
				event.preventDefault();
				break;
			case KeyBoard.ESCAPE:
			case KeyBoard.IE_ESCAPE:
				dispatch(new SelectAction.CloseList());
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
					dispatch(new SelectAction.OpenList());
				}
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
					aria-selected={isCurrentItemSelected(option, optionId)}>
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
					dispatch(new SelectAction.ToggleList());
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

function cancelEvent(event: SyntheticEvent) {
	event.preventDefault();
	event.stopPropagation();
}

function doNothing() {
	return;
}
