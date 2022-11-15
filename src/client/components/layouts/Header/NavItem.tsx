import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';

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
    <li className={className}>
      <Link href={link} prefetch={false}>
		  {isActive ?
			  <a onClick={onClick} className={classNames({ [styles.lienActive]: isActive })}>
				  <span className={styles.navItemLabel} aria-current={isActive}>{label}</span>
			  </a>
			  :
			  <span onClick={onClick} className={styles.navItemLabel}>{label}</span>
		  }
	  </Link>
    </li>
  );
}
