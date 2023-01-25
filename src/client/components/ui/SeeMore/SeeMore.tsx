import classNames from 'classnames';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { CommonProps } from '~/client/components/props';
import styles from '~/client/components/ui/SeeMore/SeeMore.module.scss';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';

const SEE_MORE_LABEL_DEFAULT = 'Voir plus';
const SEE_LESS_LABEL_DEFAULT = 'Voir moins';

export interface SeeMoreProps extends CommonProps {
  seeMoreLabel?: string
  seeLessLabel?: string
	seeMoreAriaLabel: string
	seeLessAriaLabel: string
}

export default function SeeMore(props: React.PropsWithChildren<SeeMoreProps>) {
	const {
		children,
		seeMoreLabel = SEE_MORE_LABEL_DEFAULT,
		seeLessLabel = SEE_LESS_LABEL_DEFAULT,
		seeMoreAriaLabel,
		seeLessAriaLabel,
		className,
	} = props;
	const buttonRef = useRef<HTMLButtonElement>(null);
	const divRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const ariaId = useRef(uuidv4());

	const toggle = useCallback(() => {
		if (isOpen && divRef.current) {
			const divPosition = divRef.current.getBoundingClientRect();
			window.scrollBy({ behavior: 'smooth', top: -divPosition.height });
		}
		setIsOpen(!isOpen);
		buttonRef.current?.setAttribute('aria-expanded', `${isOpen}`);
	}, [isOpen]);

	const buttonLabel = useMemo(() => {
		return isOpen ? seeLessLabel : seeMoreLabel;
	}, [seeMoreLabel, seeLessLabel, isOpen]);

	const buttonAriaLabel = useMemo(() => {
		return isOpen ? seeLessAriaLabel : seeMoreAriaLabel;
	}, [isOpen, seeLessAriaLabel, seeMoreAriaLabel]);

	return (
		<>
			<div className={classNames({ [styles.open]: isOpen, [styles.closed]: !isOpen })}
	      ref={divRef}
				id={`section-${ariaId.current}`}>
				{children}
			</div>
			<button className={classNames(styles.seeMoreButton, className)}
				ref={buttonRef}
				onClick={toggle}
				type="button" 
				aria-expanded={isOpen}
				aria-controls={`section-${ariaId.current}`}
				aria-label={buttonAriaLabel}>
				<TextIcon className={styles.seeMoreButtonLabel} icon={isOpen ? 'angle-up' :'angle-down'}>{buttonLabel}</TextIcon>
			</button>
		</>
	);
}
