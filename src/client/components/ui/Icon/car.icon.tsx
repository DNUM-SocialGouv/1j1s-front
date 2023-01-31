import classNames from 'classnames';
import React from 'react';

import styles from './icon.module.scss';
import { SvgProps } from './svgProps.type';

export const CarIcon = React.forwardRef<SVGSVGElement, SvgProps>(function CarIcon({
	color = 'currentColor', className, ...rest
}, ref) {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24"
			className={classNames(className, styles.size)} fill={color}
			xmlns="http://www.w3.org/2000/svg"
			{...rest} ref={ref}>
			<path fillRule="evenodd"
				clipRule="evenodd"
				d="M17.614 4C18.4479 4 19.1943 4.51718 19.487 5.298L22 12V21C22 21.5523 21.5523 22 21 22H20C19.4477 22 19 21.5523 19 21V20H5V21C5 21.5523 4.55228 22 4 22H3C2.44772 22 2 21.5523 2 21V12L4.513 5.298C4.80569 4.51718 5.55212 4 6.386 4H17.614ZM6.5 14C5.67157 14 5 14.6716 5 15.5C5 16.3284 5.67157 17 6.5 17C7.32843 17 8 16.3284 8 15.5C8 14.6716 7.32843 14 6.5 14ZM17.5 14C16.6716 14 16 14.6716 16 15.5C16 16.3284 16.6716 17 17.5 17C18.3284 17 19 16.3284 19 15.5C19 14.6716 18.3284 14 17.5 14ZM17.614 6H6.386L4.136 12H19.864L17.614 6Z" />
		</svg>
	);
});
