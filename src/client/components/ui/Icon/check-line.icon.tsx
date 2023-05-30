import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/ui/Icon/icon.module.scss';

import { SvgProps } from './svgProps.type';

export const CheckLineIcon = React.forwardRef<SVGSVGElement, SvgProps>(function CheckLine({
	color = 'currentColor', className, ...rest
}, ref) {
	return (
		<svg width="18" height="13" viewBox="0 0 18 13"  className={classNames(className, styles.size)}  fill={color} {...rest} ref={ref} xmlns="http://www.w3.org/2000/svg">
			<path fillRule="evenodd" clipRule="evenodd" d="M7.00072 10.172L16.1927 0.979004L17.6077 2.393L7.00072 13L0.636719 6.636L2.05072 5.222L7.00072 10.172Z"/>
		</svg>
	);
});
