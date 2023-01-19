import classNames from 'classnames';
import React from 'react';

import styles from './icon.module.scss';
import { SvgProps } from './svgProps.type';

export const CommunityIcon = React.forwardRef<SVGSVGElement, SvgProps>(function CommunityIcon({
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
				d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12.487C2 12.1979 2.12505 11.9229 2.343 11.733L6 8.544V4C6 3.44772 6.44772 3 7 3H21ZM8 9.454L4 12.942V19H7V15H9V19H12V12.942L8 9.454ZM18 15H16V17H18V15ZM18 11H16V13H18V11ZM18 7H16V9H18V7ZM14 7H12V9H14V7Z" />
		</svg>
	);
});
