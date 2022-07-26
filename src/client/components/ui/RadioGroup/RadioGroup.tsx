import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/ui/RadioGroup/RadioGroup.module.scss';

interface RadioGroupProps extends React.InputHTMLAttributes<unknown> {
  legend: string
}

export function RadioGroup({ children, legend, className, ...rest }: React.PropsWithChildren<RadioGroupProps>){
  return(
    <fieldset className={classNames(styles.radioButtonGroup, className)} {...rest}>
      <legend>{legend}</legend>
      {children}
    </fieldset>
  );
}
