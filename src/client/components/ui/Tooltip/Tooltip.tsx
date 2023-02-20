import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { Icon, IconName } from '~/client/components/ui/Icon/Icon';
import styles from '~/client/components/ui/Tooltip/Tooltip.module.scss';

interface TooltipProps {
	icon: IconName
	ariaLabel: string
	ariaDescribedBy: string
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
