import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/ui/Icon/icon.module.scss';
import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function ThumbUpIcon({ color = 'currentColor', className, ...rest }: SvgProps) {
	return (
		<svg width="32" height="32" viewBox="0 0 32 32"
			 fill={color} className={classNames(className, styles.size)} {...rest}>
			<path fillRule="evenodd" clipRule="evenodd" d="M2.66536 12.0002H6.66536V28.0002H2.66536C1.92898 28.0002 1.33203 27.4032 1.33203 26.6668V13.3335C1.33203 12.5971 1.92898 12.0002 2.66536 12.0002ZM9.7227 10.2762L18.256 1.74282C18.4905 1.50766 18.8623 1.48094 19.128 1.68015L20.2654 2.53349C20.9113 3.01838 21.2021 3.84417 21.0027 4.62682L19.4654 10.6668H27.9987C29.4715 10.6668 30.6654 11.8607 30.6654 13.3335V16.1388C30.6657 16.4873 30.5978 16.8325 30.4654 17.1548L26.3387 27.1748C26.1328 27.6744 25.6457 28.0002 25.1054 28.0002H10.6654C9.92899 28.0002 9.33203 27.4032 9.33203 26.6668V11.2188C9.33203 10.8652 9.47263 10.5261 9.7227 10.2762Z"/>
		</svg>
	);
}
