import React, { useCallback, useEffect, useRef, useState } from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { Icon, IconName } from '~/client/components/ui/Icon/Icon';
import styles from '~/client/components/ui/Tooltip/Tooltip.module.scss';
import useBreakpoint from '~/client/hooks/useBreakpoint';

interface TooltipProps {
    icon: IconName,
	ariaLabel: string,
	ariaDescribedBy: string
}

export function Tooltip(props: React.PropsWithChildren<TooltipProps>) {
	const { children, icon, ariaLabel, ariaDescribedBy } = props;
	const { isSmallScreen } = useBreakpoint();
	const tooltipRef = useRef<HTMLDivElement>(null);
	const [isClose, setIsClose] = useState(true);
	const closeTooltipOnClickOutside = useCallback((event: MouseEvent) => {
		if (!(tooltipRef.current)?.contains(event.target as Node)) {
			setIsClose(true);
		}
	}, []);

	const closeTooltipOnEscape = useCallback((event: KeyboardEvent) => {
		if (event.key === KeyBoard.ESCAPE && !isClose) {
			setIsClose(true);
		}
	}, [isClose]);

	useEffect(function setEventListenerOnMount() {
		document.addEventListener('mousedown', closeTooltipOnClickOutside);
		document.addEventListener('keyup', closeTooltipOnEscape);
		return () => {
			document.removeEventListener('mousedown', closeTooltipOnClickOutside);
			document.removeEventListener('keyup', closeTooltipOnEscape);
		};
	}, [closeTooltipOnClickOutside, closeTooltipOnEscape]);


	if (isSmallScreen) return (
		<span ref={tooltipRef} className={styles.tooltipContainer}>
			<button aria-label={ariaLabel} aria-describedby={ariaDescribedBy}
				onClick={() => setIsClose(!isClose)}>
				<Icon name={icon} className={styles.icon}/>
			</button>
			{!isClose && <div className={styles.tooltip} role="tooltip" id={ariaDescribedBy}>
				<button className={styles.button} aria-label='fermer' onClick={() => setIsClose(!isClose)}>
					<Icon name="close" className={styles.close}/>
				</button>
				{children}
			</div>}
		</span>
	);

	return <div ref={tooltipRef} className={styles.tooltipContainer}>
		<span tabIndex={0} aria-describedby="informations-supplementaires">
			<Icon name={icon} className={styles.icon}/>
			<div className={styles.tooltip} role="tooltip" id="informations-supplementaires">
				{children}
			</div>
		</span>
	</div>;
}
