import classNames from 'classnames';

import styles from '~/client/components/ui/Icon/icon.module.scss';

import { SvgProps } from './svgProps.type';

export function PlayCircleIcon({ color = 'currentColor', className, ...rest }: SvgProps) {
	return (
		<svg width="18" height="18" className={classNames(className, styles.size)} viewBox="0 0 18 18" fill={color} xmlns="http://www.w3.org/2000/svg" {...rest}>
			<path fillRule="evenodd" clipRule="evenodd" d="M9.0013 17.3334C4.3988 17.3334 0.667969 13.6026 0.667969 9.00008C0.667969 4.39758 4.3988 0.666748 9.0013 0.666748C13.6038 0.666748 17.3346 4.39758 17.3346 9.00008C17.3346 13.6026 13.6038 17.3334 9.0013 17.3334ZM7.85297 6.01258C7.75078 5.9444 7.61938 5.93795 7.51101 5.9958C7.40264 6.05364 7.33486 6.16641 7.33464 6.28925V11.7109C7.33486 11.8338 7.40264 11.9465 7.51101 12.0044C7.61938 12.0622 7.75078 12.0558 7.85297 11.9876L11.9188 9.27758C12.0117 9.21578 12.0675 9.11163 12.0675 9.00008C12.0675 8.88853 12.0117 8.78438 11.9188 8.72258L7.85297 6.01258Z"/>
		</svg>
	);
}
