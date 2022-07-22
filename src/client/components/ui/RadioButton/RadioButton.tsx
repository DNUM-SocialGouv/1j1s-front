import { uuid4 } from '@sentry/utils';
import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';

import styles from '~/client/components/ui/RadioButton/RadioButton.module.scss';

interface RadioButtonProps extends React.InputHTMLAttributes<unknown>{
  id?: string
  label: string
}

export function RadioButton({ id, label, className, ...rest } : RadioButtonProps) {
  const radioButtonId = useRef(id || uuid4());

  useEffect(() => {
    radioButtonId.current = id || uuid4();
  }, [id]);

  return (
    <div className={classNames(styles.radioButton, className)}>
      <input
        type="radio"
        {...rest}
        id={radioButtonId.current}
      />
      <label className={styles.label} htmlFor={radioButtonId.current}>
        {label}
      </label>
    </div>
  );
}
