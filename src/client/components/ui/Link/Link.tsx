import classNames from 'classnames';
import LinkNext from 'next/link';
import React, { useMemo } from 'react';

import { Icon } from '~/client/components/ui/Icon/Icon';
import styles from '~/client/components/ui/Link/Link.module.scss';
import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';

type ButtonAppearance = 'default' | 'asPrimaryButton' | 'asSecondaryButton' | 'asBackButton';

interface LinkProps extends React.ComponentPropsWithoutRef<'a'> {
	appearance?: ButtonAppearance
	href: string
	prefetch?: boolean
}

export function Link(props: LinkProps) {
	const {
		appearance = 'default',
		className,
		children,
		href,
		prefetch = false,
		...rest
	} = props;
	const isInternalLink = useIsInternalLink(href);
	const hasIcon = useMemo(() => appearance === 'asPrimaryButton' || appearance === 'asSecondaryButton', [appearance]);
	const hasBackIcon = useMemo(() => appearance === 'asBackButton', [appearance]);
	const appearanceClass = useMemo(() => {
		switch (appearance) {
			case 'asPrimaryButton':
				return styles.primaryButton;
			case 'asSecondaryButton':
				return styles.secondaryButton;
			case 'asBackButton':
				return styles.backButton;
			default:
				return styles.link;
		}
	}, [appearance]);

	return isInternalLink ? (
		<LinkNext href={href} prefetch={prefetch} className={classNames(className, appearanceClass)} {...rest}>
			{hasBackIcon && <Icon name="angle-left"/>}
			{children}
			{hasIcon && <Icon name="arrow-right"/>}
		</LinkNext>
	) : (
		<a href={href} target="_blank" rel="noreferrer" className={classNames(className, appearanceClass)} {...rest}>
			{children}
			{hasIcon && <Icon name="external-redirection"/>}
		</a>
	);
}
