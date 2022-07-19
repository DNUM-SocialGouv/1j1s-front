import { uuid4 } from '@sentry/utils';
import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';

import styles from '~/client/components/ui/RadioButton/RadioButton.module.scss';

interface RadioButtonProps extends React.InputHTMLAttributes<unknown>{
  id?: string
  label: string
  name: string
  value: string
}

export function RadioButton({ id, label, name, value, className, ...rest } : RadioButtonProps) {
  const radioButtonId = useRef(id || uuid4());

  useEffect(() => {
    radioButtonId.current = id || uuid4();
  }, [id]);

  return (
    <div className={classNames(styles.radioButton, className)}>
      <input
        type="radio"
        name={name}
        value={value}
        id={radioButtonId.current}
        {...rest}
      />
      <label className={styles.label} htmlFor={radioButtonId.current}>
        {label}
      </label>
    </div>
  );
}

