import classNames from 'classnames';
import React from 'react';

import { Accordion } from '~/client/components/ui/Accordion/Accordion';

import styles from './ConsulterFicheMétier.module.scss';

interface FoldingSectionProps extends Pick<React.HTMLAttributes<unknown>, 'className'> {
	innerHtmlContent: string
	isOpen?: boolean
	title: string
}

export function FoldingSection({ className, innerHtmlContent, isOpen = false, title }: FoldingSectionProps) {
	return (
		<section className={classNames(className, styles.section)}>
			<Accordion open={isOpen} summary={title} summaryAs="h2">
				<div className={styles.foldingSectionContent} dangerouslySetInnerHTML={{ __html: innerHtmlContent }} />
			</Accordion>
		</section>
	);
}
