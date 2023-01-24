import classNames from 'classnames';
import React from 'react';

import styles from './icon.module.scss';
import { SvgProps } from './svgProps.type';

export const SuitcaseIcon = React.forwardRef<SVGSVGElement, SvgProps>(function SuitcaseIcon({
	color = 'currentColor', className, ...rest
}, ref) {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24"
			className={classNames(className, styles.size)} fill={color}
			xmlns="http://www.w3.org/2000/svg"
			{...rest} ref={ref}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M15 2C15.552 2 16 2.448 16 3V5H19C20.105 5 21 5.895 21 7V20C21 21.105 20.105 22 19 22H18V23H16V22H8V23H6V22H5C3.895 22 3 21.105 3 20V7C3 5.895 3.895 5 5 5H8V3C8 2.448 8.448 2 9 2H15ZM10 9H8V18H10V9ZM16 9H14V18H16V9ZM14 4H10V5H14V4Z" />
		</svg>
	);
});
