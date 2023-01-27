import classNames from 'classnames';
import React from 'react';

import styles from './icon.module.scss';
import { SvgProps } from './svgProps.type';

export const RestaurantIcon = React.forwardRef<SVGSVGElement, SvgProps>(function RestaurantIcon({
	color = 'currentColor', className, ...rest
}, ref) {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24"
			className={classNames(className, styles.size)} fill={color}
			xmlns="http://www.w3.org/2000/svg"
			{...rest} ref={ref}>
			<path fillRule="evenodd"
				clipRule="evenodd"
				d="M21 2V22H19V14H16V7C16 4.23858 18.2386 2 21 2ZM9 13.9V22H7V13.9C4.67209 13.424 3.00029 11.3761 3 9V3H5V10H7V3H9V10H11V3H13V9C12.9997 11.3761 11.3279 13.424 9 13.9Z" />
		</svg>
	);
});
