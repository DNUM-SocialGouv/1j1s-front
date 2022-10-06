import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/features/Entreprendre/AccordionHero.module.scss';
import { CommonProps } from '~/client/components/props';

interface AccordionProps extends CommonProps {
  title: string
  open?: boolean
}

export function AccordionHero({ children, title, open, className, ...rest } : React.PropsWithChildren<AccordionProps>) {
  return (
    <details className={classNames(styles.details, className)} {...rest} open={open || false}>
      <summary><span>{title}</span></summary>
      <div className={styles.detailsContent}>{children}</div>
    </details>
  );
}
