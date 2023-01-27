import classNames from 'classnames';
import React from 'react';

import styles from './icon.module.scss';
import { SvgProps } from './svgProps.type';

export const SportIcon = React.forwardRef<SVGSVGElement, SvgProps>(function SportIcon({
	color = 'currentColor', className, ...rest
}, ref) {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24"
			className={classNames(className, styles.size)} fill={color}
			xmlns="http://www.w3.org/2000/svg"
			{...rest} ref={ref}>
			<rect width="24" height="24" fill="url(#pattern-sport)"/>
			<defs>
				<pattern id="pattern-sport" patternContentUnits="objectBoundingBox" width="1" height="1">
					<use xlinkHref="#image0_9246_7411" transform="scale(0.0166667)"/>
				</pattern>
				<image id="image0_9246_7411" width="60" height="60" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAADjElEQVR4nO2aT4hNURzHf89MjKLpzb3f73lPj7cZYRZSFpMlUhSa2fhP2SghZEFsZMWUNWFBiWYaZsdqSohkoaTEYpCMGAwjJf875k3djvPe3Hvfu2/uHfdTv3rd87u/c773nPs7557zRFJSUlJSEgzJ3zabtO1iKphpD/9XQ5pkB4C32vTvqiv8t/5OAEOl+Gv9titKwYOe64MikpHakSH52hP/ld92BYbkrXJBE2C3/jfBN6Mc0l3e6wDOSI3QsYx6T/htV2g4TmCl1Hqj7KXUCAAD3tiu667z267QcJzAAFrNslwut8AWK5vNzibZS3JEG4A+x3HmlRH7T1x9bcIFy2gmHTbK99nEAnhvifVBl1kE7zT8hr0zwEQKFgD9Rvk1S5zeCkmmx+J/xejd/qDtCoWfwJbE9aVYLDYZPiMVBH8yqm2wjJquoO2KDEvi0rYigOCPRrx200fXIXEBlgSjh6Th01dBcLfhe6pSwooDGb3sszRy65iDzsY6QVl83rW0tBTG/EguJ/nL8HtV4yVr9QDYZRuq+Xx+jjEt9eh3tmTdXrHZbLYZwAvLQ9kjMaQBwMMyy7wGPwFInreIfd7W1jZV4ohSalmZd/TAePfqTz/bvQC2S5whed3S6K8kF5a7J5/Pu8Zn4Jg9FZFGiTO5XG4Bye8W0Y/MuXmM0nttGxkbJQkAOF1hCvJl+gGJyBRJAkoplrJwNaI7JUmQPFyF2Puxm3d99vLPMIJjtYwMgu6pMIIdx5klSQTAsRDJ6pkkFZJLQgi+LAmmQX8cBBS9V5IMgEsBE1a7JBmSWwIO6askNzc3N2cliQA4G3Iu/kHyNoCDruvOlSQA4FCVqy1vz9+L9XAn2RF24VHBnkgcAbCI5Ocai/1rEjdIKts2zaQUXCwWmwDciUps3ARnAFwMkITu6h1KbwC9iaenI20AdsdWsOu6eQDnfIp9oJRa7SPm4tgJzo/uRR3XRys+hD4GsM3vDmZra+s0kt9iIbhQKLQAOOpnV6OUwHaE2YyzbftGo6gMAGbolY/loMsm9I321T0lISF5YUIEO44zk+QR21GJReiQ3ocuFArTq62X5P66C1ZKrSn9R6qSUH0WdIPkpmp61FL30noLbqwkVn/rAjjpOM78qHJFvQVnLOe6kfRmOfSWj+cBD0RdnyilNpQS0Isoe7Mcruuu0v8M0gZgZT3rTklJSUmROvMHLHM6ZMvxOPcAAAAASUVORK5CYII="/>
			</defs>
		</svg>
	);
});
