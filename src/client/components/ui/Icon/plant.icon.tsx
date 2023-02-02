import classNames from 'classnames';
import React from 'react';

import styles from './icon.module.scss';
import { SvgProps } from './svgProps.type';

export const PlantIcon = React.forwardRef<SVGSVGElement, SvgProps>(function PlantIcon({
	color = 'currentColor', className, ...rest
}, ref) {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24"
			className={classNames(className, styles.size)} fill={color}
			xmlns="http://www.w3.org/2000/svg"
			{...rest} ref={ref}>
			<path fillRule="evenodd"
				clipRule="evenodd"
				d="M21 3V5C21 8.866 17.866 12 14 12H13V13H18V20C18 21.105 17.105 22 16 22H8C6.895 22 6 21.105 6 20V13H11V10C11 6.134 14.134 3 18 3H21ZM5.5 2C8.029 2 10.265 3.251 11.624 5.169C10.604 6.51 10 8.185 10 10V11H9.5C5.358 11 2 7.642 2 3.5V2H5.5Z" />
		</svg>
	);
});
