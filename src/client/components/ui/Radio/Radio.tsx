import { uuid4 } from '@sentry/utils';
import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';

import styles from '~/client/components/ui/Radio/Radio.module.scss';

interface RadioProps extends React.InputHTMLAttributes<unknown>{
  id?: string
  label: string
}

export function Radio({ id, label, className, ...rest } : RadioProps) {
  const radioButtonId = useRef(id || uuid4());

  useEffect(() => {
    radioButtonId.current = id || uuid4();
  }, [id]);

  return (
    <div className={classNames(styles.radioButton, className)} tabIndex={0}>
      <input
        type="radio"
        {...rest}
        id={radioButtonId.current}
        tabIndex={-1}
      />
      <label className={styles.label} htmlFor={radioButtonId.current}>
        {label}
      </label>
    </div>
  );
}
