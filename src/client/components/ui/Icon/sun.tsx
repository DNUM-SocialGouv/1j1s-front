import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/ui/Icon/icon.module.scss';
import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function SunIcon({ color = 'currentColor', className, ...rest }: SvgProps) {
	return (
		<svg width="32"
			height="32"
			viewBox="0 0 32 32"
			 fill={color}
			className={classNames(className, styles.size)}
			{...rest}>
			<path fillRule="evenodd" clipRule="evenodd" d="M17.332 26.6668V30.6668H14.6654V26.6668H17.332ZM24.484 22.6002L27.312 25.4282L25.4267 27.3135L22.5987 24.4855L24.484 22.6002ZM7.51336 22.6002L9.3987 24.4855L6.5707 27.3135L4.68536 25.4282L7.51336 22.6002ZM15.9987 8.00016C20.417 8.00016 23.9987 11.5819 23.9987 16.0002C23.9987 20.4184 20.417 24.0002 15.9987 24.0002C11.5804 24.0002 7.9987 20.4184 7.9987 16.0002C7.9987 11.5819 11.5804 8.00016 15.9987 8.00016ZM30.6654 14.6668V17.3335H26.6654V14.6668H30.6654ZM5.33203 14.6668V17.3335H1.33203V14.6668H5.33203ZM6.5707 4.68683L9.3987 7.51483L7.51336 9.40016L4.68536 6.5735V6.57216L6.5707 4.68683ZM25.4267 4.6855L27.312 6.57216L24.484 9.40016L22.5987 7.51483L25.4267 4.68683V4.6855ZM17.332 1.3335V5.3335H14.6654V1.3335H17.332Z" />
		</svg>
	);
}
