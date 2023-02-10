import classNames from 'classnames';
import React from 'react';

import { HtmlHeadingTag } from '~/client/components/props';
import styles from '~/client/components/ui/EnTeteSection/EnTeteSection.module.scss';

interface EnTeteSectionProps extends React.ComponentPropsWithoutRef<'div'>{
  heading: string
  headingLevel?: HtmlHeadingTag
}

export function EnTeteSection({ className, heading, headingLevel, ...rest }: EnTeteSectionProps) {

	function Heading({ children, className }: { headingLevel?: HtmlHeadingTag } & React.HTMLAttributes<HTMLTitleElement>) {
		return React.createElement(headingLevel || 'h2', { className: className }, children);
	}
	return (
		<div className={classNames(styles.enteteSection, className)} {...rest}>
			<Heading className={styles.enteteSection__Title}>{heading}</Heading>
		</div>
	);
}
