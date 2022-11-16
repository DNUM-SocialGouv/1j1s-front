import React, { MouseEventHandler } from 'react';

import styles from '~/client/components/layouts/Header/Header.module.scss';
import { Link } from '~/client/components/ui/Link/Link';

interface NavItemProps {
	label: string
	link: string
	isActive: boolean
	onClick?: MouseEventHandler<HTMLAnchorElement>
}

export function NavItem({ className, label, link, isActive, onClick }: NavItemProps & React.HTMLAttributes<HTMLLIElement>) {
  return (
    <li className={className} onClick={onClick}>
      <Link href={link} prefetch={false}>
		  <Link href={link} prefetch={false}>
			  <span className={styles.navItemLabel} aria-current={isActive}>{label}</span>
		  </Link>
	  </Link>
    </li>
  );
}
