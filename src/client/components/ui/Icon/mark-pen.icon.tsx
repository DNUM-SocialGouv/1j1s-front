import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/ui/Icon/icon.module.scss';
import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export const MarkPenIcon = React.forwardRef<SVGSVGElement, SvgProps>(function MarkPen({
	color = 'currentColor', className, ...rest
}, ref) {
	return (
		<svg width="45" height="42" viewBox="0 0 45 42"
		     className={classNames(className, styles.size)} fill={color} 
		     xmlns="http://www.w3.org/2000/svg"
		     {...rest} ref={ref}>
			<path fillRule="evenodd"
				clipRule="evenodd"
				d="M6.27794 32.595L12.4053 38.7245L9.3416 41.7881L0.148438 38.7245L6.27577 32.595H6.27794ZM31.5564 1.18479L43.8133 13.4416C44.6591 14.2877 44.6591 15.6592 43.8133 16.5053L26.9588 33.3598L22.3654 34.8916L19.2996 37.9553C18.4535 38.8011 17.082 38.8011 16.2359 37.9553L7.04277 28.7621C6.19694 27.916 6.19694 26.5445 7.04277 25.6985L10.1064 22.6348L11.6383 18.0393L28.4928 1.18479C29.3389 0.338958 30.7104 0.338958 31.5564 1.18479ZM30.0246 5.78245L15.4256 20.3793L13.8938 24.9748L11.6404 27.2303L17.7678 33.3598L20.0211 31.1043L24.6188 29.5725L39.2156 14.9735L30.0246 5.78245ZM30.0246 11.9098L33.0883 14.9735L22.3633 25.6985L19.2996 22.6348L30.0246 11.9098Z"/>
		</svg>
	);
});
