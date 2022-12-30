import classNames from 'classnames';
import React from 'react';

import { CommonProps } from '~/client/components/props';
import styles from '~/client/components/ui/FilterAccordion/FilterAccordion.module.scss';

interface FilterAccordionProps extends CommonProps {
  title: string
  open?: boolean
}

export function FilterAccordion({ children, title, open, className, ...rest } : React.PropsWithChildren<FilterAccordionProps>) {
	return (
		<details className={classNames(styles.details, className)} {...rest} open={open || false}>
			<summary>{title}</summary>
			<div className={styles.detailsContent}>{children}</div>
		</details>
	);
}
