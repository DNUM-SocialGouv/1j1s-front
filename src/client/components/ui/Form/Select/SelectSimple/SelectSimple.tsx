import debounce from 'lodash.debounce';
import React, {
	FocusEvent,
	FormEventHandler,
	KeyboardEvent,
	RefObject,
	SyntheticEvent,
	useCallback,
	useEffect,
	useId,
	useLayoutEffect,
	useMemo,
	useReducer,
	useRef,
	useState,
} from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { Input } from '~/client/components/ui/Form/Input';
import { SelectContext } from '~/client/components/ui/Form/Select/SelectContext';
import { SelectOption } from '~/client/components/ui/Form/Select/SelectOption/SelectOption';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { useTouchedInput } from '~/client/hooks/useTouchedInput';

import styles from '../Select.module.scss';
import { getOptionsElement, SelectSimpleAction, SelectSimpleReducer } from './SelectSimpleReducer';

const DEFAULT_PLACEHOLDER = 'Sélectionnez votre choix';
const DEFAULT_DEBOUNCE_TIMEOUT = 300;

export type SelectSimpleProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'onChange' | 'onInvalid'> & {
	value?: Value;
	onChange?: (value: HTMLElement) => void;
	defaultValue?: string;
	onTouch?: (touched: boolean) => void,
	placeholder?: string,
	required?: boolean,
	onInvalid?: FormEventHandler<HTMLInputElement>,
	optionsAriaLabel: string;
}

type Value = string;

export function SelectSimple({
	optionsAriaLabel,
	children,
	value: valueProps,
	placeholder: placeholderProps,
	name,
	onChange: onChangeProps = doNothing,
	onFocus: onFocusProps = doNothing,
	onInvalid: onInvalidProps = doNothing,
	onTouch: onTouchProps = doNothing,
	defaultValue,
	required,
	...rest
}: SelectSimpleProps) {
	const listboxRef = useRef<HTMLUListElement>(null);
	const inputHiddenRef = useRef<HTMLInputElement>(null);
	const listboxId = useId();

	const { saveValueOnFocus, setTouchedOnBlur, touched } = useTouchedInput();

	const [{
		activeDescendant,
		open,
		selectedValue: valueState,
	}, dispatch] = useReducer(
		SelectSimpleReducer, {
			activeDescendant: undefined,
			open: false,
			refListOption: listboxRef,
			selectedValue: defaultValue ?? '',
			userInput: '',
			visibleOptions: [],
		},
	);

	const value = valueProps ?? valueState;
	const placeholder = useDisplayName(value, listboxRef, placeholderProps);

	useEffect(function checkValidityOnChange() {
		if (touched) {
			inputHiddenRef.current?.checkValidity();
		}
	}, [value, touched]);

	const selectOption = useCallback(function selectOption(optionId: string) {
		dispatch(new SelectSimpleAction.SelectOption(optionId));
		const option = document.getElementById(optionId);
		if (option) { onChangeProps(option); }
	}, [onChangeProps]);

	const closeList = useCallback(() => {
		dispatch(new SelectSimpleAction.CloseList());
	}, []);

	useLayoutEffect(function scrollOptionIntoView() {
		if (activeDescendant) {
			document.getElementById(activeDescendant)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}
	}, [activeDescendant]);

	const onFocus = useCallback(function onFocus(event: FocusEvent<HTMLButtonElement>) {
		saveValueOnFocus(value ?? '');
		onFocusProps(event);
	}, [onFocusProps, saveValueOnFocus, value]);

	const onBlur = useCallback(function onBlur(event: FocusEvent<HTMLButtonElement>) {
		const newFocusStillInSelect = event.currentTarget.contains(event.relatedTarget);
		if (newFocusStillInSelect) {
			cancelEvent(event);
			return;
		}

		const touched = setTouchedOnBlur(value ?? '');
		if (touched) {
			onTouchProps(touched);
		}
		closeList();
	}, [closeList, onTouchProps, setTouchedOnBlur, value]);

	const isSelected = useCallback(function isSelected(optionValue?: string) {
		return value === optionValue;
	}, [value]);

	const clearUserInput = useMemo(() => {
		return debounce(() => dispatch(new SelectSimpleAction.ClearUserInput()), DEFAULT_DEBOUNCE_TIMEOUT);
	}, []);

	const onKeyDown = useCallback(function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
		const { key, altKey, ctrlKey, metaKey } = event;

		const searchableCharacter = event.key.length === 1 && event.key !== KeyBoard.SPACE && !altKey && !ctrlKey && !metaKey;
		if (searchableCharacter) {
			event.preventDefault();
			dispatch(new SelectSimpleAction.FocusOptionMatchingUserInput(key));
			clearUserInput();
		}

		switch (key) {
			case KeyBoard.PAGE_UP:
				if (open) {
					event.preventDefault();
					dispatch(new SelectSimpleAction.PreviousOption(10));
				}
				break;
			case KeyBoard.PAGE_DOWN:
				if (open) {
					event.preventDefault();
					dispatch(new SelectSimpleAction.NextOption(10));
				}
				break;
			case KeyBoard.ARROW_UP:
			case KeyBoard.IE_ARROW_UP:
				if (open) {
					if (altKey) {
						if (activeDescendant) { selectOption(activeDescendant); }
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
				if (open) {
					dispatch(new SelectSimpleAction.NextOption());
				} else {
					dispatch(new SelectSimpleAction.OpenList());
				}
				event.preventDefault();
				break;
			case KeyBoard.ESCAPE:
			case KeyBoard.IE_ESCAPE:
				if (open) {
					event.preventDefault();
					closeList();
				}
				break;
			case KeyBoard.SPACE:
			case KeyBoard.ENTER: {
				if (open) {
					if (activeDescendant) {
						selectOption(activeDescendant);
						event.preventDefault();
					}
				} else {
					cancelEvent(event);
					dispatch(new SelectSimpleAction.OpenList());
				}
				break;
			}
			case KeyBoard.TAB: {
				if (open) {
					if (activeDescendant) {
						selectOption(activeDescendant);
					}
				}
				break;
			}
			case KeyBoard.HOME: {
				dispatch(new SelectSimpleAction.FocusFirstOption());
				event.preventDefault();
				break;
			}
			case KeyBoard.END: {
				dispatch(new SelectSimpleAction.FocusLastOption());
				event.preventDefault();
				break;
			}
			default:
				break;

		}
	}, [activeDescendant, closeList, clearUserInput, open, selectOption]);

	return (
		<SelectContext.Provider value={{
			activeDescendant: activeDescendant,
			isCurrentItemSelected: isSelected,
			onOptionSelection: selectOption,
		}}>
			<div className={styles.container}>
				<Input
					ref={inputHiddenRef}
					tabIndex={-1}
					required={required}
					aria-hidden={'true'}
					name={name}
					onInvalid={onInvalidProps}
					value={value} />
				<button
					type="button"
					role="combobox"
					aria-controls={listboxId}
					aria-haspopup="listbox"
					aria-expanded={open}
					data-touched={touched}
					aria-required={required}
					onClick={() => dispatch(new SelectSimpleAction.ToggleList())}
					aria-activedescendant={activeDescendant}
					onKeyDown={onKeyDown}
					onBlur={onBlur}
					onFocus={onFocus}
					{...rest}>
					{placeholder}
					<Icon name={'angle-down'} />
				</button>
				<ul
					role="listbox"
					ref={listboxRef}
					aria-label={optionsAriaLabel}
					id={listboxId}
					tabIndex={-1}
					hidden={!open}>
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

function useDisplayName(value: Value | undefined, listRef: RefObject<HTMLElement>, placeholder?: string): string {
	const [displayName, setDisplayName] = useState<string>('');

	const getDisplayName = useCallback((value: Value | undefined) => {
		if (!value) { return undefined; }

		const options = getOptionsElement(listRef);
		const optionSelected = options.find((option) => option.getAttribute('data-value') === value);
		return optionSelected?.textContent;
	}, [listRef]);

	useEffect(() => {
		setDisplayName(getDisplayName(value) ?? placeholder ?? DEFAULT_PLACEHOLDER);
	}, [value, placeholder, getDisplayName]);

	return displayName;
}

SelectSimple.Option = SelectOption;
