import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  useSearchBox,
  UseSearchBoxProps,
} from 'react-instantsearch-hooks-web';
import { v4 as uuidv4 } from 'uuid';

import { Icon } from '~/client/components/ui/Icon/Icon';

import styles from './MeilisearchCustomSearchBox.module.scss';

interface MeilisearchCustomSearchBoxProps {
  id?: string
  label: string
  name: string
  placeholder: string
  resetTitle?: string
}

export const MeilisearchCustomSearchBox = (props: MeilisearchCustomSearchBoxProps &  UseSearchBoxProps) => {
  const {
    label,
    name,
    id,
    placeholder,
    resetTitle,
  } = props;
  const { refine, clear } = useSearchBox(props);
  const uuid = uuidv4();
  const inputRef = useRef(id || uuid);

  const DEFAULT_RESET_TITLE = 'Vider le champ de recherche';
  const [value, setValue] = useState('');

  const updateValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    refine(event.target.value);
  };

  const resetValue = () => {
    setValue('');
    clear();
  };

  useEffect(() => {
    inputRef.current = id || uuid;
  }, [id, uuid]);

  return (
    <>
      <label htmlFor={inputRef.current}>{label}</label>
      <span className={styles.customSearchBoxInputWrapper}>
        <input
          id={inputRef.current}
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={updateValue}
        />
        {
          value && <button type="reset" title={resetTitle || DEFAULT_RESET_TITLE} onClick={() => resetValue()}>
            <Icon name="close" />
          </button>
        }
      </span>
    </>
  );
};
