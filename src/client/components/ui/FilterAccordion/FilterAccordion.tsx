import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/ui/FilterAccordion/FilterAccordion.module.scss';

interface FilterAccordionProps extends React.ComponentPropsWithoutRef<'details'> {
	open?: boolean
}

export function FilterAccordion(props: React.PropsWithChildren<FilterAccordionProps>) {
	const { children, open, className, ...rest } = props;
	return (
		<details className={classNames(styles.details, className)} {...rest} open={open || false}>
			{children}
		</details>
	);
}

export function FilterAccordionTitle(props: React.ComponentPropsWithoutRef<'summary'>) {
	const { children, ...rest } = props;
	return (<summary {...rest}>{children}</summary>
	);
}

export function FilterAccordionContent(props: React.ComponentPropsWithoutRef<'div'>) {
	const { className, children, ...rest } = props;
	return <div className={classNames(styles.detailsContent, className)} {...rest}>{children}</div>;
}

FilterAccordion.Title = FilterAccordionTitle;
FilterAccordion.Content = FilterAccordionContent;
