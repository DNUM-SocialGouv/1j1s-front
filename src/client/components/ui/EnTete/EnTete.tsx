import classNames from 'classnames';
import React from 'react';

import { HtmlHeadingTag } from '~/client/components/props';
import styles from '~/client/components/ui/EnTete/EnTete.module.scss';

interface EnTeteProps extends React.ComponentPropsWithoutRef<'div'>{
	heading: string
	headingLevel?: HtmlHeadingTag
	description?: string
}

export function EnTete({ className, heading, headingLevel = 'h2', description, ...rest }: EnTeteProps) {
	return (
		<div className={classNames(styles.entête, className)} {...rest}>
			{React.createElement(headingLevel, { className: styles.entête__Title }, heading)}
			{description && <p className={styles.entête__Description}>{description}</p>}
		</div>
	);
}
