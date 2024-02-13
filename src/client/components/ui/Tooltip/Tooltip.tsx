import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { Icon, IconName } from '~/client/components/ui/Icon/Icon';
import styles from '~/client/components/ui/Tooltip/Tooltip.module.scss';

interface TooltipProps {
	icon: IconName  //GMO 01-06-2023 Voir si ça doit être une prop ou être `information` tout le temps
	ariaLabel: string //GMO 01-06-2023 TODO renommer car ariaLabel du bouton et pas du tooltip?
	tooltipId: string
}

/* NOTE : Ce "Tooltip" n'a plus le role tooltip car le composant ne correspond pas à ce qui est décrit par :
	https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role
	Notamment :
	"The tooltip is not the appropriate role for the more information "i" icon, ⓘ. A tooltip is directly associated with the owning element. The ⓘ isn't 'described by' detailed information; the tool or control is."
	 ou
	 "Because the tooltip itself never receives focus and is not in the tabbing order, a tooltip can not contain interactive elements like links, inputs, or buttons."
 */
export function Tooltip(props: React.PropsWithChildren<TooltipProps>) {
	const { children, icon, ariaLabel, tooltipId } = props;
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
		<span
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
				aria-expanded={isOpen}
				aria-controls={isOpen ? tooltipId : undefined}
				type="button"
				onClick={() => setIsOpen(!isOpen)}>
				<Icon name={icon} className={styles.icon}/>
			</button>
			<span className={classNames(styles.tooltip)} id={tooltipId} hidden={!isOpen}>
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
