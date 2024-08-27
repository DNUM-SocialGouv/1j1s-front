import classNames from 'classnames';
import React, { useState } from 'react';

import { Icon } from '~/client/components/ui/Icon/Icon';

import styles from './TipDisclosure.module.scss';

interface TipDisclosureProps {
	disclosureAriaLabel: string
	tipId: string
}

export function TipDisclosure(props: React.PropsWithChildren<TipDisclosureProps>) {
	const { children, disclosureAriaLabel, tipId } = props;
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
				onClick={() => setIsOpen(!isOpen)}
			>
				<Icon name="information" className={styles.icon} />
			</button>
			<span className={classNames(styles.tip)} id={tipId} hidden={!isOpen}>
				<button className={styles.buttonClose} type="button" aria-label='fermer' onClick={() => setIsOpen(false)}>
					<Icon name="close" />
				</button>
				<span className={styles.description}>
					{children}
				</span>
			</span>
		</span>
	);
}
