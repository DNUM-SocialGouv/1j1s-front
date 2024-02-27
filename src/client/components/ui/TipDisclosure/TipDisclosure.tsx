import classNames from 'classnames';
import React, { useState } from 'react';

import { Icon, IconName } from '~/client/components/ui/Icon/Icon';

import styles from './TipDisclosure.module.scss';

interface TipDisclosureProps {
	icon: IconName  //GMO 01-06-2023 Voir si ça doit être une prop ou être `information` tout le temps
	ariaLabel: string //GMO 01-06-2023 TODO renommer car ariaLabel du bouton et pas du tooltip?
	tipId: string
}

/* NOTE : Ce "Tooltip" n'a plus le role tooltip car le composant ne correspond pas à ce qui est décrit par :
	https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role
	Notamment :
	"The tooltip is not the appropriate role for the more information "i" icon, ⓘ. A tooltip is directly associated with the owning element. The ⓘ isn't 'described by' detailed information; the tool or control is."
	 ou
	 "Because the tooltip itself never receives focus and is not in the tabbing order, a tooltip can not contain interactive elements like links, inputs, or buttons."
 */
export function TipDisclosure(props: React.PropsWithChildren<TipDisclosureProps>) {
	const { children, icon, ariaLabel, tipId } = props;
	const [isOpen, setIsOpen] = useState(false);

	return (
		<span
			className={styles.position}
		>
			<button
				className={styles.tipDisclosure}
				aria-label={`${ariaLabel} (${isOpen ? 'Fermer' : 'Ouvrir'})`}
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
