import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/ui/FilterAccordion/FilterAccordion.module.scss';

interface FilterAccordionProps extends React.ComponentPropsWithoutRef<'details'> {
	title: string
	open?: boolean
}

export function FilterAccordion(props: React.PropsWithChildren<FilterAccordionProps>) {
	const { children, title, open, className, ...rest } = props;
	return (
		<details className={classNames(styles.details, className)} {...rest} open={open || false}>
			<summary>{title}</summary>
			<div className={styles.detailsContent}>{children}</div>
		</details>
	);
}
