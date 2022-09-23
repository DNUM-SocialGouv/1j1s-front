import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

import styles from '~/client/components/layouts/Header/Header.module.scss';

interface NavItemProps {
	label: string
	link: string
	isActive: boolean
}

export function NavItem({ className, label, link, isActive }: NavItemProps & React.HTMLAttributes<HTMLLIElement>) {
  return (
    <li className={classNames(isActive ? styles.navItemIsActive : '', className)}>
      <Link href={link}>
	      <a>
	        <span className={styles.navItemLabel} aria-current={isActive}>{label}</span>
	      </a>
      </Link>
    </li>
  );
}
