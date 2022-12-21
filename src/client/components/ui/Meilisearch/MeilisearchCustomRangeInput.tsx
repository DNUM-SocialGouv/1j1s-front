import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRange, UseRangeProps } from 'react-instantsearch-hooks-web';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import styles from '~/client/components/ui/Meilisearch/MeilisearchCustomRangeInput.module.scss';

interface MeilisearchCustomRangeInputProps {
    label: string
    placeholder: string
    unite: string
}

export function MeilisearchCustomRangeInput(props: UseRangeProps & MeilisearchCustomRangeInputProps) {
  const {
    refine,
    start: [currentMinValue, currentMaxValue],
    range: {
      min,
      max,
    },
  } = useRange(props);
  const { label, placeholder, unite } = props;
  const [isRangeBoxOpen, setIsRangeBoxOpen] = useState(false);
  const rangeBoxRef = useRef<HTMLDivElement>(null);
  const BUTTON_LABEL = 'Appliquer';

  const closeRangeBoxOnClickOutside = useCallback((event: MouseEvent) => {
    if (!(rangeBoxRef.current)?.contains(event.target as Node)) {
      setIsRangeBoxOpen(false);
    }
  }, []);

  const closeRangeBoxOnEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === KeyBoard.ESCAPE && isRangeBoxOpen) {
      setIsRangeBoxOpen(false);
    }
  }, [isRangeBoxOpen]);

  useEffect(function setEventListenerOnMount() {
    document.addEventListener('mousedown', closeRangeBoxOnClickOutside);
    document.addEventListener('keyup', closeRangeBoxOnEscape);

    return () => {
      document.removeEventListener('mousedown', closeRangeBoxOnClickOutside);
      document.removeEventListener('keyup', closeRangeBoxOnEscape);
    };
  }, [closeRangeBoxOnClickOutside, closeRangeBoxOnEscape]);

  const unsetNumberInputValue = '' as unknown as number;
  const values = {
    max:
            currentMaxValue !== Infinity && currentMaxValue !== max
              ? currentMaxValue
              : unsetNumberInputValue,
    min:
            currentMinValue !== -Infinity && currentMinValue !== min
              ? currentMinValue
              : unsetNumberInputValue,
  };
  const [prevValues, setPrevValues] = useState(values);
  const [{ from, to }, setRange] = useState({
    from: values.min,
    to: values.max,
  });

  if (values.min !== prevValues.min || values.max !== prevValues.max) {
    setRange({ from: values.min, to: values.max });
    setPrevValues(values);
  }

  function refineRange() {
    refine([from, to]);
  }

  const renderRangeBox = () => (
    <div className={styles.rangeBox}>
      <label>Minimum</label>
      <input
        type="number"
        min={min}
        max={max}
        value={from?.toString()} // Strips leading `0` from a positive number value
        onInput={({ currentTarget }) =>
          setRange({ from: Number(currentTarget.value), to })
        }/>
      <span className={styles.unitMin}>
        {unite}
      </span>
      <label>Maximum</label>
      <input
        type="number"
        min={min}
        max={max}
        value={to?.toString()} // Strips leading `0` from a positive number value
        placeholder={min?.toString()}
        onInput={({ currentTarget }) =>
          setRange({ from, to: Number(currentTarget.value) })
        }
      />
      <span className={styles.unitMax}>
        {unite}
      </span>
      <ButtonComponent type="submit" label={BUTTON_LABEL} onClick={refineRange}/>
    </div>
  );

  return <>
    <div className={styles.formWrapper}>
      <label className={styles.selectLabel}>{label}</label>
      <div ref={rangeBoxRef} className={styles.selectContainer}>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isRangeBoxOpen}
          className={styles.button}
          onClick={() => setIsRangeBoxOpen(!isRangeBoxOpen)}
        >
          <span>{placeholder}</span>
          <Icon name={isRangeBoxOpen ? 'angle-up' : 'angle-down'}/>
        </button>
        {isRangeBoxOpen && renderRangeBox()}
      </div>
    </div>
  </>;
}


