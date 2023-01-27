import classNames from 'classnames';
import React from 'react';

import styles from './icon.module.scss';
import { SvgProps } from './svgProps.type';

export const TVIcon = React.forwardRef<SVGSVGElement, SvgProps>(function TVIcon({
	color = 'currentColor', className, ...rest
}, ref) {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24"
			className={classNames(className, styles.size)} fill={color}
			xmlns="http://www.w3.org/2000/svg"
			{...rest} ref={ref}>
			<path fillRule="evenodd"
				clipRule="evenodd"
				d="M16.536 1.04999L17.95 2.46399L15.414 4.99999H21.008C21.556 4.99999 22 5.44499 22 5.99999V20C22 20.552 21.545 21 21.008 21H2.99204C2.72771 20.9995 2.47449 20.8937 2.28834 20.706C2.10218 20.5184 1.99844 20.2643 2.00002 20V5.99999C2.00002 5.44799 2.45504 4.99999 2.99204 4.99999H8.58604L6.05004 2.46399L7.46404 1.04999L11.414 4.99999H12.586L16.536 1.04999ZM20 6.99999H4.00004V19H20V6.99999Z" />
		</svg>
	);
});
