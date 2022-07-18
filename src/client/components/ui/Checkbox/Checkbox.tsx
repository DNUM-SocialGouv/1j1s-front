import classNames from 'classnames';
import React, {
  useEffect,
  useRef,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from '~/client/components/ui/Checkbox/Checkbox.module.scss';

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

  return (
    <div className={classNames(styles.checkbox, className ? className : '')}>
      <input
        type="checkbox"
        {...rest}
        id={checkboxId.current}
      />
      <label className={styles.label} htmlFor={checkboxId.current}>{label}</label>
    </div>
  );
}
