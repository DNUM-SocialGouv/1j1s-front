import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { AngleDownIcon } from '~/client/components/ui/Icon/angle-down.icon';
import { AngleUpIcon } from '~/client/components/ui/Icon/angle-up.icon';
import styles from '~/client/components/ui/Select/Select.module.css';
import { KeyBoard } from '~/client/utils/keyboard.util';


interface CustomSelectProps {
  titre: string
  optionType: string
  name?: string
  currentInput?: string
  dataTestId?: string
  tailleMinimumButton?: number
}

export function SelectComponent(props: React.PropsWithChildren<CustomSelectProps>) {
  const { titre, children, name, optionType, dataTestId, currentInput, tailleMinimumButton } = props;

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const optionsRef = useRef<HTMLDivElement>(null);

  const MARGE = 3;
  const additionalCss = tailleMinimumButton ? { minWidth: `${tailleMinimumButton + MARGE}ch` } : {};

  const closeOptionsOnClickOutside = useCallback((e: MouseEvent) => {
    if (!(optionsRef.current)?.contains(e.target as Node)) {
      setIsOptionsOpen(false);
    }
  }, []);

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
    <div ref={optionsRef} className={styles.container}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOptionsOpen}
        style={additionalCss}
        className={styles.button}
        onClick={() => setIsOptionsOpen(!isOptionsOpen)}
      >
        <span>{titre}</span>
        {isOptionsOpen ? <AngleUpIcon/> : <AngleDownIcon />}
      </button>
      { isOptionsOpen &&
      <div
        className={styles.options}
        data-testid={`Select-${name}`}
        role={optionType}
      >
        {children}
      </div>
      }
      <input type="hidden" name={name} value={currentInput} data-testid={dataTestId}/>
    </div>
  );
}
