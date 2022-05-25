import { Icon } from '@dataesr/react-dsfr';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import styles from '~/client/components/ui/Select/Select.module.css';
import { KeyBoard } from '~/client/utils/keyboard.util';


interface CustomSelectProps {
  titre: string
}

export function SelectComponent(props: React.PropsWithChildren<CustomSelectProps>) {
  const { titre, children } = props;

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const optionsRef = useRef<HTMLDivElement>(null);

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
    <div ref={optionsRef}>
      <button
        type="button"
        data-testid={`SelectButton-${titre}`}
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
        data-testid="OptionList"
        role="listbox"
      >
        {children}
      </div>
      }
    </div>
  );
}
