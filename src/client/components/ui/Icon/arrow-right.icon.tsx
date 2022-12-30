import classNames from 'classnames';

import styles from '~/client/components/ui/Icon/icon.module.scss';
import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function ArrowRightIcon({ color = 'currentColor', className, ...rest }: SvgProps) {
	return (
		<svg width="24" height="24" className={classNames(className, styles.size)} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" {...rest}>
			<path fillRule="evenodd" clipRule="evenodd" d="M16.172 10.9999L10.808 5.63592L12.222 4.22192L20 11.9999L12.222 19.7779L10.808 18.3639L16.172 12.9999H4V10.9999H16.172Z"/>
		</svg>

	);
}
