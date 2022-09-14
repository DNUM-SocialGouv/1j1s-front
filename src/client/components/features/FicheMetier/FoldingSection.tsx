import classNames from 'classnames';
import React from 'react';

import { Icon } from '~/client/components/ui/Icon/Icon';

import styles from './consulter-fiche-metier.module.scss';

interface FoldingSectionProps {
	innerHtmlContent: string
	isOpen?: boolean
	title: string
}

export function FoldingSection({ className, innerHtmlContent, isOpen = false, title }: FoldingSectionProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section className={classNames(className, styles.section)}>
      <details className={styles.disclosureSection} open={isOpen}>
        <summary className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{title}</h2>
          <Icon className={styles.sectionDisclosureIcon} name="angle-down" />
        </summary>
        <div className={styles.sectionContent} dangerouslySetInnerHTML={{ __html: innerHtmlContent }}/>
      </details>
    </section>
  );
}
