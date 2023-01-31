import classNames from 'classnames';
import React from 'react';

import styles from './icon.module.scss';
import { SvgProps } from './svgProps.type';

export const CleanHandsIcon = React.forwardRef<SVGSVGElement, SvgProps>(function CleanHandsIcon({
	color = 'currentColor', className, ...rest
}, ref) {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24"
			className={classNames(className, styles.size)} fill={color}
			xmlns="http://www.w3.org/2000/svg"
			{...rest} ref={ref}>
			<rect width="24" height="24" fill="url(#pattern-clean-hands)"/>
			<defs>
				<pattern id="pattern-clean-hands" patternContentUnits="objectBoundingBox" width="1" height="1">
					<use xlinkHref="#image0_9246_7414" transform="scale(0.0166667)"/>
				</pattern>
				<image id="image0_9246_7414" width="60" height="60" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAADtUlEQVR4nO2aTWgcZRjHXw3WD5Q0u+/vPzvrtrnkIOvFm3hq7aWmB3uoetCTl9JGwSCIXiKUCi0ULIWSQ28t9FJQwRQNvfRQaIIYDwp6S2mTtvhR40fUaAKVt5nUMOzu7Lubmd0d9w/vaeadmd88z/u8H89jjKck7Qd+AL6X9KLJuyTdlHQ3aosm79J/sPeaybvUB865lFcLW2v3AdfigEnN9bHWjppeE3DDF7anozf/N2Br7Sgw34JLzwMvmLxIWxi0giB4XtI08KNrkj631u4yeQQG3m3gKROm14Cr1eo24E1gFliWtCTpbBiGO4GXmxgaB9y9ks65vtEzrkh6teuAi8ViWdJXdUA24JPiwQZkrWecN8YMZALMprnZBahalq0HW+fjP3U/qFAoPAlMefQ7mln0lrTgWq1o7NzYJ6o70I2+hUKh4gG8PDg4uN10WsCsjwXj/T09YAI44vbm7gcAM8AbzssyA5b0u48Fk4Bb9IA5a22YyYmGL1C71xu0L40xD6V+otFFwG44HPbeHfnufrIGbjTGgauNPnSxwd9a6FbghDH+W6u7o8VuBfa9nrg78t399AxwsyupJPUcsE1YSeUOuF11GqgPnLY6bcG+hdNWpy3Yt3DaSvrDSfN8u9e7zsI2YZ5v93rXAaetPnDa6ls4Y/VdOm3lyqUL60coB4GPga8l3QL+Bq5L+gx4LxfAYRhaSackrcYfmNRMxmr7/cAzUe7WC7QngYER4E4vlT60BSxpOv6AKHd0KAiCp0ulEu50f2hoaEcQBHskvQ9cBlYk/Qy8lBrZVgNLeq5OZv6BJh/xoOmAWgYGTsY6z5keUDvAM7HOp03OgX+KjV2XUfwCuCTpAnBG0gk3nrsiMb1eavFE06mWuCT94xGNf3GJ6UqlUjAdlAukse/6runO0Sbbdxr6FfigXC4XUyWr/83jMa+carqzS58mZBQbNVcFcDyatrLSAPBN0/nheqpUKo8CpWKx+FQQBM8Ce621r7g1taRjjVZhUdmRG+eBSVnAWOz9qy5vnMaLHgfeiUok6oH/AXzYdN2Fp4Ig2B0tdja/d9KkqTAMH5P0tqTbDcD/dJuQzUnsLXDjsRqwS1l41f0hIOmtWK1IHHwF+ETSa6VSqeqmE+PhUVE0Ho+P2aitdaRAfXh4+JGoSK2VaN9qW3PrAtNJjYyMPOyiZXRIkCbsUlfVaVfXazBdZJ+LLLFVoO5QYjKzMWtakDtBAV6X9JFLnQB/+czxwLeSLjr39Z16/gUtjfHjt+wbTQAAAABJRU5ErkJggg=="/>
			</defs>
		</svg>
	);
});
