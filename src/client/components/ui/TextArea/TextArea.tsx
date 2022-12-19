import classNames from 'classnames';

import { CommonProps } from '~/client/components/props';
import styles from '~/client/components/ui/TextArea/TextArea.module.scss';

interface TextAreaProps extends CommonProps{
  id: string,
  placeholder: string
  label: string
  name: string
}

export function TextArea({ id, placeholder, label, name, className }: TextAreaProps) {
  return (
    <div className={classNames(styles.textArea, className)}>
      <label className={styles.textAreaLabel} htmlFor={id}>{label}</label>
      <textarea
        id={id}
        className={styles.textAreaField}
        placeholder={placeholder}
        name={name}
        rows={4}
      />
    </div>
  );
}
