import classNames from 'classnames';
import React, {
	ChangeEvent,
	FocusEvent,
	KeyboardEvent,
	SyntheticEvent,
	useCallback,
	useId,
	useMemo,
	useReducer,
	useRef,
	useState,
} from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
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
	multiple?: boolean;
	required?: boolean;
	id?: string
	onChange?: (value: HTMLElement) => void;
	labelComplement?: string
	defaultValue?: string
}

export interface Option {
	libellé: string;
	valeur: string;
}

const SELECT_PLACEHOLDER_SINGULAR = 'Sélectionnez votre choix';
const SELECT_PLACEHOLDER_PLURAL = 'Sélectionnez vos choix';
const SELECT_ERROR_MESSAGE_REQUIRED = 'Veuillez sélectionner un choix';

export function Select(props: SelectProps) {
	const {
		className,
		id,
		optionList,
		value,
		placeholder,
		name,
		label,
		multiple,
		required,
		onChange: onChangeProps = doNothing,
		labelComplement,
		defaultValue,
	} = props;
	const optionsRef = useRef<HTMLDivElement>(null);
	const listboxRef = useRef<HTMLUListElement>(null);
	const labelledBy = useId();
	const selectIdState = useId();
	const optionsId = useId();
	const selectId = id ?? selectIdState;
	const [state, dispatch] = useReducer(
		SelectReducer, {
			activeDescendant: undefined,
			isListOptionsOpen: false,
			optionSelectedLabel: defaultValue ? getLabelByValue(defaultValue) : '',
			suggestionList: listboxRef,
			visibleOptions: [],
		},
	);
	const [selectedValue, setSelectedValue] = useState(value || '');

	function getLabelByValue(value: string) {
		const optionValue = optionList.find((option) => option.valeur === value);
		if (optionValue) {
			return optionValue.libellé;
		}
		return '';
	}

	function selectOption(optionId: string) {
		dispatch(new SelectAction.SelectOption(optionId));
		const option = document.getElementById(optionId);
		if (option) onChangeProps(option);
	}

	const defaultPlaceholder = useMemo(() => multiple ? SELECT_PLACEHOLDER_PLURAL : SELECT_PLACEHOLDER_SINGULAR,
		[multiple]);

	const valueSelected = useMemo(() => {
		const optionValue = optionList.find((option) => option.libellé === .optionSelectedLabel);
		if (optionValue) {
			return optionValue.valeur;
		}
		return '';
	}, [state.optionSelectedLabel]);

	const multipleSelectLabel = useMemo(() => {
		const selectedValueLength = String(selectedValue).split(',').length;
		return `${selectedValueLength} choix ${selectedValueLength > 1 ? 'sélectionnés' : 'sélectionné'}`;
	}, [selectedValue]);

	const optionSelectedLabel = () => {
		if (state.optionSelectedLabel) return multiple ? multipleSelectLabel : state.optionSelectedLabel;
		if (placeholder) return placeholder;
		return defaultPlaceholder;
	};

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
	}, [value]);

	const isCurrentItemSelected = useCallback((option: Option, optionId?: string) => {
		return multiple ? state.optionSelectedLabel?.split(',').includes(option.libellé) : state.activeDescendant === optionId;
	}, [state.activeDescendant, multiple]);

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
	}, [state]);

	const onSelectMultipleChange = useCallback((isValueSelected: boolean, changedValue: string) => {
		const valueList = selectedValue ? selectedValue.split(',') : [];
		if (isValueSelected) {
			valueList.push(changedValue);
		} else {
			const indexOfValue = valueList.indexOf(changedValue);
			valueList.splice(indexOfValue, 1);
		}

		const newSelectedValue = valueList.join(',');
		setSelectedValue(newSelectedValue);
		// TODO (BRUJ 17/05/2024): voir comment changer la version multiple
		//onChangeProps?.(newSelectedValue);
	}, [selectedValue, setSelectedValue, onChangeProps]);

	const renderOptionList = () => (
		<ul
			role="listbox"
			ref={listboxRef}
			aria-labelledby={labelledBy}
			tabIndex={-1}
			hidden={!state.isListOptionsOpen}
			aria-multiselectable={multiple}>
			{optionList.map((option, index) => {
				const optionId = `${optionsId}-${index}`;
				return <li
					tabIndex={-1}
					id={optionId}
					role="option"
					key={index}
					onMouseDown={onMouseDown}
					onClick={() => {
						selectOption(optionId);
					}}
					aria-selected={isCurrentItemSelected(option, optionId)}>
					{multiple ? renderCheckBox(option) : renderRadioButton(option)}
				</li>;
			})}
		</ul>
	);

	const renderCheckBox = (option: Option) => (
		<Checkbox
			className={styles.option}
			label={option.libellé}
			value={option.valeur}
			checked={isCurrentItemSelected(option)}
			onChange={(event: ChangeEvent<HTMLInputElement>) => {
				onSelectMultipleChange(event.target.checked, option.valeur);
			}}
		/>
	);

	function renderRadioButton(option: Option) {
		return <Radio
			className={styles.option}
			label={option.libellé}
			value={option.valeur}
			onChange={doNothing}
			checked={option.libellé === state.optionSelectedLabel}
			hidden={true}/>;
	}

	return (
		<div className={classNames(styles.selectWrapper, className)}>
			<Champ.Label htmlFor={selectId} className={styles.selectLabel} id={labelledBy}>
				{label}
				{labelComplement && <Champ.Label.Complement>{labelComplement}</Champ.Label.Complement>}
			</Champ.Label>
			<div className={styles.container}>
				<div
					role="combobox"
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
					{optionSelectedLabel()}
					{state.isListOptionsOpen ? <Icon name={'angle-up'}/> : <Icon name={'angle-down'}/>}
				</div>
				{renderOptionList()}
				<Input
					type="hidden"
					name={name}
					value={valueSelected}
				/>
			</div>
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
