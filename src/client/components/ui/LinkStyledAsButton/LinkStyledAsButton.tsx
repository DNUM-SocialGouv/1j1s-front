import classNames from 'classnames';
import LinkNext from 'next/link';
import React, { PropsWithChildren, useMemo } from 'react';

import { Icon } from '~/client/components/ui/Icon/Icon';
import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';

import styles from './LinkStyledAsButton.module.scss';

type ButtonAppearance = 'asPrimaryButton' | 'asSecondaryButton' | 'asTertiaryButton' | 'asQuaternayButton';

type IconPosition = 'top' | 'left' | 'right';

type IconProps = {
	icon: React.ReactNode;
	iconPosition: IconPosition;
} | {
	icon?: never;
	iconPosition?: never;
}

interface LinkStyledAsButtonProps extends React.ComponentPropsWithoutRef<'a'> {
	href: string
	appearance: ButtonAppearance
	prefetch?: boolean
}

type LinkStyledAsButtonWithIconProps = LinkStyledAsButtonProps & IconProps

export function LinkStyledAsButton(props: PropsWithChildren<LinkStyledAsButtonWithIconProps> ) {
	const {
		appearance,
		children,
		className,
		iconPosition,
		icon,
		href,
		prefetch = false,
		...rest
	} = props;
	const isInternalLink = useIsInternalLink(href);

	const appearanceClass = useMemo(() => {
		switch (appearance) {
			case 'asPrimaryButton':
				return styles.primaryButton;
			case 'asSecondaryButton':
				return styles.secondaryButton;
			case 'asTertiaryButton':
				return styles.tertiaryButton;
			case 'asQuaternayButton':
				return styles.quaternaryButton;
		}
	}, [appearance]);

	const iconClass = useMemo(() => {
		switch (iconPosition) {
			case 'top':
				return styles.linkWithTopIcon;
			case 'left':
				return styles.linkWithLeftIcon;
			case 'right':
				return styles.linkWithRightIcon;
		}
	}, [iconPosition]);

	const linkStyledAsButtonWithIconBody = useMemo(() => {
		switch (iconPosition) {
			case 'top':
			case 'left':
				return <>{icon}<span className={styles.linkLabel}>{children}</span></>;
			case 'right':
				return <><span className={styles.linkLabel}>{children}</span>{icon}</>;
			default:
				return <>
					<span className={styles.linkLabel}>{children}</span>
					{	isInternalLink ? <Icon name="arrow-right"/> : <Icon name="external-redirection"/>}
				</>;
		}
	}, [icon, iconPosition, children, isInternalLink]);

	return isInternalLink ? (
		<LinkNext href={href} prefetch={prefetch} className={classNames(className, appearanceClass, iconClass)} {...rest}>
			{linkStyledAsButtonWithIconBody}
		</LinkNext>
	) : (
		<a href={href} target="_blank" rel="noreferrer" className={classNames(className, appearanceClass, iconClass)} {...rest}>
			{linkStyledAsButtonWithIconBody}
		</a>
	);
}
