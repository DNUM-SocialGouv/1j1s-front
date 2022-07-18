import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/ui/CheckboxGroup/CheckboxGroup.module.scss';

interface CheckboxGroupProps extends React.InputHTMLAttributes<unknown> {
  legend: string
}

export function CheckboxGroup({ children, legend, className, ...rest }: React.PropsWithChildren<CheckboxGroupProps>) {
  const _classNames = classNames(styles.checkboxGroup, className);
  return (
    <fieldset className={_classNames} {...rest}>
      <legend>{legend}</legend>
      {children}
    </fieldset>
  );
}
