import { Radio } from '@dataesr/react-dsfr';
import React, { ChangeEvent } from 'react';

import styles from '~/client/components/ui/Select/Select.module.css';
import { SelectComponent as Select } from '~/client/components/ui/Select/SelectComponent';
import { KeyBoard } from '~/client/utils/keyboard.util';
import {
  MissionEngagement,
} from '~/server/engagement/domain/engagement';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

interface SelectRadioProps {
  titre: string
  optionList : OffreEmploi.TempsDeTravail[] | Array<MissionEngagement.Domaine>
  onChange: (value: string) => void
  currentInput: string
}

export function SelectSingle(props: SelectRadioProps) {
  const { optionList, onChange, currentInput, titre } = props;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KeyBoard.ENTER) {
      event.preventDefault();
    }
  };

  return (
    <Select titre={titre}>
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
          checked={currentInput.includes(option.valeur)}
        />
      ))}
    </Select>
  );
}
