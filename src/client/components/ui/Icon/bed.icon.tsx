import classNames from 'classnames';
import React from 'react';

import styles from './icon.module.scss';
import { SvgProps } from './svgProps.type';

export const BedIcon = React.forwardRef<SVGSVGElement, SvgProps>(function BedIcon({
	color = 'currentColor', className, ...rest
}, ref) {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24"
			className={classNames(className, styles.size)} fill={color}
			xmlns="http://www.w3.org/2000/svg"
			{...rest} ref={ref}>
			<rect width="24" height="24" fill="url(#pattern-bed)"/>
			<defs>
				<pattern id="pattern-bed" patternContentUnits="objectBoundingBox" width="1" height="1">
					<use xlinkHref="#image0_9246_7390" transform="scale(0.0166667)"/>
				</pattern>
				<image id="image0_9246_7390" width="60" height="60" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAABTElEQVR4nO2YvU7DMBSFvbFHPsdD1zwMiL8XKU+BkHgpaDfYeAMYKANsUPYglyCkqk0cYeraOZ90t1b3fj6O3cYYIYQQQgghhBBCGJLnAN4AvJI8K35JSL6QbNpamNLhr+yqTOlQwoVDJVw4VMKFQyW8/RcZyTmAz7ZmzrnT0IWMVW3vewAXdV0fmP9ImOR1xwBXuxReq4eqqiZRhfmdbGdj59xJIuGV9KCk2S88D9hmtwmFff9pTOFlQNOPxMJ3uxZ+TynsZ4wmDGAWsMI3iYXD/+Wx54v+6ulrZq09LkbY46+ejnQvzQayFvb4q8efxu0zvfTbeFOyxQgXAyVcOBx7wsy0gt+rcw+GjViLsQk3El4ndSJKmNrSjZ5h6tBqdEpvY/A9tmf8+R42mTF4fgBPPx8G8GgyY/D81tojks++AByazMh9fiGEGDdfStvhN/FkP4MAAAAASUVORK5CYII="/>
			</defs>
		</svg>
	);
});
