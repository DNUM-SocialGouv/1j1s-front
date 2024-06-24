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

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { Input } from '~/client/components/ui/Form/Input';
import { Icon } from '~/client/components/ui/Icon/Icon';

import styles from './Select.module.scss';
import { SelectMultipleAction, SelectMultipleReducer } from './SelectReducer';

const SELECT_PLACEHOLDER_MULTIPLE = 'Sélectionnez vos choix';
const ERROR_LABEL_REQUIRED_MULTIPLE = 'Séléctionnez au moins un élément de la liste';
const DEFAULT_DEBOUNCE_TIMEOUT = 300;


export interface OptionSelectMultiple {
	libellé: string;
	valeur: string;
}

export type SelectMultipleProps = Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> & {
	optionList: OptionSelectMultiple[];
	value?: Array<string>;
	onChange?: (value: HTMLElement) => void;
	defaultValue?: Array<string>;
	onTouch?: (touched: boolean) => void,
}

export function SelectMultiple(props: SelectMultipleProps & { labelledBy: string }) {
	const {
		optionList,
		value,
		placeholder,
		name,
		onChange: onChangeProps = doNothing,
		onInvalid: onInvalidProps = doNothing,
		onTouch: onTouchProps = doNothing,
		labelledBy,
		defaultValue,
		required,
		...rest
	} = props;
	const listboxRef = useRef<HTMLUListElement>(null);
	const firstInputHiddenRef = useRef<HTMLInputElement>(null);

	const optionsId = useId();
	const listboxId = useId();

	const [touched, setTouched] = useState<boolean>(false);
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
		firstInputHiddenRef.current?.setCustomValidity('');
		setTouched(true);

		dispatch(new SelectMultipleAction.SelectOption(optionId));
		const option = document.getElementById(optionId);
		if (option) onChangeProps(option);
	}, [onChangeProps]);

	const closeList = useCallback(() => {
		dispatch(new SelectMultipleAction.CloseList());
		setTouched(true);

		if (required && optionsSelectedValues.length === 0) {
			firstInputHiddenRef.current?.setCustomValidity(ERROR_LABEL_REQUIRED_MULTIPLE);
		}
		firstInputHiddenRef.current?.checkValidity();
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

	const onKeyDown = useCallback(function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
		const { key, altKey, ctrlKey, metaKey } = event;

		const isUserTypeLetter = event.key.length === 1 && event.key !== KeyBoard.SPACE && !altKey && !ctrlKey && !metaKey;
		if (isUserTypeLetter) {
			event.preventDefault();
			if (!state.isListOptionsOpen) {
				dispatch(new SelectMultipleAction.OpenList());
			}
			dispatch(new SelectMultipleAction.FocusOptionMatchingUserInput(key));
			handlefocusOnTypeLetterDebounce();
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
				dispatch(new SelectMultipleAction.FocusFirstOption());
				event.preventDefault();
				break;
			}
			case KeyBoard.END: {
				if (!state.isListOptionsOpen) {
					dispatch(new SelectMultipleAction.OpenList());
				}
				dispatch(new SelectMultipleAction.FocusLastOption());
				event.preventDefault();
				break;
			}
			default:
				break;
		}
	}, [closeList, handlefocusOnTypeLetterDebounce, selectOption, state]);

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
				<Input
					ref={firstInputHiddenRef}
					onInvalid={onInvalidProps}
					tabIndex={-1}
					className={styles.inputHiddenValue}
					required={required}
					aria-hidden="true"
					name={name}
					value={optionsSelectedValues[0] || ''}/>
				{optionsSelectedValues.slice(1).map((optionValue) => {
					return <Input
						tabIndex={-1}
						className={styles.inputHiddenValue}
						key={optionValue}
						aria-hidden="true"
						name={name}
						value={optionValue}
					/>;
				})}
				<div
					role="combobox"
					className={classNames(styles.combobox)}
					aria-controls={listboxId}
					aria-haspopup="listbox"
					aria-expanded={state.isListOptionsOpen}
					aria-labelledby={labelledBy}
					data-touched={touched}
					tabIndex={0}
					onClick={() => dispatch(new SelectMultipleAction.ToggleList())}
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
							onClick={() => selectOption(optionId)}
							aria-selected={isCurrentItemSelected(option.valeur)}>
							<div className={styles.option}>{option.libellé}</div>
						</li>;
					})}
				</ul>
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
};
