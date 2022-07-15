import React, {
  useEffect,
  useRef,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from '~/client/components/ui/Checkbox/Checkbox.module.scss';
import { KeyBoard } from '~/client/utils/keyboard.util';

interface CheckboxProps extends React.InputHTMLAttributes<unknown> {
  id?: string
  label: string
  className?: string
}

export function Checkbox({ id, label, className, ...rest  }: CheckboxProps) {
  const checkboxId = useRef(id || uuidv4());

  useEffect(() => {
    checkboxId.current = id || uuidv4();
  }, [id]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KeyBoard.ENTER) {
      event.preventDefault();
    }
  };

  return (
    <div className={[styles.checkbox, className ? className : ''].join(' ')}>
      <input
        type="checkbox"
        id={checkboxId.current}
        onKeyDown={handleKeyDown}
        {...rest}/>
      <label className={styles.label} htmlFor={checkboxId.current}>{label}</label>
    </div>
  );
}
