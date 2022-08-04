import React, { ChangeEvent, useCallback } from 'react';

import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import { Radio } from '~/client/components/ui/Radio/Radio';
import { Option } from '~/client/components/ui/Select/Select';
import styles from '~/client/components/ui/Select/Select.module.scss';
import { KeyBoard } from '~/client/utils/keyboard.util';


interface ListBoxProps {
  multiple: boolean
  optionList: Option[]
  onChange: ((value: string) => void) | undefined;
  setSelectedValue: (value: string) => void | undefined;
  selectedValue: string
}

export function ListBox(props: ListBoxProps) {
  const { multiple, optionList, onChange, selectedValue, setSelectedValue } = props;

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KeyBoard.ENTER) {
      event.preventDefault();
    }
  }, []);

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
    <div
      className={styles.options}
      role="listbox"
    > 
      {
        multiple
          ? optionList.map((option, index) => (
            <Checkbox
              key={index}
              className={styles.option}
              role="option"
              label={option.libellé}
              value={option.valeur}
              onChange={(event: ChangeEvent<HTMLInputElement>) => onSelectMultipleChange(event.target.checked, option.valeur)}
              onKeyDown={handleKeyDown}
              checked={selectedValue.split(',').includes(option.valeur)}
            />
          ))
          : optionList.map((option, index) => (
            <Radio
              id={option.libellé}
              key={index}
              className={styles.option}
              role="option"
              label={option.libellé}
              value={option.valeur}
              onChange={() => {
                setSelectedValue(option.valeur);
                if(onChange) {
                  onChange(option.valeur);
                }
              }}
              onKeyDown={handleKeyDown}
              checked={selectedValue === option.valeur}
            />
          ))
      }
    </div>
  );
}
