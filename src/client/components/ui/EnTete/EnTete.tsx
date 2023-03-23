import classNames from 'classnames';
import React from 'react';

import { HtmlHeadingTag } from '~/client/components/props';
import styles from '~/client/components/ui/EnTete/EnTete.module.scss';

interface EnTeteProps extends React.ComponentPropsWithoutRef<'div'>{
  heading: string
  headingLevel?: HtmlHeadingTag
	description?: string
}

export function EnTete({ className, heading, headingLevel, description, ...rest }: EnTeteProps) {

	function Heading({ children, className }: { headingLevel?: HtmlHeadingTag } & React.HTMLAttributes<HTMLTitleElement>) {
		return React.createElement(headingLevel || 'h2', { className: className }, children);
	}
	return (
		<div className={classNames(styles.enteteSection, className)} {...rest}>
			<Heading className={styles.entête__Title}>{heading}</Heading>
			{description && <p className={styles.entête__Description}>{description}</p>}
		</div>
	);
}
