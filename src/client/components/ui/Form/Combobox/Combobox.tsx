import classNames from 'classnames';
import React, {
	FocusEvent,
	KeyboardEvent,
	SyntheticEvent,
	useCallback,
	useEffect,
	useId,
	useLayoutEffect,
	useMemo,
	useReducer,
	useRef,
	useState } from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { useSynchronizedRef } from '~/client/hooks/useSynchronizedRef';

import { ChangeEvent } from './ChangeEvent';
import styles from './Combobox.module.scss';
import { ComboboxProvider } from './ComboboxContext';
import { ComboboxAction as Actions, ComboboxReducer } from './ComboboxReducer';
import { filterValueOrLabelStartsWith } from './filterStrategies/filterValueOrLabelStartsWith';

type ComboboxProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'aria-label' | 'aria-labelledby' | 'onBlur' | 'onFocus'> & {
	onBlur?: React.ComponentPropsWithoutRef<'div'>['onBlur'],
	onFocus?: React.ComponentPropsWithoutRef<'div'>['onFocus'],
	requireValidOption?: boolean,
	filter?: (element: Element, currentValue: string) => boolean,
	onTouch?: (touched: true) => void;
	valueName?: string;
} & ({
	'aria-label': string,
	'aria-labelledby'?: string,
} | {
	'aria-label'?: string,
	'aria-labelledby': string,
});

function useTouchedInput() {
	const [touched, setTouched] = useState(false);
	const valueOnFocus = useRef<string | null>(null);

	const saveValueOnFocus = useCallback(function saveCurrentValue(value: string) {
		valueOnFocus.current = value;
	}, []);

	const setTouchedOnBlur = useCallback(function touch(currentValue: string) {
		if (valueOnFocus.current !== currentValue) {
			setTouched(true);
		}
	}, []);

	return { saveValueOnFocus, setTouchedOnBlur, touched };
}

export const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>(function Combobox({
	children,
	value: valueProps,
	defaultValue,
	className,
	name,
	valueName,
	'aria-controls': ariaControls,
	onKeyDown: onKeyDownProps = doNothing,
	onChange: onChangeProps = doNothing,
	onBlur: onBlurProps = doNothing,
	onFocus: onFocusProps= doNothing,
	onInput: onInputProps= doNothing,
	requireValidOption = false,
	filter = filterValueOrLabelStartsWith,
	...inputProps
}, inputOuterRef) {
	const { touched, saveValueOnFocus, setTouchedOnBlur } = useTouchedInput();

	const listboxRef = useRef<HTMLUListElement>(null);
	const inputRef = useSynchronizedRef(inputOuterRef);
	const [state, dispatch] = useReducer(
		ComboboxReducer, {
			activeDescendant: undefined,
			open: false,
			suggestionList: listboxRef,
			value: defaultValue?.toString() ?? '',
		},
	);
	const { open, activeDescendant, value: valueState } = state;
	const [ matchingOption, setMatchingOption ] = useState<Element | undefined>();
	const value = valueProps?.toString() ?? valueState;
	const listboxId = useId();

	useEffect(function findMatchingOption() {
		const matchingOption = Array.from(listboxRef.current?.querySelectorAll('[role="option"]') ?? [])
			.find((element) => element.textContent === value);
		setMatchingOption(matchingOption);
		// NOTE (GAFI 27-06-2023): On accède aux children indirectement par le querySelectorAll
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, listboxRef, children]);

	useEffect(() => {
		if (requireValidOption) {
			inputRef.current?.setCustomValidity(matchingOption ? '' : 'Veuillez sélectionner une option dans la liste');
		}
	}, [inputRef, matchingOption, requireValidOption]);

	useEffect(function checkValidity() {
		if (touched) {
			inputRef.current?.checkValidity();
		}
	}, [inputRef, touched, value]);

	useLayoutEffect(function scrollOptionIntoView() {
		if (activeDescendant) {
			document.getElementById(activeDescendant)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}
	}, [activeDescendant]);

	const triggerChangeEvent = useCallback(function triggerChangeEvents() {
		if (inputRef.current) {
			const changeEvent = new ChangeEvent<HTMLInputElement>(inputRef.current);
			onChangeProps(changeEvent);
			onInputProps(changeEvent);
		}
	}, [inputRef, onChangeProps, onInputProps]);

	const onOptionSelection = useCallback(function onOptionSelection(option: Element) {
		dispatch(new Actions.SelectOption(option));
		triggerChangeEvent();
		inputRef.current?.focus();
	}, [inputRef, triggerChangeEvent]);

	const onKeyDown = useCallback(function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
		switch (event.key) {
			case KeyBoard.ARROW_UP:
			case KeyBoard.IE_ARROW_UP:
				dispatch(new Actions.PreviousOption());
				event.preventDefault();
				break;
			case KeyBoard.ARROW_DOWN:
			case KeyBoard.IE_ARROW_DOWN:
				if (event.altKey) {
					dispatch(new Actions.OpenList());
				} else {
					dispatch(new Actions.NextOption());
				}
				event.preventDefault();
				break;
			case KeyBoard.ESCAPE:
			case KeyBoard.IE_ESCAPE:
				dispatch(new Actions.CloseList());
				break;
			case KeyBoard.ENTER: {
				const selectedOption = event.currentTarget.getAttribute('aria-activedescendant');
				if (selectedOption) {
					dispatch(new Actions.SelectOption(selectedOption));
					triggerChangeEvent();
					event.preventDefault();
				}
				break;
			}
			default:
				break;
		}
		onKeyDownProps(event);
	}, [onKeyDownProps, triggerChangeEvent]);
	const onChange = useCallback(function onChange(event: ChangeEvent<HTMLInputElement>) {
		dispatch(new Actions.SetValue(event.currentTarget.value));
		onChangeProps(event);
	}, [onChangeProps]);
	const onBlur = useCallback(function onBlur(event: FocusEvent<HTMLDivElement>) {
		const newFocusStillInCombobox = event.currentTarget.contains(event.relatedTarget);
		if (newFocusStillInCombobox) {
			cancelEvent(event);
			return;
		}

		dispatch(new Actions.CloseList());
		setTouchedOnBlur(value);
		onBlurProps(event);
	}, [setTouchedOnBlur, value, onBlurProps]);
	const onFocus = useCallback(function onFocus(event: FocusEvent<HTMLDivElement>) {
		saveValueOnFocus(value);
		onFocusProps(event);
	}, [onFocusProps, saveValueOnFocus, value]);

	return (
		<ComboboxProvider value={{
			dispatch,
			filter,
			onOptionSelection,
			state,
		}}>
			<div className={classNames(styles.combobox, className)} onBlur={onBlur} onFocus={onFocus}>
				<input
					role="combobox"
				 	aria-expanded={open}
					aria-autocomplete="list"
					aria-activedescendant={activeDescendant}
					aria-controls={`${listboxId} ${ariaControls ?? ''}`}
					ref={inputRef}
					value={value}
					name={(valueName && name) || (name && `${name}.label`)}
					data-touched={touched}
					onChange={onChange}
					onKeyDown={onKeyDown}
					onInput={onInputProps}
					{...inputProps} />
				<input
					type="hidden"
					name={valueName ?? (name && `${name}.value`)}
					value={matchingOption?.getAttribute('data-value') ?? matchingOption?.textContent ?? ''}
					required={requireValidOption}/>
				<button
					onClick={() => {
						dispatch(new Actions.ToggleList());
						inputRef.current?.focus();
					}}
					type="button"
					disabled={inputProps.disabled || inputProps.readOnly}
					tabIndex={-1}
					aria-controls={listboxId}
					aria-expanded={open}
					aria-labelledby={inputProps['aria-labelledby']}
					aria-label={inputProps['aria-label']}>
					<Icon name={'angle-down'} />
				</button>
				<ul
					role="listbox"
					id={listboxId}
					hidden={!open}
					ref={listboxRef}
					aria-labelledby={inputProps['aria-labelledby']}
					aria-label={inputProps['aria-label']}>
					{children}
				</ul>
			</div>
		</ComboboxProvider>
	);
});

function cancelEvent(event: SyntheticEvent) {
	event.preventDefault();
	event.stopPropagation();
}

function doNothing() {
	return;
}
