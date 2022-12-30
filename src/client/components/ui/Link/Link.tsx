import classNames from 'classnames';
import LinkNext from 'next/link';
import React, { useMemo } from 'react';

import { Icon } from '~/client/components/ui/Icon/Icon';
import styles from '~/client/components/ui/Link/Link.module.scss';
import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';

type ButtonAppearance = 'default' | 'asPrimaryButton' | 'asSecondaryButton' | 'asBackButton';

interface LinkProps extends React.AnchorHTMLAttributes<unknown> {
  appearance?: ButtonAppearance
  href: string
  prefetch?: boolean
}

export function Link({ appearance = 'default', className, children, href, prefetch = false, ...rest }: LinkProps & React.HTMLAttributes<HTMLLinkElement>) {
	const isInternalLink = useIsInternalLink(href);
	const hasIcon = useMemo(() => appearance === 'asPrimaryButton' || appearance === 'asSecondaryButton', [appearance]);
	const hasBackIcon = useMemo(() => appearance === 'asBackButton', [appearance]);
	const appearanceClass = useMemo(() => {
		switch (appearance) {
			case 'asPrimaryButton': return styles.primaryButton;
			case 'asSecondaryButton': return styles.secondaryButton;
			case 'asBackButton': return styles.backButton;
			default: return styles.link;
		}
	}, [appearance]);

	// Must use legacyBehavior because of [this issue](https://github.com/vercel/next.js/issues/41962)
	return isInternalLink ? (
		<LinkNext legacyBehavior href={href} prefetch={prefetch}>
			<a className={classNames(className, appearanceClass)} {...rest}>
				{hasBackIcon && <Icon name="angle-left" />}
				{children}
				{hasIcon && <Icon name="arrow-right" />}
			</a>
		</LinkNext>
	) : (
		<a href={href} target="_blank" rel="noreferrer" className={classNames(className, appearanceClass)} {...rest}>
			{children}
			{hasIcon && <Icon name="external-redirection" />}
		</a>
	);
}
