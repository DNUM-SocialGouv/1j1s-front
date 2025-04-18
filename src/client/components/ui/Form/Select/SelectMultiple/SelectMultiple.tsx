import debounce from 'lodash.debounce';
import React, {
	FocusEvent,
	FormEventHandler,
	KeyboardEvent,
	SyntheticEvent,
	useCallback,
	useEffect,
	useId,
	useLayoutEffect,
	useMemo,
	useReducer,
	useRef,
} from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { Input } from '~/client/components/ui/Form/Input';
import { isSearchableCharacter } from '~/client/components/ui/Form/Select/Select.utils';
import {
	SelectMultipleAction,
	SelectMultipleReducer,
} from '~/client/components/ui/Form/Select/SelectMultiple/SelectMultipleReducer';
import { SelectOption } from '~/client/components/ui/Form/Select/SelectOption/SelectOption';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { useTouchedInput } from '~/client/hooks/useTouchedInput';

import styles from '../Select.module.scss';
import { SelectContext } from '../SelectContext';

const SELECT_PLACEHOLDER_MULTIPLE = 'Sélectionnez vos choix';
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

export function SelectMultiple({
	optionsAriaLabel,
	children,
	value: valueProps,
	placeholder,
	name,
	onChange: onChangeProps = doNothing,
	onInvalid: onInvalidProps = doNothing,
	onTouch: onTouchProps = doNothing,
	onFocus: onFocusProps = doNothing,
	defaultValue,
	required,
	...rest
}: SelectMultipleProps) {
	const listboxRef = useRef<HTMLUListElement>(null);
	const firstInputHiddenRef = useRef<HTMLInputElement>(null);

	const listboxId = useId();

	const { saveValueOnFocus, setTouchedOnBlur, touched } = useTouchedInput<Array<string>>();

	const [{
		optionsSelectedValues,
		activeDescendant,
		isListOptionsOpen,
	}, dispatch] = useReducer(
		SelectMultipleReducer, {
			activeDescendant: undefined,
			isListOptionsOpen: false,
			optionsSelectedValues: defaultValue ? defaultValue : [],
			refListOption: listboxRef,
			valueTypedByUser: '',
			visibleOptions: [],
		},
	);
	const value = valueProps ?? optionsSelectedValues;

	const selectOption = useCallback((optionId: string) => {
		firstInputHiddenRef.current?.setCustomValidity('');

		dispatch(new SelectMultipleAction.SelectOption(optionId));
		const option = document.getElementById(optionId);
		if (option) { onChangeProps(option); }
	}, [onChangeProps]);

	useEffect(() => {
		if (touched) {
			firstInputHiddenRef.current?.checkValidity();
		}
	}, [value, touched]);

	useLayoutEffect(function scrollOptionIntoView() {
		if (activeDescendant) {
			document.getElementById(activeDescendant)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}
	}, [activeDescendant]);

	const onBlur = useCallback(function onBlur(event: FocusEvent<HTMLButtonElement>) {
		const newFocusStillInCombobox = event.currentTarget.contains(event.relatedTarget);
		if (newFocusStillInCombobox) {
			cancelEvent(event);
			return;
		}
		const touched = setTouchedOnBlur(value);
		if (touched) {
			onTouchProps(touched);
		}
		dispatch(new SelectMultipleAction.CloseList());
	}, [onTouchProps, setTouchedOnBlur, value]);
	const onFocus = useCallback(function onFocus(event: FocusEvent<HTMLButtonElement>) {
		saveValueOnFocus(value);
		onFocusProps(event);
	}, [onFocusProps, saveValueOnFocus, value]);

	const isCurrentItemSelected = useCallback((optionValue: string) => {
		return value.includes(optionValue);
	}, [value]);

	const resetValueTypedByUser = useCallback(() => {
		dispatch(new SelectMultipleAction.SetValueTypedByUser(''));
	}, []);

	const handleFocusOnTypeLetterDebounce = useMemo(() => {
		return debounce(resetValueTypedByUser, DEFAULT_DEBOUNCE_TIMEOUT);
	}, [resetValueTypedByUser]);

	const onKeyDown = useCallback(function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
		const { key, altKey } = event;

		if (isSearchableCharacter(event.nativeEvent)) {
			event.preventDefault();
			dispatch(new SelectMultipleAction.FocusOptionMatchingUserInput(key));
			handleFocusOnTypeLetterDebounce();
		}

		switch (event.key) {
			case KeyBoard.ARROW_UP:
			case KeyBoard.IE_ARROW_UP:
				if (isListOptionsOpen) {
					if (altKey) {
						if (activeDescendant) { selectOption(activeDescendant); }
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
				if (isListOptionsOpen) {
					dispatch(new SelectMultipleAction.NextOption());
				} else {
					dispatch(new SelectMultipleAction.OpenList());
				}
				event.preventDefault();
				break;
			case KeyBoard.PAGE_UP:
				if (isListOptionsOpen) {
					event.preventDefault();
					dispatch(new SelectMultipleAction.PreviousOption(10));
				}
				break;
			case KeyBoard.PAGE_DOWN:
				if (isListOptionsOpen) {
					event.preventDefault();
					dispatch(new SelectMultipleAction.NextOption(10));
				}
				break;
			case KeyBoard.ESCAPE:
			case KeyBoard.IE_ESCAPE:
				if (isListOptionsOpen) { event.preventDefault(); }
				dispatch(new SelectMultipleAction.CloseList());
				break;
			case KeyBoard.SPACE:
			case KeyBoard.ENTER: {
				if (isListOptionsOpen) {
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
				dispatch(new SelectMultipleAction.FocusFirstOption());
				event.preventDefault();
				break;
			}
			case KeyBoard.END: {
				dispatch(new SelectMultipleAction.FocusLastOption());
				event.preventDefault();
				break;
			}
			default:
				break;
		}
	}, [activeDescendant, handleFocusOnTypeLetterDebounce, isListOptionsOpen, selectOption]);

	function PlaceholderSelectedOptions() {
		const optionsSelectedValueLength = value.length;
		if (optionsSelectedValueLength > 1) { return `${optionsSelectedValueLength} choix sélectionnés`; }
		if (optionsSelectedValueLength === 1) { return '1 choix sélectionné'; }
		if (placeholder) { return placeholder; }
		return SELECT_PLACEHOLDER_MULTIPLE;
	}

	return (
		<SelectContext.Provider value={{
			activeDescendant: activeDescendant,
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
					value={value[0] || ''} />
				{value.slice(1).map((optionValue) => (
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
					aria-expanded={isListOptionsOpen}
					data-touched={touched}
					onClick={() => dispatch(new SelectMultipleAction.ToggleList())}
					onFocus={onFocus}
					aria-activedescendant={activeDescendant}
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
					hidden={!isListOptionsOpen}>
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
