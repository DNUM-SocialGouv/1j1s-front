import classNames from 'classnames';
import LinkNext from 'next/link';
import React from 'react';

import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';
import { getTextFromChildren } from '~/client/utils/getTextFromChildren.util';


interface LinkProps extends React.ComponentPropsWithoutRef<'a'> {
	href: string
	prefetch?: boolean
	title?: string
}

export function Link(props: LinkProps) {
	const {
		className,
		children,
		href,
		prefetch = false,
		title,
		...rest
	} = props;
	const isInternalLink = useIsInternalLink(href);

	function getTitle() {
		if (isInternalLink) {
			return title;
		}
		return title || `${getTextFromChildren(children)} - nouvelle fenêtre`;
	}

	return isInternalLink ? (
		<LinkNext href={href} title={getTitle()} prefetch={prefetch} className={classNames(className)} {...rest}>
			{children}
		</LinkNext>
	) : (
		<a href={href} title={getTitle()} target="_blank" rel="noreferrer" className={classNames(className)} {...rest}>
			{children}
		</a>
	);
}
