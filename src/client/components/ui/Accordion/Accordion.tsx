import classNames from 'classnames';
import React from 'react';

import { CommonProps, HtmlHeadingTag } from '~/client/components/props';
import styles from '~/client/components/ui/Accordion/Accordion.module.scss';

interface AccordionProps extends CommonProps {
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
		summaryAs,
		...rest
	} = props;

	const Summary = React.useCallback(({ ...rest }) => {
		const content = React.createElement(summaryAs || React.Fragment, {}, summary);
		return React.createElement('summary', { ...rest }, content);
	}, [summary, summaryAs]);

	return (
		<details className={classNames(styles.details, className)} open={open ?? false} { ...rest}>
			<Summary className={styles.summary} />
			{children}
		</details>
	);
}
