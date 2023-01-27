import classNames from 'classnames';
import React from 'react';

import styles from './icon.module.scss';
import { SvgProps } from './svgProps.type';

export const TemperatureIcon = React.forwardRef<SVGSVGElement, SvgProps>(function TemperatureIcon({
	color = 'currentColor', className, ...rest
}, ref) {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24"
			className={classNames(className, styles.size)} fill={color}
			xmlns="http://www.w3.org/2000/svg"
			{...rest} ref={ref}>
			<rect width="24" height="24" fill="url(#pattern-temperature)"/>
			<defs>
				<pattern id="pattern-temperature" patternContentUnits="objectBoundingBox" width="1" height="1">
					<use xlinkHref="#image0_9246_7408" transform="scale(0.0166667)"/>
				</pattern>
				<image id="image0_9246_7408" width="60" height="60" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAADeklEQVR4nO1Zy2oUQRStGOMDo4vuPqcSHAhKfDCaz1CiW4kE3In4EeLChYIgGhOjRn9AoxhEEBcGRaKoax+rGI15YAiCGoUIiZEyHem51Eyme+J0jekDF4a51dX31K37qGqlMmTIkCHDKkMQBDtI3iH5jeRCTDHP9Huet1XVClkAnxMQLRAA0zVBmouerYhshPRN5TqYbBsXky/KdVAYXe3nqw5mhOOhRDy/D4LggPrfPcxCGVOugRnhFdvSIwDaVa15mBXqnQMzwoXIPCyw6rc0a70OM6a+5uswM8KFyOqw46j/B3W4XrmI1tbW9SRvrzRhAPdyudxG5RgaSD6wxN9wAsLDlnnum3coVwDgmsXIft/3N8clbJ4hecsy3xXlAgB0WLZhl1Kqzja+zE6qjmS3Zd5DKk34i96YFEbdsI0l2Qbgom1xtNZ7ipCWnh4H0KjSAsmTwvhRaVBLS8sGkpdJzpfooOZIXjKJz7KgY2LsCZUG8vn8OgCfosZorTslWQCPlmkXows2KEmTPCLGTaSSwAC0C2NHZM0MPbsQUy6JV601O0eM2VddtuoPmR5hxFmhbyP5KwHheRnTJM9ZkmLVCQ8JI/YLfW8CskvSXWo3kXxSdcIQ8Ss/fAF4m5QwgNfRuTzPy4kxk2kQno0aIZMNgB8VEP5uyfRR/WwahH8KIxpX8KPa1+hcnudtcYHwdNSIIAh2Cv2bCjz8KjqX7/u7hH4qDcIvhREFl+S2rioG4QvRuYIgOCj0z9MgfF0Y2hPVa633hh1UXMJzTU1N+VIZH0Bf1QlrrTuFEaOWxqO30pIUXioUtJfmwJKGhxtNNhVxfNTSfg7G2MoPZdtI8pgYN6O13lR1wkVaxzGZrQ1p0y4us73nQs82WA4PE6lv5yWQ1GbFhUEDtrOwaRdNMjIZOHxmxvwGcF7GbIg1AO7KcqS13qbSBIBTRbKs9QKgTBiyXZZ5TytHLu+eWowbSHJYN9tYejaUIRMeygU0NzcHAN5ZjBwnedwc8cr0ageAD5bFM8dDrVyCXoxReW5dMvijSVzmY5jv+7vDDN9ofpv/wvIlbzb+ki1yBeSMpx8n7bAs8sw5z9piGsAZebiIIyYbmwTlTMyWA5LbzX21bE6WEVOq+lIvPZXAxGoQBIcBXAXwwpx0jPdDmQr/M7qO1DqoDBkyZMig3MBvDhXgzhGypFwAAAAASUVORK5CYII="/>
			</defs>
		</svg>
	);
});
