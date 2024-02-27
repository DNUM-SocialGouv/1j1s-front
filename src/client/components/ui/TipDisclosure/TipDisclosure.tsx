import classNames from 'classnames';
import React, { useState } from 'react';

import { Icon, IconName } from '~/client/components/ui/Icon/Icon';

import styles from './TipDisclosure.module.scss';

interface TipDisclosureProps {
	icon: IconName  //GMO 01-06-2023 Voir si ça doit être une prop ou être `information` tout le temps
	disclosureAriaLabel: string
	tipId: string
}

export function TipDisclosure(props: React.PropsWithChildren<TipDisclosureProps>) {
	const { children, icon, disclosureAriaLabel, tipId } = props;
	const [isOpen, setIsOpen] = useState(false);

	return (
		<span
			className={styles.position}
		>
			<button
				className={styles.tipDisclosure}
				aria-label={`${disclosureAriaLabel} (${isOpen ? 'Fermer' : 'Ouvrir'})`}
				aria-expanded={isOpen}
				aria-controls={isOpen ? tipId : undefined}
				type="button"
				onClick={() => setIsOpen(!isOpen)}>
				<Icon name={icon} className={styles.icon}/>
			</button>
			<span className={classNames(styles.tip)} id={tipId} hidden={!isOpen}>
				<button className={styles.buttonClose} type="button" aria-label='fermer' onClick={() => setIsOpen(!isOpen)}>
					<Icon name="close" />
				</button>
				<span className={styles.description}>
					{children}
				</span>
			</span>
		</span>
	);
}
