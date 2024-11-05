import debounce from 'lodash.debounce';
import React, {
	FocusEvent,
	FormEventHandler,
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
import {
	SelectMultipleAction,
	SelectMultipleReducer,
} from '~/client/components/ui/Form/Select/SelectMultiple/SelectMultipleReducer';
import { SelectOption } from '~/client/components/ui/Form/Select/SelectOption/SelectOption';
import { Icon } from '~/client/components/ui/Icon/Icon';

import styles from '../Select.module.scss';
import { SelectContext } from '../SelectContext';

const SELECT_PLACEHOLDER_MULTIPLE = 'Sélectionnez vos choix';
const ERROR_LABEL_REQUIRED_MULTIPLE = 'Séléctionnez au moins un élément de la liste';
const DEFAULT_DEBOUNCE_TIMEOUT = 300;

export type SelectMultipleProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'onChange' | 'onInvalid'> & {
	value?: Array<string>;
	onChange?: (value: HTMLElement) => void;
	defaultValue?: Array<string>;
	onTouch?: (touched: boolean) => void,
	placeholder?: string,
	required?: boolean,
	onInvalid?: FormEventHandler<HTMLInputElement>,
	optionsAriaLabel: string;
}

export function SelectMultiple(props: SelectMultipleProps) {
	const {
		optionsAriaLabel,
		children,
		value,
		placeholder,
		name,
		onChange: onChangeProps = doNothing,
		onInvalid: onInvalidProps = doNothing,
		onTouch: onTouchProps = doNothing,
		defaultValue,
		required,
		...rest
	} = props;
	const listboxRef = useRef<HTMLUListElement>(null);
	const firstInputHiddenRef = useRef<HTMLInputElement>(null);

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
		onTouchProps(true);
		setTouched(true);

		dispatch(new SelectMultipleAction.SelectOption(optionId));
		const option = document.getElementById(optionId);
		if (option) onChangeProps(option);
	}, [onChangeProps, onTouchProps]);

	const closeList = useCallback(() => {
		dispatch(new SelectMultipleAction.CloseList());
		setTouched(true);
		onTouchProps(true);

		if (required && optionsSelectedValues.length === 0) {
			firstInputHiddenRef.current?.setCustomValidity(ERROR_LABEL_REQUIRED_MULTIPLE);
		}
		firstInputHiddenRef.current?.checkValidity();
	}, [onTouchProps, optionsSelectedValues.length, required]);

	useLayoutEffect(function scrollOptionIntoView() {
		if (state.activeDescendant) {
			document.getElementById(state.activeDescendant)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}
	}, [state.activeDescendant]);

	const onBlur = useCallback(function onBlur(event: FocusEvent<HTMLButtonElement>) {
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

	const onKeyDown = useCallback(function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
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
						if (state.activeDescendant) { selectOption(state.activeDescendant); };
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
		if (optionsSelectedValueLength > 1) return `${optionsSelectedValueLength} choix sélectionnés`;
		if (optionsSelectedValueLength === 1) return '1 choix sélectionné';
		if (placeholder) return placeholder;
		return SELECT_PLACEHOLDER_MULTIPLE;
	}

	return (
		<SelectContext.Provider value={{
			activeDescendant: state.activeDescendant,
			isCurrentItemSelected,
			onOptionSelection: selectOption,
		}}>
			<div className={styles.container}>
				<Input
					ref={firstInputHiddenRef}
					onInvalid={onInvalidProps}
					tabIndex={-1}
					required={required}
					aria-hidden="true"
					name={name}
					value={optionsSelectedValues[0] || ''} />
				{optionsSelectedValues.slice(1).map((optionValue) => (
					<Input
						type="hidden"
						key={optionValue}
						name={name}
						value={optionValue} />
				))}
				<button
					type="button"
					role="combobox"
					aria-controls={listboxId}
					aria-haspopup="listbox"
					aria-expanded={state.isListOptionsOpen}
					data-touched={touched}
					onClick={() => dispatch(new SelectMultipleAction.ToggleList())}
					aria-activedescendant={state.activeDescendant}
					onKeyDown={onKeyDown}
					onBlur={onBlur}
					aria-required={required}
					{...rest}>
					<PlaceholderSelectedOptions />
					<Icon name={'angle-down'} />
				</button>
				<ul
					aria-multiselectable="true"
					role="listbox"
					ref={listboxRef}
					aria-label={optionsAriaLabel}
					id={listboxId}
					tabIndex={-1}
					hidden={!state.isListOptionsOpen}>
					{children}
				</ul>
			</div>
		</SelectContext.Provider>
	);
}

function cancelEvent(event: SyntheticEvent) {
	event.preventDefault();
	event.stopPropagation();
}

function doNothing() {
	return;
}

SelectMultiple.Option = SelectOption;
