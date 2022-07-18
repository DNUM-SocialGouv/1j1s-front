import React from 'react';

import styles from '~/client/components/ui/RadioButton/RadioButton.module.scss';

interface RadioButtonProps {
  id: string
  label: string
  name: string
  value: string
}

export function RadioButton(props : RadioButtonProps) {
  return (
    <div className={styles.radioWrapper}>
      <input type="radio" id={props.id} name={props.name} value={props.value}/>
      <label htmlFor={props.id}>
        {props.label}
      </label>
      <span className={styles.radioButton}></span>
    </div>
  );
}

