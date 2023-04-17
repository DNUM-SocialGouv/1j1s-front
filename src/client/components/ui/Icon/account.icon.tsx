import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/ui/Icon/icon.module.scss';
import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function AccountIcon({ color = 'currentColor', className, ...rest }: SvgProps) {
	return (
		<svg width="28" height="30" viewBox="0 0 28 30"
			 fill={color} className={classNames(className, styles.size)} {...rest}>
			<path fillRule="evenodd" clipRule="evenodd" d="M14.0013 0.666504C21.3613 0.666504 27.3346 6.63984 27.3346 13.9998C27.3346 20.3252 22.9213 25.6265 17.0093 26.9918L14.0013 29.9998L10.9933 26.9918C5.0813 25.6265 0.667969 20.3252 0.667969 13.9998C0.667969 6.63984 6.6413 0.666504 14.0013 0.666504ZM14.2146 15.3332C11.1769 15.3286 8.25132 16.4803 6.03197 18.5545C7.9893 21.4745 10.928 23.3332 14.2146 23.3332C17.5 23.3332 20.44 21.4758 22.396 18.5545C20.177 16.4806 17.2519 15.3289 14.2146 15.3332ZM14.0013 4.6665C11.7922 4.6665 10.0013 6.45737 10.0013 8.6665C10.0013 10.8756 11.7922 12.6665 14.0013 12.6665C16.2104 12.6665 18.0013 10.8756 18.0013 8.6665C18.0013 6.45737 16.2104 4.6665 14.0013 4.6665Z"/>
		</svg>
	);
}
