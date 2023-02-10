import classNames from 'classnames';
import React, { useMemo } from 'react';

import styles from './button-component.module.scss';

export interface ButtonComponentProps extends React.ComponentPropsWithoutRef<'button'> {
	appearance?: 'primary' | 'secondary' | 'tertiary'
	icon?: React.ReactNode
	iconPosition?: 'top' | 'left' | 'right'
	label: string
}

export function ButtonComponent({ appearance = 'primary', className, icon, iconPosition, label, ...rest }: ButtonComponentProps) {
	const appearanceClass = useMemo(() => {
		switch (appearance) {
			case 'primary': return styles.buttonPrimary;
			case 'secondary': return styles.buttonSecondary;
			case 'tertiary': return styles.buttonTertiary;
		}
	}, [appearance]);
	const iconPositionClass = useMemo(() => {
		switch (iconPosition) {
			case 'top': return styles.buttonWithTopIcon;
			case 'left': return styles.buttonWithLeftIcon;
			case 'right': return styles.buttonWithRightIcon;
			default: return styles.buttonNoIcon;
		}
	}, [iconPosition]);
	const buttonStyles = useMemo(() => classNames(className, styles.button, appearanceClass, iconPositionClass),
		[appearanceClass, className, iconPositionClass]);
	const buttonBody = useMemo(() => {
		switch (iconPosition) {
			case 'top':
			case 'left': return (<>{icon}<span className={styles.buttonLabel}>{label}</span></>);
			case 'right': return (<><span className={styles.buttonLabel}>{label}</span>{icon}</>);
			default: return (<span className={styles.buttonLabel}>{label}</span>);
		}
	}, [icon, iconPosition, label]);

	return (
		<button className={buttonStyles} {...rest}>
	    {buttonBody}
		</button>
	);
}
