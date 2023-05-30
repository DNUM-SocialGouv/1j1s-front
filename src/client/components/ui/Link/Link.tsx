import classNames from 'classnames';
import LinkNext from 'next/link';
import React from 'react';

import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';


interface LinkProps extends React.ComponentPropsWithoutRef<'a'> {
	href: string
	prefetch?: boolean
}

export function Link(props: LinkProps) {
	const {
		className,
		children,
		href,
		prefetch = false,
		...rest
	} = props;
	const isInternalLink = useIsInternalLink(href);

	return isInternalLink ? (
		<LinkNext href={href} prefetch={prefetch} className={classNames(className)} {...rest}>
			{children}
		</LinkNext>
	) : (
		<a href={href} target="_blank" rel="noreferrer" className={classNames(className)} {...rest}>
			{children}
		</a>
	);
}
