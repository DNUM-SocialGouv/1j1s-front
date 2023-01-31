import classNames from 'classnames';
import React from 'react';

import styles from './icon.module.scss';
import { SvgProps } from './svgProps.type';

export const WashingMachineIcon = React.forwardRef<SVGSVGElement, SvgProps>(function WashingMachineIcon({
	color = 'currentColor', className, ...rest
}, ref) {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24"
			className={classNames(className, styles.size)} fill={color}
			xmlns="http://www.w3.org/2000/svg"
			{...rest} ref={ref}>
			<rect width="24" height="24" fill="url(#pattern-washing-machine)"/>
			<defs>
				<pattern id="pattern-washing-machine" patternContentUnits="objectBoundingBox" width="1" height="1">
					<use xlinkHref="#image0_9246_7420" transform="scale(0.0166667)"/>
				</pattern>
				<image id="image0_9246_7420" width="60" height="60" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAADDElEQVR4nO2au27UQBSGLaSl4Sbb8/+zCUGi4ZaOBhHRhLwAEQo8BW+AklBy6XgFIkRCIBQoVEQRlwoCVAQUCC8AUVj6NTpaSzijbGKvx+tZNL90GnvGx5/PXI6PHQReXl5eXv+JwjA8QXKRZItkUrO1ACzFcXymMlgAvxwANW1L7s06MDuRTRy1hSqAWw6AdbPfVQAnFdvzKIqOR1E0QnK56PmBA46iaMRYHAud98ADMKSXJYpp9F4UPT+IwEkZ88BlRQei6CNMN4d0m+R7ktNa63HJfbXWh8TiOD4rx0jOkFwb9Ai3Sc4rpU7n9SEPg+TjtO9AAX/TWl8o4esigM1BAX6ttWZZf8PDwzGAl04DA1gJgqBhy+fo6OhBkqtOAgPYbDabsO1XIk1ywzXgdpk5m8P32H4LWRVOkz2i+8i6w4IFiCocJt2iW2Tr6VWyZ7sC/M66s+738MEF4Gmj3aSsrABuKKXOy0Im25TsrSRvknxLcjstGQnAfaXUdRklYRge01qfBDAF4BnJK8a1Z2sH1lqPZ9sBmCuwZ++38j/IXltrPVE7sFLqlNHui0Xgz7uknvUCAzhcYXWzlb22+KodOI7jI0a7P1WVX6MoOlo7sDK2JJJfLQKv592a+gastb6cbQfgocU5POfcokVyJttOthiLwFPGw7zlAvCa0bSRJ9nPAftd3paMe/jkAnDb/GQJ4KqFCO9IOprN5rm92vcTOJGyzC7t75WAvW1eD8BTl4DbkjoaXQ6QvNsD7B3pa8Becur1kGkBYGhoSO3SbzLnnN4wh7FIcnEAP/br33dgdmzVXGhSNQBcS/Ps9TQ5EVuXY+lq3OhS4nmVx3ddwAnJNxaLeCt5/Qa2xQLzMC2xjvXqS+ZsnmHsDDD/LWSLkg7m9ZFuPU968OUEcJIxedGfldRQHoC89Yiln1om0gzqYxkfrgEnVZsHLis6EEUfYVY7pFt1R3EP27YODGDJAbBuNm8dOO5UDLccgNthAH5mf1qzqrDzj9SCFNfqBk3vYb4yWC8vLy+voP/6C2Zlamh3qucAAAAAAElFTkSuQmCC"/>
			</defs>
		</svg>
	);
});
