import Link from 'next/link';
import React, { MouseEventHandler } from 'react';

import styles from '~/client/components/layouts/Header/Header.module.scss';

interface NavItemProps {
	label: string
	link: string
	isActive: boolean
	onClick?: MouseEventHandler<HTMLAnchorElement>
}

export function NavItem({ className, label, link, isActive, onClick }: NavItemProps & React.HTMLAttributes<HTMLLIElement>) {
  return (
    <li className={className}>
      <Link href={link} prefetch={false}>
	      <a onClick={onClick}>
	        <span className={styles.navItemLabel} aria-current={isActive}>{label}</span>
	      </a>
      </Link>
    </li>
  );
}
