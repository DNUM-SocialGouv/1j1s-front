import classNames from 'classnames';
import React from 'react';

import { CommonProps } from '~/client/components/props';
import styles from '~/client/components/ui/Accordion/Accordion.module.scss';

interface AccordionProps extends CommonProps {
  title: string
}

export function Accordion({ children, title, className, ...rest } : React.PropsWithChildren<AccordionProps>) {
  return (
    <details className={classNames(styles.details, className)} {...rest}>
      <summary>{title}</summary>
      <div className={styles.detailsContent}>{children}</div>
    </details>
  );
}
