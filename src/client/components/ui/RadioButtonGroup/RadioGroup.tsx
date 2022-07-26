import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/ui/RadioButtonGroup/RadioButtonGroup.module.scss';

interface RadioButtonGroupProps extends React.InputHTMLAttributes<unknown> {
  legend: string
}

export function RadioGroup({ children, legend, className, ...rest }: React.PropsWithChildren<RadioButtonGroupProps>){
  return(
    <fieldset className={classNames(styles.radioButtonGroup, className)} {...rest}>
      <legend>{legend}</legend>
      {children}
    </fieldset>
  );
}
