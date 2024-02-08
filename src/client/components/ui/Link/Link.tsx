import classNames from 'classnames';
import LinkNext from 'next/link';
import React, { PropsWithChildren, useMemo } from 'react';

import { Icon } from '~/client/components/ui/Icon/Icon';
import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';
import { getTextFromChildren } from '~/client/utils/getTextFromChildren.util';

import styles from './Link.module.scss';

type ButtonAppearance = 'asPrimaryButton' | 'asSecondaryButton' | 'asTertiaryButton' | 'asQuaternaryButton';

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
	appearance?: ButtonAppearance
	prefetch?: boolean
}

type LinkStyledAsButtonWithIconProps = LinkStyledAsButtonProps & IconProps


export function Link(props: PropsWithChildren<LinkStyledAsButtonProps>) {
	const {
		className,
		appearance,
		children,
		href,
		prefetch = false,
		title,
		...rest
	} = props;

	const appearanceClass = useMemo(() => {
		switch (appearance) {
			case 'asPrimaryButton':
				return styles.primaryButton;
			case 'asSecondaryButton':
				return styles.secondaryButton;
			case 'asTertiaryButton':
				return styles.tertiaryButton;
			case 'asQuaternaryButton':
				return styles.quaternaryButton;
			default:
				return ;
		}
	}, [appearance]);

	const isInternalLink = useIsInternalLink(href);

	function getTitle() {
		if (isInternalLink) {
			return title;
		}
		return title ?? `${getTextFromChildren(children)} - nouvelle fenêtre`;
	}

	return isInternalLink ? (
		<LinkNext href={href} title={getTitle()} prefetch={prefetch} className={classNames(className, appearanceClass)} {...rest}>
			{children}
		</LinkNext>
	) : (
		<a href={href} title={getTitle()} target="_blank" rel="noreferrer" className={classNames(className, appearanceClass)} {...rest}>
			{children}
		</a>
	);
}

export function LinkIcon(props: PropsWithChildren<LinkStyledAsButtonWithIconProps> ) {
	const {
		children,
		className,
		iconPosition,
		icon,
		href,
		...rest
	} = props;
	const isInternalLink = useIsInternalLink(href);

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

	const iconBody = useMemo(() => {
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

	return (<span className={classNames(className, iconClass)} {...rest}>
		{iconBody}
	</span>
	);
}

Link.Icon = LinkIcon;

