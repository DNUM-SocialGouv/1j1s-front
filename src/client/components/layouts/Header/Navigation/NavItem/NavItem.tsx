import React, { MouseEventHandler, ReactNode } from 'react';

import { Link } from '~/client/components/ui/Link/Link';
import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';

import styles from '../Nav.module.scss';

interface NavItemProps {
	label: string | ReactNode
	link: string
	isActive: boolean
	onClick?: MouseEventHandler<HTMLAnchorElement>
}

export function NavItem({
	className,
	label,
	link,
	isActive,
	onClick,
}: NavItemProps & React.HTMLAttributes<HTMLLIElement>) {
	const isInternalLink = useIsInternalLink(link);

	return (
		<li className={className}>
			<Link href={link} prefetch={false} className={styles.navItemLabel} aria-current={isActive} onClick={onClick}>
				{label}
				{!isInternalLink && <Link.Icon className={styles.externalRedirectionIcon} />}
			</Link>
		</li>
	);
}
