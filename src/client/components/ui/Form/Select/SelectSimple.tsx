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
	useState,
} from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { Input } from '~/client/components/ui/Form/Input';
import { SelectContext } from '~/client/components/ui/Form/Select/SelectContext';
import { SelectOption } from '~/client/components/ui/Form/Select/SelectOption';
import { Icon } from '~/client/components/ui/Icon/Icon';

import styles from './Select.module.scss';
import { getOptionsElement, SelectSimpleAction, SelectSimpleReducer } from './SelectReducer';

const ERROR_LABEL_REQUIRED_SIMPLE = 'Séléctionnez un élément de la liste';
const SELECT_PLACEHOLDER_SINGULAR = 'Sélectionnez votre choix';
const DEFAULT_DEBOUNCE_TIMEOUT = 300;

export type SelectSimpleProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'onChange' | 'onInvalid'> & {
	value?: string;
	onChange?: (value: HTMLElement) => void;
	defaultValue?: string;
	onTouch?: (touched: boolean) => void,
	placeholder?: string,
	required?: boolean,
	onInvalid?: FormEventHandler<HTMLInputElement>,
	optionsAriaLabel: string;
}

export function SelectSimple(props: SelectSimpleProps) {
	const {
		optionsAriaLabel,
		children,
		value,
		placeholder: placeholderProps,
		name,
		onChange: onChangeProps = doNothing,
		onInvalid: onInvalidProps = doNothing,
		onTouch: onTouchProps = doNothing,
		defaultValue,
		required,
		...rest
	} = props;
	const listboxRef = useRef<HTMLUListElement>(null);
	const inputHiddenRef = useRef<HTMLInputElement>(null);
	const listboxId = useId();

	const [touched, setTouched] = useState<boolean>(false);
	const [placeholder, setPlaceholder] = useState<string>();

	const [state, dispatch] = useReducer(
		SelectSimpleReducer, {
			activeDescendant: undefined,
			isListOptionsOpen: false,
			optionSelectedValue: defaultValue ? defaultValue : '',
			refListOption: listboxRef,
			valueTypedByUser: '',
			visibleOptions: [],
		},
	);

	const optionSelectedValue = value ?? state.optionSelectedValue;

	const placeholderWhenValueSelected = useCallback(() => {
		if (optionSelectedValue) {
			const options = getOptionsElement(listboxRef);
			const optionSelected = options.find((option) => option.getAttribute('data-value') === optionSelectedValue);
			return optionSelected?.textContent;
		}
	}, [optionSelectedValue]);

	useEffect(() => {
		setPlaceholder(placeholderWhenValueSelected() ?? placeholderProps ?? SELECT_PLACEHOLDER_SINGULAR);
	}, [optionSelectedValue, placeholderProps, placeholderWhenValueSelected]);

	const selectOption = useCallback((optionId: string) => {
		setTouched(true);
		onTouchProps(true);

		inputHiddenRef.current?.setCustomValidity('');
		dispatch(new SelectSimpleAction.SelectOption(optionId));
		const option = document.getElementById(optionId);
		if (option) onChangeProps(option);
	}, [onChangeProps, onTouchProps]);

	const closeList = useCallback(() => {
		dispatch(new SelectSimpleAction.CloseList());
		onTouchProps(true);
		setTouched(true);

		if (required && !optionSelectedValue) {
			inputHiddenRef.current?.setCustomValidity(ERROR_LABEL_REQUIRED_SIMPLE);
		}
		inputHiddenRef.current?.checkValidity();
	}, [onTouchProps, optionSelectedValue, required]);

	useLayoutEffect(function scrollOptionIntoView() {
		if (state.activeDescendant) {
			document.getElementById(state.activeDescendant)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}
	}, [state.activeDescendant]);

	const onBlur = useCallback(function onBlur(event: FocusEvent<HTMLButtonElement>) {
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

	const resetValueTypedByUser = useCallback(() => {
		dispatch(new SelectSimpleAction.SetValueTypedByUser(''));
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
				dispatch(new SelectSimpleAction.OpenList());
			}
			dispatch(new SelectSimpleAction.FocusOptionMatchingUserInput(key));
			handlefocusOnTypeLetterDebounce();
		}

		switch (key) {
			case KeyBoard.PAGE_UP:
				if (state.isListOptionsOpen) {
					event.preventDefault();
					dispatch(new SelectSimpleAction.PreviousOption(10));
				}
				break;
			case KeyBoard.PAGE_DOWN:
				if (state.isListOptionsOpen) {
					event.preventDefault();
					dispatch(new SelectSimpleAction.NextOption(10));
				}
				break;
			case KeyBoard.ARROW_UP:
			case KeyBoard.IE_ARROW_UP:
				if (state.isListOptionsOpen) {
					if (altKey) {
						if (state.activeDescendant) { selectOption(state.activeDescendant); };
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
				if (state.isListOptionsOpen) {
					dispatch(new SelectSimpleAction.NextOption());
				} else {
					dispatch(new SelectSimpleAction.OpenList());
				}
				event.preventDefault();
				break;
			case KeyBoard.ESCAPE:
			case KeyBoard.IE_ESCAPE:
				if (state.isListOptionsOpen) event.preventDefault();
				closeList();
				break;
			case KeyBoard.SPACE:
			case KeyBoard.ENTER: {
				if (state.isListOptionsOpen) {
					if (state.activeDescendant) {
						selectOption(state.activeDescendant);
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
					if (state.activeDescendant) {
						selectOption(state.activeDescendant);
					}
				}
				break;
			}
			case KeyBoard.HOME: {
				if (!state.isListOptionsOpen) {
					dispatch(new SelectSimpleAction.OpenList());
				}
				dispatch(new SelectSimpleAction.FocusFirstOption());
				event.preventDefault();
				break;
			}
			case KeyBoard.END: {
				if (!state.isListOptionsOpen) {
					dispatch(new SelectSimpleAction.OpenList());
				}
				dispatch(new SelectSimpleAction.FocusLastOption());
				event.preventDefault();
				break;
			}
			default:
				break;

		}
	}, [closeList, handlefocusOnTypeLetterDebounce, selectOption, state]);

	return (
		<SelectContext.Provider value={{
			activeDescendant: state.activeDescendant,
			isCurrentItemSelected,
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
					value={optionSelectedValue}
				/>
				<button
					type="button"
					role="combobox"
					aria-controls={listboxId}
					aria-haspopup="listbox"
					aria-expanded={state.isListOptionsOpen}
					data-touched={touched}
					onClick={() => dispatch(new SelectSimpleAction.ToggleList())}
					aria-activedescendant={state.activeDescendant}
					onKeyDown={onKeyDown}
					onBlur={onBlur}
					{...rest}
				>
					{placeholder}
					<Icon name={'angle-down'}/>
				</button>
				<ul
					role="listbox"
					ref={listboxRef}
					aria-label={optionsAriaLabel}
					id={listboxId}
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

SelectSimple.Option = SelectOption;
