import classNames from 'classnames';
import React, {
	KeyboardEvent,
	useCallback,
	useEffect,
	useId,
	useLayoutEffect,
	useMemo,
	useReducer,
	useRef,
} from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { useSynchronizedRef } from '~/client/hooks/useSynchronizedRef';

import { ChangeEvent } from './ChangeEvent';
import styles from './Combobox.module.scss';
import { ComboboxProvider } from './ComboboxContext';
import { ComboboxAction as Actions, ComboboxReducer } from './ComboboxReducer';

type ComboboxProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'aria-label' | 'aria-labelledby' | 'onBlur'> & {
	onBlur?: React.ComponentPropsWithoutRef<'div'>['onBlur'],
	requireDefinedOption?: boolean,
} & ({
	'aria-label': string,
	'aria-labelledby'?: string,
} | {
	'aria-label'?: string,
	'aria-labelledby': string,
});

export const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>(function Combobox({
	children,
	onKeyDown: onKeyDownProps,
	onChange: onChangeProps,
	value: valueProps,
	defaultValue,
	className,
	name,
	'aria-controls': ariaControls,
	onBlur,
	requireDefinedOption = false,
	...inputProps
}, inputOuterRef) {
	const listboxRef = useRef<HTMLUListElement>(null);
	const inputRef = useSynchronizedRef(inputOuterRef);
	const [state, dispatch] = useReducer(
		ComboboxReducer,
		{ activeDescendant: undefined, open: false, suggestionList: listboxRef, value: defaultValue?.toString() ?? '' },
	);
	const { open, activeDescendant, value: valueState } = state;
	const value = valueProps?.toString() ?? valueState;
	const listboxId = useId();

	const matchingOption = useMemo(function findOption(): Element | undefined {
		return Array.from(listboxRef.current?.querySelectorAll('[role="option"]') ?? [])
			.find((element) => element.textContent === value);
		// NOTE (GAFI 27-06-2023): On accède aux children indirectement par le querySelectorAll
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, listboxRef, children]);

	useEffect(() => {
		if (requireDefinedOption) {
			inputRef.current?.setCustomValidity(matchingOption ? '' : 'Veuillez sélectionner une option dans la liste');
		}
	}, [inputRef, matchingOption, requireDefinedOption]);

	useLayoutEffect(function scrollOptionIntoView() {
		if (activeDescendant) {
			document.getElementById(activeDescendant)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}
	}, [activeDescendant]);

	const triggerChangeEvent = useCallback(function triggerChangeEvents() {
		if (inputRef.current) {
			const changeEvent = new ChangeEvent<HTMLInputElement>(inputRef.current);
			if (onChangeProps) { onChangeProps(changeEvent); }
			if (inputProps.onInput) { inputProps.onInput(changeEvent); }
		}
	}, [inputProps, inputRef, onChangeProps]);

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

		if (onKeyDownProps) {
			onKeyDownProps(event);
		}
	}, [onKeyDownProps, triggerChangeEvent]);
	const onChange = useCallback(function onChange(event: ChangeEvent<HTMLInputElement>) {
		dispatch(new Actions.SetValue(event.currentTarget.value));
		if (onChangeProps) { onChangeProps(event); }
	}, [onChangeProps]);

	return (
		<ComboboxProvider value={{
			dispatch,
			onOptionSelection,
			state,
		}}>
			<div className={classNames(styles.combobox, className)} onBlur={(event) => {
				if (event.currentTarget.contains(event.relatedTarget)) {
					event.preventDefault();
					event.stopPropagation();
				} else {
					dispatch(new Actions.CloseList());
					if (onBlur) { onBlur(event); }
				}
			}}>
				<input
					role="combobox"
				 	aria-expanded={open}
					aria-autocomplete="list"
					aria-activedescendant={activeDescendant}
					aria-controls={`${listboxId} ${ariaControls ?? ''}`}
					ref={inputRef}
					onKeyDown={onKeyDown}
					value={value}
					onChange={onChange}
					name={name && `${name}.label`}
					{...inputProps} />
				<input
					type="hidden"
					name={name && `${name}.value`}
					value={matchingOption?.getAttribute('data-value') ?? matchingOption?.textContent ?? ''} />
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
