import {
  Checkbox,
  Icon,
} from '@dataesr/react-dsfr';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import styles from '~/client/components/ui/Select/Select.module.css';
import { KeyBoard } from '~/client/utils/keyboard.util';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

interface SelectCheckboxProps {
  titre: string
  optionList : OffreEmploi.CheckboxFiltre[]
  onChange: (value: string) => void;
  currentInput: string
}

export function SelectCheckbox(props: SelectCheckboxProps) {
  const { titre, optionList, onChange, currentInput } = props;

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const optionsRef = useRef<HTMLDivElement>(null);

  const closeOptionsOnClickOutside = useCallback((e: MouseEvent) => {
    if (!(optionsRef.current)?.contains(e.target as Node)) {
      setIsOptionsOpen(false);
    }
  }, [isOptionsOpen]);

  const closeOptionsOnEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === KeyBoard.ESCAPE) {
      setIsOptionsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', closeOptionsOnClickOutside);
    document.addEventListener('keyup', closeOptionsOnEscape);

    return () => {
      document.removeEventListener('mousedown', closeOptionsOnClickOutside);
      document.removeEventListener('keyup', closeOptionsOnEscape);
    };
  });

  return (
    <div ref={optionsRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOptionsOpen}
        className={styles.button}
        onClick={() => setIsOptionsOpen(!isOptionsOpen)}
      >
        <span>{titre}</span>
        <Icon name="ri-arrow-down-s-line" size="lg" />
      </button>
      { isOptionsOpen &&
      <div
        className={styles.options}
        role="listbox"
        //aria-activedescendant={optionList[selectedOption]}
        tabIndex={-1}
      >
        {optionList.map((option, index) => (
          <Checkbox
            id={option.libellé}
            key={index}
            className={styles.option}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            role="option"
            label={option.libellé}
            value={option.valeur}
            tabIndex={0}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            checked={currentInput.includes(option.valeur)}
          />
        ))}
      </div>
      }

    </div>
  );
}
