import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/ui/FilterAccordion/FilterAccordion.module.scss';

interface FilterAccordionProps extends React.ComponentPropsWithoutRef<'details'> {
	open?: boolean
}

export function FilterAccordion(props: React.PropsWithChildren<FilterAccordionProps>) {
	const { open, className, ...rest } = props;
	return (
		<details className={classNames(styles.details, className)} {...rest} open={open || false} />
	);
}

export function FilterAccordionTitle(props: React.ComponentPropsWithoutRef<'summary'>) {
	return <summary {...props} />;
}

export function FilterAccordionContent(props: React.ComponentPropsWithoutRef<'div'>) {
	const { className, ...rest } = props;
	return <div className={classNames(styles.detailsContent, className)} {...rest} />;
}

FilterAccordion.Title = FilterAccordionTitle;
FilterAccordion.Content = FilterAccordionContent;
