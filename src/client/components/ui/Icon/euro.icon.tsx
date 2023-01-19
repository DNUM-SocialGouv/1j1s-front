import classNames from 'classnames';
import React from 'react';

import styles from './icon.module.scss';
import { SvgProps } from './svgProps.type';

export const EuroIcon = React.forwardRef<SVGSVGElement, SvgProps>(function EuroIcon({
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
				d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2ZM11.1031 7.22259C9.42634 7.77019 8.2241 9.24698 8.028 11H7V13H8.027C8.22277 14.7535 9.4252 16.2308 11.1024 16.7784C12.7796 17.3261 14.6222 16.8431 15.815 15.543L14.114 14.409C13.4398 14.9792 12.5149 15.1515 11.6806 14.8623C10.8463 14.573 10.2265 13.8652 10.05 13L15 13.001V11.001H10.05V11C10.2262 10.1347 10.8459 9.42652 11.6803 9.13706C12.5146 8.84759 13.4397 9.01977 14.114 9.59L15.815 8.457C14.6221 7.1576 12.78 6.675 11.1031 7.22259Z" />
		</svg>
	);
});
