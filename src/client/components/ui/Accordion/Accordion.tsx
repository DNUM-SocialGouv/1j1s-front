import React from 'react';

import styles from '~/client/components/ui/Accordion/Accordion.module.css';

interface AccordionProps {
  title: string
}

export function Accordion({ children, title } : React.PropsWithChildren<AccordionProps>) {
  return (
    <details className={styles.details}>
      <summary className={styles.summary}><b>{title}</b></summary>
      <div className={styles.detailsContent}>{children}</div>
    </details>
  );
}
