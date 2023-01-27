import classNames from 'classnames';
import React from 'react';

import styles from './icon.module.scss';
import { SvgProps } from './svgProps.type';

export const MicrowaveIcon = React.forwardRef<SVGSVGElement, SvgProps>(function MicrowaveIcon({
	color = 'currentColor', className, ...rest
}, ref) {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24"
			className={classNames(className, styles.size)} fill={color}
			xmlns="http://www.w3.org/2000/svg"
			{...rest} ref={ref}>
			<rect width="24" height="24" fill="url(#pattern-microwave)"/>
			<defs>
				<pattern id="pattern-microwave" patternContentUnits="objectBoundingBox" width="1" height="1">
					<use xlinkHref="#image0_9246_7417" transform="scale(0.0166667)"/>
				</pattern>
				<image id="image0_9246_7417" width="60" height="60" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB+ElEQVR4nO2aTU4CQRCF+wJqpqff64W69hj+rMQL6DH8PZTGxI3BGyin0ERYqlF2mhhMJYNBmcYBB6YZ6ktqBQX1uqq7CqaNURRFURRFUWZAkiTrJC9Jdkn25ty6AK7SNN0IigXwHEGgZduLaBsSnGW2V1O7yBNchzIO2Vue4F6dzahgFlyZihmRxWtr7aq1do1kc+IMm8gIxSlCf7VXFVxo5cz8lHRTspxl96b2GWZZp7SJjGgEJ0myAuAUQEtG1MxaJI+ttcsT+D845xpRCvbe75DsjPjCjvd+ewL/dnSCvfcHJD/++kIA7/LeMf3b0fRha+0ygDOSn2Os9KeUrfj+5Q/gHsBu5X3YObcn+yskSPZsmqZLYiRPxl2Qvn9ooWcumIG9mpXsfl7JymsFS37Iv/I+TLKdt9ecc5uhIL33WwG/Qv4FBY80M6lgaRXZ/pLWcUvycFQJ9pE9S/IIwN1A2yrsX5ngqlHBrCjDiU5aHFw4nbT66KTF776sk9aY80K9J61pCm7HOGlNTbCLdNKamuCqUcFc0AzbRfsjnmX9HmZNzKhg1vqB+OtQhuUCSASBTcvOhwTLbRe5ABJBcKUagKfBE/wH2Ql3IXciqg60BBMN50GxOYfY9+wL4NFEzr/jdc415EPEOe8JQGzMW7yKoiiKYhaQL3EMAeqxOpoaAAAAAElFTkSuQmCC"/>
			</defs>
		</svg>
	);
});
