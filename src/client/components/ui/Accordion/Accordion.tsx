import classNames from 'classnames';
import React from 'react';

import { HtmlHeadingTag } from '~/client/components/props';
import styles from '~/client/components/ui/Accordion/Accordion.module.scss';

interface AccordionProps extends React.ComponentPropsWithoutRef<'details'> {
  open?: boolean
  summary: string
  summaryAs?: HtmlHeadingTag
}

export function Accordion(props: React.PropsWithChildren<AccordionProps>) {
	const {
		children,
		className,
		open,
		summary,
		summaryAs: SummaryHeading,
		...rest
	} = props;

	return (
		<details className={classNames(styles.details, className)} open={open ?? false} { ...rest}>
			<summary className={styles.summary}>
				{SummaryHeading ? <SummaryHeading>{summary}</SummaryHeading> : summary}
			</summary>
			{children}
		</details>
	);
}
