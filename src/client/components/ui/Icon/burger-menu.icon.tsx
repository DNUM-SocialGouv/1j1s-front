import classNames from 'classnames';

import styles from '~/client/components/ui/Icon/icon.module.scss';
import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function BurgerMenuIcon({ color = 'currentColor', className, ...rest }: SvgProps) {
	return (
		<svg width="24" height="24" className={classNames(className, styles.size)} viewBox="0 0 25 24" fill={color} xmlns="http://www.w3.org/2000/svg" {...rest}>
			<path fillRule="evenodd" clipRule="evenodd" d="M3.5 3.99976H21.5V5.99976H3.5V3.99976ZM3.5 10.9998H21.5V12.9998H3.5V10.9998ZM3.5 17.9998H21.5V19.9998H3.5V17.9998Z" />
		</svg>
	);
}
