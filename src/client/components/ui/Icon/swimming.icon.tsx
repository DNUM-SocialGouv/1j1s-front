import classNames from 'classnames';
import React from 'react';

import styles from './icon.module.scss';
import { SvgProps } from './svgProps.type';

export const SwimmingIcon = React.forwardRef<SVGSVGElement, SvgProps>(function SwimmingIcon({
	color = 'currentColor', className, ...rest
}, ref) {
	return (
		<svg width="32" height="32" viewBox="0 0 32 32"
			className={classNames(className, styles.size)} fill={color}
			xmlns="http://www.w3.org/2000/svg"
			{...rest} ref={ref}>
			<rect width="32" height="32" fill="url(#pattern-swimming)"/>
			<defs>
				<pattern id="pattern-swimming" patternContentUnits="objectBoundingBox" width="1" height="1">
					<use xlinkHref="#image0_9373_7974" transform="scale(0.0166667)"/>
				</pattern>
				<image id="image0_9373_7974" width="60" height="60" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC/UlEQVR4nO2ZyWsUQRTGK67gNkx3fV9NyyAIQWG8iqgXQTy4kIASwZugJ88e9OBBTY7idhFjvAjeBP8BwYsRCcSoeHJBY+JBjZBEI6KYyIMelyYz3T3T2jPh/eDBMFWvqr6peq+WMUZRFEVRFEVRFEVRlJbEOUcAfSRHAHwWI/kQQK+UmYUEgIMkp0nO1bBpAD25DM7zvDUkTwF4TXKMZHcGYmfriK3a7H8V7f0W+jEykG/W2n2NtClLNWZmozZVKpVgchI6VzUAX6y1O9K2HcZsUrHVvs7mJpSRX9/3/c1p+iD5KK1gSWSZCgWwCsCJFEL//PU/lEqlSgrBnxoQPJ27UP5t48659QkFp4nfXyupabHW2j0phU6S/FGn/Lm1NkggeCSXJQ3gVYKOngE475zbaYxZSvJyzPJ+Ui6XvZh+exsImzNZCH45T+PfAdwledz3/Y1RH9/3VwN4EzO4BxIqGW5Lk0EQ2KYFk9wVzvI4gJvOuUOFQqGYwK87wYzc6ezsXF6rDTlMpDh4HDB5Q/JWAtG3jTFLYkRP1ZvZlhAr+L6/NkxicTN0wxizyNRATlByqCA5HG5XYsMSs5ks4ywBcCxhwhmoJ7qdWEzyRULRV4wxHaZdcc5tAXA/5dbS33aiPc8rS1wmzLDtKzoIghUATssNqRGhEdEXW1l0h1zWAYw2KzQi+oJpNQBsBzAE4D3JSyS3FYvFghjJrfJdWBYnbl5/a+0G0woEQWABnARwleT+SqWyrFZdKZM6JK8DeFrdS+WzbEdx/orSBAB6JJ7k5TG88m1K6it1xUeSV2i5+JN8K5cda+3eWCd5ipknoTwGcM451yWNypuWmHyWW5GUSZ06CSkv/7EkgmMzarsYgNEky6ILwMQCEDsBYHfSWFhprT1CcjDl8VDq3gNwWCwHf3lLG5SxiwbTCHIXlVcOANfCZxlJaF8BzISJRQ4dA9JJEATrov7ynXPuaLgHD4U+Mxn4yxjehWPqlzH+838eFEVRFEVRFEVRzELlJ+QJK5KFKCY/AAAAAElFTkSuQmCC"/>
			</defs>
		</svg>
	);
});
