import classNames from 'classnames';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { handleKeyBoardInteraction, setFocusToSelectButton } from '~/client/components/keyboard/select.keyboard';
import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Radio } from '~/client/components/ui/Radio/Radio';
import styles from '~/client/components/ui/Select/Select.module.scss';

interface SelectProps {
  placeholder?: string;
  optionList: Option[];
  value?: string;
  className?: string
  label: string;
  name?: string;
  multiple?: boolean;
  required?: boolean;
  id?: string
  onChange?: (value: string) => void; // FIXME: utiliser le type natif onChange de React.HTMLAttributes<HTMLInputElement>
}

export interface Option {
  libellé: string;
  valeur: string;
}

const SELECT_PLACEHOLDER_SINGULAR = 'Sélectionnez votre choix';
const SELECT_PLACEHOLDER_PLURAL = 'Sélectionnez vos choix';
const SELECT_ERROR_MESSAGE_REQUIRED = 'Veuillez sélectionner un choix';

export function Select(props: SelectProps) {
	const { className, id, optionList, value, placeholder, name, label, multiple, required, onChange } = props;
	const errorMessageBy = useRef(uuidv4());
	const optionsRef = useRef<HTMLDivElement>(null);
	const labelledBy = useRef(uuidv4());
	const listBoxRef = useRef<HTMLUListElement>(null);
	const selectId = useRef<string>(id || uuidv4());
	const [isTouched, setIsTouched] = useState(false);
	const [isOptionListOpen, setIsOptionListOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState(value || '');
	const [errorMessage] = useState(SELECT_ERROR_MESSAGE_REQUIRED);

	const selectedOption = useMemo(() => optionList.find((option) => option.valeur === selectedValue),
		[optionList, selectedValue]);

	const defaultPlaceholder = useMemo(() => multiple ? SELECT_PLACEHOLDER_PLURAL : SELECT_PLACEHOLDER_SINGULAR,
		[multiple]);
  
	const multipleSelectLabel = useMemo(() => {
		const selectedValueLength = String(selectedValue).split(',').length;
		return `${selectedValueLength} choix ${selectedValueLength > 1 ? 'sélectionnés' : 'sélectionné'}`;
	}, [selectedValue]);
  
	const singleSelectLabel = useMemo(() => selectedOption ? selectedOption.libellé : '', [selectedOption]);

	const buttonLabel = useMemo(() => {
		if (selectedValue) return multiple ? multipleSelectLabel : singleSelectLabel;
		if (placeholder) return placeholder;
		return defaultPlaceholder;
	}, [defaultPlaceholder, multiple, multipleSelectLabel, placeholder, selectedValue, singleSelectLabel]);

	const hasError = useMemo(() => isTouched && !selectedValue && !isOptionListOpen, [isOptionListOpen, isTouched, selectedValue]);

	const closeOptionsOnClickOutside = useCallback((event: MouseEvent) => {
		if (!(optionsRef.current)?.contains(event.target as Node)) {
			setIsOptionListOpen(false);
		}
	}, []);

	const closeOptionsOnEscape = useCallback((event: KeyboardEvent) => {
		const currentItem = event.target as HTMLElement;
		if (event.key === KeyBoard.ESCAPE && isOptionListOpen) {
			setIsOptionListOpen(false);
			setFocusToSelectButton(currentItem);
		}
	}, [isOptionListOpen]);

	useEffect(function onValueChange() {
		if (value) setSelectedValue(value);
	}, [value]);
  
	useEffect(function setEventListenerOnMount() {
		document.addEventListener('mousedown', closeOptionsOnClickOutside);
		document.addEventListener('keyup', closeOptionsOnEscape);

		return () => {
			document.removeEventListener('mousedown', closeOptionsOnClickOutside);
			document.removeEventListener('keyup', closeOptionsOnEscape);
		};
	}, [closeOptionsOnClickOutside, closeOptionsOnEscape]);

	useEffect(function setFocusOnOpen() {
		if (isOptionListOpen) {
			const currentItem = optionsRef.current as HTMLDivElement;
			const firstElement = currentItem.getElementsByTagName('li')[0];
			firstElement.focus();
		}
	}, [isOptionListOpen]);

	const isCurrentItemSelected = useCallback((option: Option): boolean => {
		return multiple ? selectedValue.split(',').includes(option.valeur) : selectedValue === option.valeur;
	}, [selectedValue, multiple]);

	const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
		const currentItem = event.target as HTMLElement;
		const updateValues = () => {
			const currentInput = currentItem.querySelector('input');
			if (currentInput === null) return;
			const inputValue = currentInput.getAttribute('value');
			if (multiple && inputValue !== null) onSelectMultipleChange(!currentInput.checked, inputValue);
			else {
				if (inputValue !== null) setSelectedValue(inputValue);
				setIsOptionListOpen(false);
				setFocusToSelectButton(currentItem);
			}
		};
		handleKeyBoardInteraction(event, currentItem, updateValues);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedValue, multiple, setIsOptionListOpen, setSelectedValue]);

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
	}, [selectedValue, setSelectedValue]);

	const renderOptionList = () => (
		<ul
			className={styles.options}
			role="listbox"
			ref={listBoxRef}
			aria-multiselectable={multiple}>
			{optionList.map((option, index) =>
				<li
					tabIndex={-1}
					role="option"
					key={index}
					aria-selected={isCurrentItemSelected(option)}
					onKeyDown={handleKeyDown}>
					{multiple ? renderCheckBox(option) : renderRadioButton(option)}
				</li>,
			)}
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
				// FIX: remove onChange, see if it cause problems 
			}}
		/>
	);

	const renderRadioButton = (option: Option) => (
		<Radio
			className={styles.option}
			label={option.libellé}
			value={option.valeur}
			checked={isCurrentItemSelected(option)}
			onChange={() => {
				setIsOptionListOpen(false);
				setSelectedValue(option.valeur);
				onChange?.(option.valeur);
			}}
		/>
	);

	return (
		<div className={classNames(styles.selectWrapper, className)}>
			<label htmlFor={selectId.current} className={styles.selectLabel} id={labelledBy.current}>{label}</label>
			<div ref={optionsRef} className={styles.container}>
				<button
					type="button"
					aria-haspopup="listbox"
					aria-expanded={isOptionListOpen}
					aria-labelledby={labelledBy.current}
					className={classNames(styles.button, { [styles.buttonInvalid]: hasError })}
					onClick={() => setIsOptionListOpen(!isOptionListOpen)}
					onBlur={() => required ? setIsTouched(true) : undefined}>
					<span className={classNames({ [styles.selectedLabel]: selectedValue })} data-testid="Select-Placeholder">{buttonLabel}</span>
					<input
						className={classNames(styles.innerInput, selectedValue ? styles.innerInputWithValue : '')}
						id={selectId.current}
						tabIndex={-1}
						name={name}
						value={selectedValue}
						aria-hidden={true}
						aria-invalid={hasError}
						aria-errormessage={errorMessageBy.current}
						data-testid="Select-InputHidden"
						autoComplete="off"
						required={required}
						onChange={() => ({})}
					/>
					{isOptionListOpen ? <Icon name={'angle-up'}/> : <Icon name={'angle-down'}/>}
				</button>
				{isOptionListOpen && renderOptionList()}
			</div>
			{hasError &&
        <p className={classNames(styles.inputError)} id={errorMessageBy.current}>
        	{errorMessage}
        </p>
			}
		</div>
	);
}
