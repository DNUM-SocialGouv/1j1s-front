import React, {
  ChangeEvent,
  useCallback,
  useRef,
  useState,
} from 'react';

import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import { Radio } from '~/client/components/ui/Radio/Radio';
import { Option } from '~/client/components/ui/Select/Select';
import styles from '~/client/components/ui/Select/Select.module.scss';
import { KeyBoard } from '~/client/utils/keyboard.util';

interface ListBoxProps {
  multiple: boolean
  optionList: Option[]
  onChange: ((value: string) => void) | undefined;
  setSelectedValue: (value: string) => void;
  setIsOptionListOpen: (value: boolean) => void;
  selectedValue: string
}

export function ListBox(props: ListBoxProps) {
  const { multiple, optionList, onChange, selectedValue, setIsOptionListOpen, setSelectedValue } = props;
  const listBoxRef = useRef<HTMLUListElement>(null);
  const [id, setId] = useState('');

  const isCurrentItemChecked = (option: Option): boolean => {
    return selectedValue.split(',').includes(option.valeur);
  };
  
  const isCurrentItemSelected = (option: Option): boolean => selectedValue === option.valeur;

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement | HTMLLIElement>) => {
    const currentItem = event.target;
    if (event.key === KeyBoard.ENTER || event.key === KeyBoard.TAB) event.preventDefault();
    if (event.key === KeyBoard.ARROW_UP) {
      if (currentItem.previousElementSibling !== null) {
        const previousElement = currentItem.previousElementSibling as HTMLElement;
        previousElement.focus();
      }
      event.preventDefault();
    }
    if (event.key === KeyBoard.ARROW_DOWN) {
      if (currentItem.nextElementSibling !== null) {
        const nextElement = currentItem.nextElementSibling as HTMLElement;
        nextElement.focus();
      }
      event.preventDefault();
    }
    if (event.code === KeyBoard.SPACE) {
      const currentInput = event.target.querySelector('input');
      if (currentInput === null ) return;
      setId(currentInput.id);
      const inputValue = currentInput.getAttribute('value');
      if (multiple) {
        if (inputValue !== null) onSelectMultipleChange(!currentInput.checked, inputValue);

      }
      else {
        if (inputValue !== null) setSelectedValue(inputValue);
        setIsOptionListOpen(false);
        if (currentItem.parentElement !== null && currentItem.parentElement.parentElement !== null) {
          currentItem.parentElement.parentElement.getElementsByTagName('button')[0].focus();
        }
      }

      event.preventDefault();
    }
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
    if (onChange) {
      onChange(newSelectedValue);
    }
  }, [selectedValue, onChange, setSelectedValue]);

  return (
    <ul
      className={styles.options}
      role="listbox"
      tabIndex={0}
      aria-activedescendant={id}
      ref={listBoxRef}
      aria-multiselectable={multiple}
    > 
      {
        multiple
          ? optionList.map((option, index) => {
            return (
              <li
                tabIndex={-1}
                role="option"
                key={index}
                aria-checked={isCurrentItemChecked(option)}
                aria-selected={isCurrentItemChecked(option)}
                onKeyDown={handleKeyDown}>
                <Checkbox
                  className={styles.option}
                  label={option.libellé}
                  value={option.valeur}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setId(event.target.id);
                    onSelectMultipleChange(event.target.checked, option.valeur);
                  }}
                  checked={isCurrentItemChecked(option)}
                />
              </li>

            );
          })
          : optionList.map((option, index) => (
            <li
              tabIndex={-1}
              role="option"
              key={index}
              aria-selected={isCurrentItemSelected(option)}
              onKeyDown={handleKeyDown}>
              <Radio
                key={index}
                className={styles.option}
                label={option.libellé}
                value={option.valeur}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setId(event.target.id);
                  setIsOptionListOpen(false);
                  setSelectedValue(option.valeur);
                  if(onChange) {
                    onChange(option.valeur);
                  }
                }}
                checked={isCurrentItemSelected(option)}
              />
            </li>

          ))
      }
    </ul>
  );
}
