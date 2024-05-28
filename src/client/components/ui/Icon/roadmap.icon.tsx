import classNames from 'classnames';
import React from 'react';

import styles from './icon.module.scss';
import { SvgProps } from './svgProps.type';

export const RoadmapIcon = React.forwardRef<SVGSVGElement, SvgProps>(function RoadmapIcon({
	color = 'currentColor', className, ...rest
}, ref) {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24"
			className={classNames(className, styles.size)} fill={color}
			xmlns="http://www.w3.org/2000/svg"
			{...rest} ref={ref}>
			<path d="M16.95 11.9499C17.7971 11.1036 18.4128 10.0539 18.7381 8.90146C19.0634 7.74902 19.0875 6.53235 18.808 5.36795L21.303 4.29795C21.3791 4.26533 21.4621 4.25211 21.5445 4.25949C21.627 4.26686 21.7063 4.29459 21.7754 4.34019C21.8445 4.38579 21.9012 4.44783 21.9404 4.52074C21.9796 4.59366 22.0001 4.67516 22 4.75795V18.9999L15 21.9999L9 18.9999L2.697 21.7009C2.62091 21.7336 2.53792 21.7468 2.45547 21.7394C2.37301 21.732 2.29368 21.7043 2.22459 21.6587C2.1555 21.6131 2.09881 21.5511 2.05961 21.4781C2.02041 21.4052 1.99993 21.3237 2 21.2409V6.99995L5.129 5.65895C4.90884 6.78452 4.96891 7.94698 5.30391 9.04387C5.6389 10.1408 6.23855 11.1384 7.05 11.9489L12 16.8999L16.95 11.9499ZM15.536 10.5359L12 14.0699L8.464 10.5349C7.76487 9.83563 7.2888 8.94471 7.09598 7.97484C6.90316 7.00498 7.00225 5.99971 7.38073 5.08616C7.75921 4.1726 8.40007 3.39179 9.22229 2.84244C10.0445 2.29309 11.0111 1.99988 12 1.99988C12.9889 1.99988 13.9555 2.29309 14.7777 2.84244C15.5999 3.39179 16.2408 4.1726 16.6193 5.08616C16.9977 5.99971 17.0968 7.00498 16.904 7.97484C16.7112 8.94471 16.2351 9.83563 15.536 10.5349V10.5359Z" />
		</svg>
	);
});