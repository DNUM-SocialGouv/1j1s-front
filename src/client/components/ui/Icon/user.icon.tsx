import classNames from 'classnames';
import React from 'react';

import styles from './icon.module.scss';
import { SvgProps } from './svgProps.type';

export const UserIcon = React.forwardRef<SVGSVGElement, SvgProps>(function UserIcon({
	color = 'currentColor', className, ...rest
}, ref) {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24"
			className={classNames(className, styles.size)} fill={color}
			xmlns="http://www.w3.org/2000/svg"
			{...rest} ref={ref}>
			<path d="M6 7C6 10.315 8.685 13 12 13C15.315 13 18 10.315 18 7C18 3.685 15.315 1 12 1C8.685 1 6 3.685 6 7Z" />
			<path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" />
		</svg>
	);
});
