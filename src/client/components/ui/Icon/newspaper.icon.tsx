import classNames from 'classnames';

import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function NewspaperIcon({ color = 'currentColor', className, ...rest }: SvgProps) {
	return (
		<svg className={classNames(className)}
			width="52"
			height="52"
			viewBox="0 0 52 52"
			fill={color}
				 xmlns="http://www.w3.org/2000/svg"
			{...rest}>
			<path fillRule="evenodd"
				clipRule="evenodd"
				d="M30.8 39.6V4.4H4.4V37.4C4.4 38.6151 5.38498 39.6 6.6 39.6H30.8ZM37.4 44H6.6C2.95493 44 0 41.0452 0 37.4V2.2C0 0.984973 0.984973 0 2.2 0H33C34.2151 0 35.2 0.984973 35.2 2.2V17.6H44V37.4C44 41.0452 41.0452 44 37.4 44ZM35.2 22V37.4C35.2 38.6151 36.1849 39.6 37.4 39.6C38.6151 39.6 39.6 38.6151 39.6 37.4V22H35.2ZM8.8 8.8H22V22H8.8V8.8ZM13.2 13.2V17.6H17.6V13.2H13.2ZM8.8 24.2H26.4V28.6H8.8V24.2ZM8.8 30.8H26.4V35.2H8.8V30.8Z"
				fill="#566BB1" />
		</svg>
	);
}
