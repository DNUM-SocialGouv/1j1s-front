import classNames from 'classnames';

import styles from '~/client/components/ui/Icon/icon.module.scss';
import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function ArrowLeftIcon({ color = 'currentColor', className, ...rest }: SvgProps) {
	return (
		<svg width="14" height="14" className={classNames(className, styles.size)} viewBox="0 0 14 14" fill={color} xmlns="http://www.w3.org/2000/svg" {...rest}>
			<path fillRule="evenodd" clipRule="evenodd" d="M3.52203 6.1664H13.6654V7.83307H3.52203L7.99203 12.3031L6.8137 13.4814L0.332031 6.99973L6.8137 0.518066L7.99203 1.6964L3.52203 6.1664Z"/>
		</svg>
	);
}
