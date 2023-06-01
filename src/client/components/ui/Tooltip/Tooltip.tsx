import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { Icon, IconName } from '~/client/components/ui/Icon/Icon';
import styles from '~/client/components/ui/Tooltip/Tooltip.module.scss';

interface TooltipProps {
	icon: IconName  //GMO 01-06-2023 Voir si ça doit être une prop ou être `information` tout le temps
	ariaLabel: string //GMO 01-06-2023 TODO renommer car ariaLabel du bouton et pas du tooltip?
	ariaDescribedBy: string //GMO 01-06-2023 - TODO renommer en "id" (car id du role=tooltip) et laisser obligatoire
}

export function Tooltip(props: React.PropsWithChildren<TooltipProps>) {
	const { children, icon, ariaLabel, ariaDescribedBy } = props;
	const tooltipRef = useRef<HTMLButtonElement>(null);
	const [isOpen, setIsOpen] = useState(false);


	const closeTooltipOnClickOutside = useCallback((event: MouseEvent) => {
		if (!(tooltipRef.current)?.contains(event.target as Node)) {
			setIsOpen(false);
		}
	}, []);

	const closeTooltipOnEscape = useCallback((event: KeyboardEvent) => {
		if ((event.key === KeyBoard.ESCAPE || event.key === KeyBoard.IE_ESCAPE) && isOpen) {
			setIsOpen(false);
		}
	}, [isOpen]);

	useEffect(function setEventListenerOnMount() {
		document.addEventListener('mousedown', closeTooltipOnClickOutside);
		document.addEventListener('keyup', closeTooltipOnEscape);
		return () => {
			document.removeEventListener('mousedown', closeTooltipOnClickOutside);
			document.removeEventListener('keyup', closeTooltipOnEscape);
		};
	}, [closeTooltipOnClickOutside, closeTooltipOnEscape]);

	const closeTooltipOnBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
		if (!event.currentTarget.contains(event.relatedTarget)) {
			setIsOpen(false);
		}
	}, []);

	return (
		<div
			onMouseEnter={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}
			onFocus={() => setIsOpen(true)}
			onBlur={closeTooltipOnBlur}
			className={styles.position}
		>
			<button
				ref={tooltipRef}
				className={styles.tooltipContainer}
				aria-label={ariaLabel}
				aria-describedby={ariaDescribedBy}
				/*
				GMO 01-06-2023 - TODO déplacer / supprimer ce aria-describedby qui doit être sur l'élément explicité
				par le tooltip et pas sur le bouton qui permet de l'afficher (voir https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role)
				*/
				aria-expanded={isOpen}
				type="button"
				onClick={() => setIsOpen(!isOpen)}>
				<Icon name={icon} className={styles.icon}/>
			</button>
			<div className={classNames(styles.tooltip)} role="tooltip" id={ariaDescribedBy} hidden={!isOpen}>
				<button className={styles.buttonClose} type="button" aria-label='fermer' onClick={() => setIsOpen(!isOpen)}>
					<Icon name="close" />
				</button>
				<p className={styles.description}>
					{children}
				</p>
			</div>
		</div>
	);
}
