import classNames from 'classnames';
import React from 'react';

import styles from './icon.module.scss';
import { SvgProps } from './svgProps.type';

export const IronIcon = React.forwardRef<SVGSVGElement, SvgProps>(function IronIcon({
	color = 'currentColor', className, ...rest
}, ref) {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24"
			className={classNames(className, styles.size)} fill={color}
			xmlns="http://www.w3.org/2000/svg"
			{...rest} ref={ref}>
			<rect width="24" height="24" fill="url(#pattern-iron)"/>
			<defs>
				<pattern id="pattern-iron" patternContentUnits="objectBoundingBox" width="1" height="1">
					<use xlinkHref="#image0_9246_7423" transform="scale(0.0166667)"/>
				</pattern>
				<image id="image0_9246_7423" width="60" height="60" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAACZ0lEQVR4nO2aPWgUQRiGPw1GsFlvb953d/G0kGtcRAvtFGv/wM4iSMBKFKwstNNOhYiFGMXaQrCwSIiNnSgoIppSNEFRISBaCKJIPFmzAUkyl8ve/swt3wNvtdzN9+zMDt/NnoiiKIqiKIriOHEcD5O8SvIzyU4fmQcwR/IVyRvGmMMisl5cg+SVPkW75Q3JE+ISJD8VKPwvACY8z2uICwD4UrRwKv0aQOiC8LUyhFPpZ8meUbXzhkQawI+SpMfEBTzP2wzgDMkXPRY/T/IJyXPNZnNvFEWboigyJI8BeNRF+BfJ7eISURRtI3mK5H0A75LZT1fAWwD3AJwkGXT7DgBn05uykvi41BGSFy2zPCciQ1I32u32RgAfLNL7pI4AGLMIX5A6EgTBUVszInXE87yGZfP66mSvnQcAplea5SAIdkodITluWdanpY6QHLEI362sqDAMYYw5DuA2gKfp7+PvBbeZ70uVjON4GMAogOck/5TRSy9N0tWVJXo+h1OOPDJSqCyA3SRfOiC6mJtFua4DcInkbwck/3+Op4uQHQJwp2o5S+ZbrZafdwP/oIeBJ33f3+L7fovkVAHXrTHGHMlNGMCtXgZNCl38TKPR2Jr39VVyOS/Z0V4HrVj4cd+yYRjuWOM51VRSdFrswwKuWwPgZ/Lo9SUMYKLPzaTUANifWdYYc6BqgQzC2Q8EsNALdwYsk1lnd48DxWfJt0wHAgCuO1B81uxaszAX3th1BjG1PRBQFGU5yX8qAMxWvfHksHHNGmMOyWrY3uEMaD6q8FKSZQBgpgZLegbAwWWCiqIoiqIoihTDX6V0M2UABqlkAAAAAElFTkSuQmCC"/>
			</defs>
		</svg>
	);
});
