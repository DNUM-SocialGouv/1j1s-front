import React, { MouseEventHandler, ReactNode } from 'react';

import { Link } from '~/client/components/ui/Link/Link';

import styles from './Nav.module.scss';

interface NavItemProps {
	label: string | ReactNode
	link: string
	isActive: boolean
	onClick?: MouseEventHandler<HTMLAnchorElement>
}

export function NavItem({ className, label, link, isActive, onClick }: NavItemProps & React.HTMLAttributes<HTMLLIElement>) {
	return (
		<li className={className} onClick={onClick}>
			<Link href={link} prefetch={false} className={styles.navItemLabel} aria-current={isActive}>
				{label}
			</Link>
		</li>
	);
}
