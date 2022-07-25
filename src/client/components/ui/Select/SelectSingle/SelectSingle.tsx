import classNames from 'classnames';
import React, { ChangeEvent } from 'react';

import { RadioButton } from '~/client/components/ui/RadioButton/RadioButton';
import styles from '~/client/components/ui/Select/Select.module.css';
import { SelectComponent as Select } from '~/client/components/ui/Select/SelectComponent';
import { KeyBoard } from '~/client/utils/keyboard.util';

interface SelectRadioProps {
  titre: string;
  optionList: Option[];
  onChange: (value: string) => void;
  currentInput: string;
  dataTestId?: string;
  label?: string;
  name?: string;
}

export interface Option {
  libellé: string;
  valeur: string;
}

export function SelectSingle(props: SelectRadioProps) {
  const { optionList, onChange, dataTestId, currentInput, titre, name, label } = props;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KeyBoard.ENTER) {
      event.preventDefault();
    }
  };

  function getLongueurMaximalOptions(optionList: Option[]) {
    const optionListLength = optionList.map((option) => option.libellé.length);
    return Math.max(...optionListLength);
  }

  const getSelectComponent = () => (
    <>
      <Select
        titre={titre}
        name={name}
        currentInput={currentInput}
        dataTestId={dataTestId}
        optionType="combobox"
        tailleMinimumButton={getLongueurMaximalOptions(optionList)}>
        {optionList.map((option, index) => (
          <RadioButton
            id={option.libellé}
            key={index}
            className={styles.option}
            role="option"
            label={option.libellé}
            value={option.valeur}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onChange(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            checked={currentInput === option.valeur}
          />
        ))}
      </Select>
    </>
  );

  return (
    <>
      {
        label ? (
          <div>
            <label className={classNames(styles.selectLabel, 'fr-label')}>
              {label}
            </label>
            {getSelectComponent()}
          </div>
        ) : getSelectComponent()
      }
    </>
  );
}
