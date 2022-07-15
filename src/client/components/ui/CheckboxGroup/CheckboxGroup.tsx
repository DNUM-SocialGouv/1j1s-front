import React from 'react';

import styles from '~/client/components/ui/CheckboxGroup/CheckboxGroup.module.scss';

interface  CheckboxGroupProps extends React.InputHTMLAttributes<unknown> {
  legend: string
}

export function CheckboxGroup(props: React.PropsWithChildren<CheckboxGroupProps>) {
  const { children, legend } = props;
  return (
    <fieldset className={styles.checkboxGroup}>
      <legend>{legend}</legend>
      {children}
    </fieldset>
  );
}
