import classNames from 'classnames';
import React from 'react';

import styles from './icon.module.scss';
import { SvgProps } from './svgProps.type';

export const BikeIcon = React.forwardRef<SVGSVGElement, SvgProps>(function BikeIcon({
	color = 'currentColor', className, ...rest
}, ref) {
	return (
		<svg width="22" height="18" viewBox="0 0 22 18"
			className={classNames(className, styles.size)} fill={color}
			xmlns="http://www.w3.org/2000/svg"
			{...rest} ref={ref}>
			<path fillRule="evenodd"
				clipRule="evenodd"
				d="M4 10C6.20914 10 8 11.7909 8 14C8 16.2091 6.20914 18 4 18C1.79086 18 0 16.2091 0 14C0 11.7909 1.79086 10 4 10ZM17 8C19.7614 8 22 10.2386 22 13C22 15.7614 19.7614 18 17 18C14.2386 18 12 15.7614 12 13C12 10.2386 14.2386 8 17 8ZM4 13C3.44772 13 3 13.4477 3 14C3 14.5523 3.44772 15 4 15C4.55228 15 5 14.5523 5 14C5 13.4477 4.55228 13 4 13ZM17 12C16.4477 12 16 12.4477 16 13C16 13.5523 16.4477 14 17 14C17.5523 14 18 13.5523 18 13C18 12.4477 17.5523 12 17 12ZM14.978 1.70336e-06C15.4387 -0.0101634 15.8468 0.295851 15.966 0.741002L17.519 6.537L15.587 7.054L15.331 6.098L4.5 9H3V4H1V2H7V4H5V6.795L14.813 4.166L14.233 2H11V1.70336e-06H14.978Z" />
		</svg>
	);
});
