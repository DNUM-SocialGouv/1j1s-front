import React from 'react';

import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import styles from '~/client/components/ui/Select/Select.module.css';
import { SelectComponent as Select } from '~/client/components/ui/Select/SelectComponent';
import { Option } from '~/client/components/ui/Select/SelectSingle/SelectSingle';
import { KeyBoard } from '~/client/utils/keyboard.util';

interface SelectCheckboxProps {
  titre: string
  optionList : Option[]
  onChange: (value: string) => void;
  currentInput: string
  name?: string
}

export function SelectMultiple(props: SelectCheckboxProps) {
  const { optionList, onChange, currentInput, titre, name } = props;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KeyBoard.ENTER) {
      event.preventDefault();
    }
  };

  return (
    <>
      <Select
        titre={titre}
        optionType="listbox">
        {optionList.map((option, index) => (
          <Checkbox
            key={index}
            className={styles.option}
            role="option"
            label={option.libellé}
            value={option.valeur}
            onChange={() => onChange(option.valeur)}
            onKeyDown={handleKeyDown}
            checked={currentInput.split(',').includes(option.valeur)}
          />
        ))}
      </Select>
      <input type="hidden" name={name} value={currentInput}/>
    </>
  );
}
