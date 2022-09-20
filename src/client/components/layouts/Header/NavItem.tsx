import classNames from 'classnames';
import Link from 'next/link';
import React, { useMemo } from 'react';

import styles from '~/client/components/layouts/Header/Header.module.scss';

interface NavItemProps {
	label: string
	link: string
	path: string
}

export function NavItem({ className, label, link, path }: NavItemProps & React.HTMLAttributes<HTMLLIElement>) {
  const isActive = useMemo(() => (path === link), [link, path]);

  return (
    <li className={classNames(isActive ? styles.navItemIsActive : '', className)}>
      <Link href={link}>
	      <a aria-current={isActive}>
	        <span className={styles.navItemLabel}>{label}</span>
	      </a>
      </Link>
    </li>
  );
}
