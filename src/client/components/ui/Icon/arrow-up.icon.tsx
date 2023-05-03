import classNames from 'classnames';

import styles from '~/client/components/ui/Icon/icon.module.scss';
import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function ArrowUpIcon({ color = 'currentColor', className, ...rest }: SvgProps) {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" className={classNames(className, styles.size)} fill={color} xmlns="http://www.w3.org/2000/svg" {...rest}>
			<path fillRule="evenodd" clipRule="evenodd" d="M8.99968 3.828V16H6.99968V3.828L1.63568 9.192L0.22168 7.778L7.99968 0L15.7777 7.778L14.3637 9.192L8.99968 3.828Z"/>
		</svg>
	);
}
