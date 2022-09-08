import React, {
  ChangeEvent,
  useCallback,
  useRef,
  useState
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
  setIsOptionsOpen: (value: boolean) => void;
  selectedValue: string
}

export function ListBox(props: ListBoxProps) {
  const { multiple, optionList, onChange, selectedValue, setIsOptionsOpen, setSelectedValue } = props;
  const listBoxRef = useRef<HTMLDivElement>(null);
  const [id, setId] = useState('');

  const selectedValueContainsCheckboxValue = (option: Option) => {
    //console.log('selectedValue', selectedValue)
    console.log('selectedValueContainsCheckboxValue')
    selectedValue.split(',').includes(option.valeur);
  }
  const selectedValueIsRadioValue = (option: Option) => selectedValue === option.valeur;

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KeyBoard.ENTER) {
      event.preventDefault();
    }
    if (event.code === KeyBoard.SPACE) {
      event.preventDefault();
      const currentInput = event.target.querySelector("input[type=checkbox]")
      //console.log('currentInput', currentInput)
      const currentState = currentInput.getAttribute("aria-checked")
      //console.log('test currentState', currentState === 'false')
      const newState = !(currentState === 'true')
      //console.log('currentInput', currentInput)
      //console.log('checked', currentState, newState)
      currentInput.setAttribute("aria-checked", `${newState}`)
      currentInput.setAttribute("aria-selected", `${newState}`)

      if (currentInput.getAttribute("value")) {
        onSelectMultipleChange(newState, currentInput.getAttribute("value")!)
      }
    }
  }, []);

  const onSelectMultipleChange = useCallback((isValueSelected: boolean, changedValue: string) => {
    console.log('CURRENT VALUE SELECTED', selectedValue)
    console.log('onSelectMultipleChange', isValueSelected, changedValue)
    const valueList = selectedValue ? selectedValue.split(',') : [];
    if (isValueSelected) {
      valueList.push(changedValue);
    } else {
      const indexOfValue = valueList.indexOf(changedValue);
      valueList.splice(indexOfValue, 1);
    }

    const newSelectedValue = valueList.join(',');
    console.log('newSelectedValue', newSelectedValue)
    setSelectedValue(newSelectedValue);
    if (onChange) {
      onChange(newSelectedValue);
    }
  }, [selectedValue, onChange, setSelectedValue]);

  return (
    <div
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
              <Checkbox
                key={index}
                className={styles.option}
                role="option"
                label={option.libellé}
                value={option.valeur}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setId(event.target.id);
                  onSelectMultipleChange(event.target.checked, option.valeur);
                }}
                onKeyDown={handleKeyDown}
                aria-checked={selectedValueContainsCheckboxValue(option)}
                checked={selectedValueContainsCheckboxValue(option)}
              />
            );
          })
          : optionList.map((option, index) => (
            <Radio
              key={index}
              className={styles.option}
              role="option"
              label={option.libellé}
              value={option.valeur}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setId(event.target.id);
                setIsOptionsOpen(false);
                setSelectedValue(option.valeur);
                if(onChange) {
                  onChange(option.valeur);
                }
              }}
              onKeyDown={handleKeyDown}
              aria-selected={selectedValueIsRadioValue(option)}
            />
          ))
      }
    </div>
  );
}
