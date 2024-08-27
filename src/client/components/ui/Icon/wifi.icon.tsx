import classNames from 'classnames';
import React from 'react';

import styles from './icon.module.scss';
import { SvgProps } from './svgProps.type';

export const WifiIcon = React.forwardRef<SVGSVGElement, SvgProps>(function WifiIcon({
	color = 'currentColor', className, ...rest
}, ref) {
	return (
		<svg width="24"
			height="24"
			viewBox="0 0 24 24"
			className={classNames(className, styles.size)}
			fill={color}
			xmlns="http://www.w3.org/2000/svg"
			{...rest}
			ref={ref}
		>
			<path fillRule="evenodd"
				clipRule="evenodd"
				d="M11.9999 13C13.9039 13 15.6529 13.665 17.0269 14.776L15.1419 17.11C14.2531 16.3902 13.1437 15.9983 11.9999 16C10.8562 15.9983 9.74674 16.3902 8.85794 17.11L6.97194 14.777L7.22746 14.5792C8.60382 13.5533 10.2776 12.9976 11.9999 13ZM11.9999 8.00002C15.0939 8.00002 17.9359 9.08104 20.1689 10.886L18.2839 13.22C16.5064 11.7802 14.2874 10.9963 11.9999 11C9.61994 11 7.43394 11.832 5.71594 13.22L3.83094 10.887L4.13554 10.6477C6.39255 8.92832 9.15547 7.99577 11.9999 8.00002ZM11.9999 3.00002C16.2849 3.00002 20.2199 4.49704 23.3099 6.99704L21.4249 9.33004C18.7589 7.17057 15.4308 5.99469 11.9999 6.00004C8.42994 6.00004 5.14994 7.24804 2.57494 9.33004L0.689941 6.99704C3.88903 4.40536 7.88279 2.99395 11.9999 3.00002ZM10.1149 18.667C10.648 18.2348 11.3136 17.9992 11.9999 18C12.7139 18 13.3699 18.25 13.8849 18.666L11.9999 21L10.1149 18.666V18.667Z"
			/>
		</svg>
	);
});
