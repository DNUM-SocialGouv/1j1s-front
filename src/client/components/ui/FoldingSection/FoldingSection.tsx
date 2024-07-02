import classNames from 'classnames';
import React, { ComponentPropsWithoutRef } from 'react';

import { Accordion } from '~/client/components/ui/Accordion/Accordion';

import styles from './FoldingSection.module.scss';

type FoldingSectionProps = ComponentPropsWithoutRef<typeof Accordion>;

export function FoldingSection({ className, open = false, summary, children, ...rest }: FoldingSectionProps) {
	return (
		<section className={classNames(className, styles.section)}>
			<Accordion open={open} summary={summary} summaryAs="h2" {...rest}>
				<div className={styles.foldingSectionContent}>
					{children}
				</div>
			</Accordion>
		</section>
	);
}
