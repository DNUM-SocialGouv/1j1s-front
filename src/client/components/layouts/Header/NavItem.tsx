import React, { MouseEventHandler } from 'react';

import styles from '~/client/components/layouts/Header/Header.module.scss';
import { LinkDeprecated } from '~/client/components/ui/LinkDeprecated/LinkDeprecated';

interface NavItemProps {
	label: string
	link: string
	isActive: boolean
	onClick?: MouseEventHandler<HTMLAnchorElement>
}

export function NavItem({ className, label, link, isActive, onClick }: NavItemProps & React.HTMLAttributes<HTMLLIElement>) {
	return (
		<li className={className} onClick={onClick}>
			<LinkDeprecated href={link} prefetch={false} className={styles.navItemLabel} aria-current={isActive}>
				{label}
			</LinkDeprecated>
		</li>
	);
}
