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
import { SelectReducer, SelectSimpleAction } from './SelectReducer';

const ERROR_LABEL_REQUIRED_SIMPLE = 'Séléctionnez un élément de la liste';
const SELECT_PLACEHOLDER_SINGULAR = 'Sélectionnez votre choix';
const DEFAULT_DEBOUNCE_TIMEOUT = 300;

export type SelectSimpleProps = Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> & {
	optionList: OptionSelectSimple[];
	value?: string;
	onChange?: (value: HTMLElement) => void;
	defaultValue?: string;
	onTouch?: (touched: boolean) => void,
}

export interface OptionSelectSimple {
	libellé: string;
	valeur: string;
}

export function SelectSimple(props: SelectSimpleProps & { labelledBy: string }) {
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
		'aria-describedby': ariaDescribedby = '',
		required,
		...rest
	} = props;
	const listboxRef = useRef<HTMLUListElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const [touched, setTouched] = useState<boolean>(false);
	const errorId = useId();
	const optionsId = useId();
	const listboxId = useId();
	const [state, dispatch] = useReducer(
		SelectReducer, {
			activeDescendant: undefined,
			isListOptionsOpen: false,
			optionSelectedValue: defaultValue ? defaultValue : '',
			refListOption: listboxRef,
			valueTypedByUser: '',
			visibleOptions: [],
		},
	);

	const optionSelectedValue = value ?? state.optionSelectedValue;

	const selectOption = useCallback((optionId: string) => {
		setTouched(true);
		inputRef.current?.setCustomValidity('');
		dispatch(new SelectSimpleAction.SelectOption(optionId));
		const option = document.getElementById(optionId);
		if (option) onChangeProps(option);
	}, [onChangeProps]);

	const closeList = useCallback(() => {
		dispatch(new SelectSimpleAction.CloseList());
		onTouchProps(touched);
		setTouched(true);
		if (required && !optionSelectedValue) {
			inputRef.current?.setCustomValidity(ERROR_LABEL_REQUIRED_SIMPLE);
		}
		inputRef.current?.checkValidity();
	}, [onTouchProps, optionSelectedValue, required, touched]);

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

	const onKeyDown = useCallback(function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
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
						state.activeDescendant && selectOption(state.activeDescendant);
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

	function PlaceholderSelectedValue() {
		function getLabelByValue(value: string) {
			const optionValue = optionList.find((option) => option.valeur === value);
			return optionValue?.libellé ?? '';
		}

		if (optionSelectedValue) return getLabelByValue(optionSelectedValue);
		if (placeholder) return placeholder;
		return SELECT_PLACEHOLDER_SINGULAR;
	}

	return (
		<div>
			<div className={styles.container}>
				<Input
					ref={inputRef}
					className={styles.inputHiddenValue}
					tabIndex={-1}
					required={required}
					aria-hidden={'true'}
					name={name}
					onInvalid={onInvalidProps}
					value={optionSelectedValue}
				/>
				<div
					className={classNames(styles.combobox)}
					role="combobox"
					aria-controls={listboxId}
					aria-haspopup="listbox"
					data-touched={touched}
					aria-expanded={state.isListOptionsOpen}
					aria-labelledby={labelledBy}
					aria-describedby={`${ariaDescribedby} ${errorId}`}
					tabIndex={0}
					onClick={() => {
						dispatch(new SelectSimpleAction.ToggleList());
					}}
					aria-activedescendant={state.activeDescendant}
					onKeyDown={onKeyDown}
					onBlur={onBlur}
					{...rest}
				>
					<PlaceholderSelectedValue/>
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
							className={classNames(styles.optionComboboxSimple, state.activeDescendant === optionId ? styles.optionVisuallyFocus : '')}
							id={optionId}
							role="option"
							key={index}
							onMouseDown={onMouseDown}
							data-value={option.valeur}
							onClick={() => {
								selectOption(optionId);
							}}
							aria-selected={isCurrentItemSelected(option.valeur)}>
							{option.libellé}
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
}
