import classNames from 'classnames';
import React from 'react';

import styles from './icon.module.scss';
import { SvgProps } from './svgProps.type';

export const ExitIcon = React.forwardRef<SVGSVGElement, SvgProps>(function ExitIcon({
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
			ref={ref}>
			<path fillRule="evenodd"
				clipRule="evenodd"
				d="M5 22C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21V3C4 2.73478 4.10536 2.48043 4.29289 2.29289C4.48043 2.10536 4.73478 2 5 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5ZM15 16L20 12L15 8V11H9V13H15V16Z" />
		</svg>
	);
});
