import classNames from 'classnames';
import React, {
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from '~/client/components/ui/Checkbox/Checkbox.module.scss';
import { KeyBoard } from '~/client/utils/keyboard.util'

interface CheckboxProps extends React.InputHTMLAttributes<unknown> {
  id?: string
  label: string
  onKeyDown: (e) => void
}

export function Checkbox({ id, label, onKeyDown, className, ...rest  }: CheckboxProps) {
  const checkboxId = useRef(id || uuidv4());

  useEffect(() => {
    checkboxId.current = id || uuidv4();
  }, [id]);

  return (
      <div className={classNames(styles.checkbox, className)} tabIndex={0} onKeyDown={onKeyDown}>
      <input
        type="checkbox"
        {...rest}
        id={checkboxId.current}
        tabIndex="-1"
      />
      <label className={styles.label} htmlFor={checkboxId.current}>{label}</label>
    </div>
  );
}
