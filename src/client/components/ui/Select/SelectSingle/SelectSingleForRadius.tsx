import { Radio } from '@dataesr/react-dsfr';
import React, { ChangeEvent } from 'react';

import styles from '~/client/components/ui/Select/Select.module.css';
import { SelectComponent as Select } from '~/client/components/ui/Select/SelectComponent';
import { KeyBoard } from '~/client/utils/keyboard.util';

interface SelectRadioProps {
  titre: string
  optionList : OptionListObject[]
  onChange: (value: string) => void
  currentInput: string
  label: string
}

export interface OptionListObject {
  libellé: string
  valeur: string
}

export function SelectSingleForRadius(props: SelectRadioProps) {
  const { optionList, onChange, currentInput, titre, label } = props;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KeyBoard.ENTER) {
      event.preventDefault();
    }
  };

  return (
    <div>
      <label className={'fr-label'}>
        {label}
      </label>
      <Select titre={titre} label={label}>
        {optionList.map((option, index) => (
          <Radio
            id={option.libellé}
            key={index}
            className={styles.option}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            role="option"
            label={option.libellé}
            value={option.valeur}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            checked={currentInput === option.valeur}
          />
        ))}
      </Select>
    </div>
  );
}

