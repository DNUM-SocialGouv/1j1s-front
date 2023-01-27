import classNames from 'classnames';
import React from 'react';

import styles from './icon.module.scss';
import { SvgProps } from './svgProps.type';

export const LockIcon = React.forwardRef<SVGSVGElement, SvgProps>(function LockIcon({
	color = 'currentColor', className, ...rest
}, ref) {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24"
			className={classNames(className, styles.size)} fill={color}
			xmlns="http://www.w3.org/2000/svg"
			{...rest} ref={ref}>
			<path fillRule="evenodd"
				clipRule="evenodd"
				d="M12 1C15.3137 1 18 3.68629 18 7V8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1ZM9 17H7V19H9V17ZM9 14H7V16H9V14ZM9 11H7V13H9V11ZM12 3C9.79086 3 8 4.79086 8 7V8H16V7C16 4.79086 14.2091 3 12 3Z" />
		</svg>
	);
});
