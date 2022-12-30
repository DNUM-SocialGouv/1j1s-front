import React, { MouseEventHandler } from 'react';

import styles from '~/client/components/layouts/Header/Header.module.scss';
import { Icon } from '~/client/components/ui/Icon/Icon';

interface EmbeddedNavItemProps {
  label: string
  onClick: MouseEventHandler
  isActive: boolean
}
export function EmbeddedNavItem ({ label, onClick, isActive }: EmbeddedNavItemProps) {
	return (
		<li className={styles.embeddedNavItem} aria-current={isActive}>
			<button
				className={styles.embeddedNavItemButton}
				onClick={onClick}
			>
				<span>{label}</span>
				<Icon name="angle-right" />
			</button>
		</li>
	);
}
