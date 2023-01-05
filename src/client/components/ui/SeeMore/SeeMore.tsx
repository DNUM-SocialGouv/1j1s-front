import classNames from 'classnames';
import React, { useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { CommonProps } from '~/client/components/props';
import styles from '~/client/components/ui/SeeMore/SeeMoreComponent.module.scss';

import { Icon } from '../Icon/Icon';


interface SeeMoreProps extends CommonProps {
  overridedClosedLabel?: string
  overridedOpenedLabel?: string
  additionalClosedButtonClassName?: string
  additionalButtonClassName?: string
}

export default function SeeMore({ children, overridedClosedLabel, overridedOpenedLabel, additionalButtonClassName, additionalClosedButtonClassName, className } : React.PropsWithChildren<SeeMoreProps>) {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const divRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const ariaId = uuidv4();

	function toggleSeeMore() {
		toggle(!isOpen);
	}

	function toggle(newValueOpen: boolean) {
		if (isOpen === newValueOpen) return;
		if (!newValueOpen && divRef.current) {
			const divPosition = divRef.current.getBoundingClientRect();
			window.scrollBy({ behavior: 'smooth', top: -divPosition.height });
		}
		setIsOpen(newValueOpen);
		buttonRef.current?.setAttribute('aria-expanded', `${isOpen}`);
	}

	const buttonLabel: string = useMemo(() => {
		if (isOpen) {
			return overridedOpenedLabel || 'Voir moins';
		}
		return overridedClosedLabel || 'Voir plus';
	}, [overridedClosedLabel, overridedOpenedLabel, isOpen]);

	return (
		<>
			<div className={classNames({ [styles.open]: isOpen, [styles.closed]: !isOpen }, className)}
	      ref={divRef}
				id={`section-${ariaId}`}
				role="region"
				aria-labelledby={`seeMore-${ariaId}`}>
				{children}
			</div>
			<button className={classNames(styles.seeMoreButton, additionalButtonClassName, !isOpen && additionalClosedButtonClassName)}
				ref={buttonRef}
				onClick={toggleSeeMore}
				type="button" 
				aria-expanded={isOpen}
				aria-controls={`section-${ariaId}`} 
				id={`seeMore-${ariaId}`}>
				<span className={styles.seeMoreButtonLabel}> {buttonLabel} </span>
				<Icon name={isOpen ? 'angle-up' :'angle-down'}/>
			</button>
		</>
	);
}
