import classNames from 'classnames';
import React from 'react';

import styles from './icon.module.scss';
import { SvgProps } from './svgProps.type';

export const VacuumIcon = React.forwardRef<SVGSVGElement, SvgProps>(function VacuumIcon({
	color = 'currentColor', className, ...rest
}, ref) {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24"
			className={classNames(className, styles.size)} fill={color}
			xmlns="http://www.w3.org/2000/svg"
			{...rest} ref={ref}>
			<rect width="24" height="24" fill="url(#pattern-vacuum)"/>
			<defs>
				<pattern id="pattern-vacuum" patternContentUnits="objectBoundingBox" width="1" height="1">
					<use xlinkHref="#image0_9246_7399" transform="scale(0.0166667)"/>
				</pattern>
				<image id="image0_9246_7399" width="60" height="60" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAADsklEQVR4nO2aOYgUQRSGa73vcabr/7t7HVmDFXFBFIwEQQPxCjwCzTQQxERQUEEUxQNE8cBIA0HEWAMDESMTRcUrWA9QdNX1wtv1QPHksS0MRY9O93RXzw79w4NJpl59U6+q3ns1SuXKlStXrj4uz/MAYAfJ6wA+kfxdr8k4AG6RPAFgSVtb2xDVCCK5mOSHJCD/Y88FvBFgf1qArbSjSql+mYQx7axsNegWq8Do3bOVe+4ryXVaaz+J8V3XHa61nkpyD4AvIdCblE2RvGFMYF1avrTW4wHcN/z9IDlL2RLJnsoJJLWy1eS67jgAL42oelksFscqGyL51CZw4HNWsLKV0Jfa29sH29jDpwzH61N32gu9KWQ/H7LheKV5aAm04zitKbtuMX/swP/yVL36vj8MwMOImdNNAAc8z+uox3ehUBhN8p4x/mcAk1Wa0lrPCK6jqPfoDwAHlVID4/oWOIE0xr0nP0aylIYAzAbwKmYCcbZO6GUhkXQq9aSkXC6XSG4leTVq8RCsdGzJgZV5UhImx3FGklwI4LYxue+e501UMSVXklxNmSYl/1KxWCyQvGOs8n5VhyT5yDQpqbHKqpxcZ1pJiVJqgMpapVJplBGCPSkmJdnvZ5E5MZWMWkieNO/n1tZWRzUpsJIbA8ALY/w1qlmBRQA2GOOfVs0M7DjOBGP8J6qZgTs6OgYZ+/ibamZgG+NXy4DmkNxL8gKArqCiEetqGmDHcUYGh8aziIXEFjlh+xQwgOkAHsWsnMQ+ktwNYETDAwNYLYVAHbCV1i3pZ8MCa61XkPyVEGylHS+Xy0MbCth13ZlpPrcAuOz7vm4IYN/3h5m9pZSgb5dKpTGZAwPYmDZsBXSnVFlZAveP0rVMyM7U2q9KHBjAXMuwf21VJsAkd2UE/L5QKBStAwM4lxFwTfVtosAkF5j9I8t23hpwubej8CZDWDmxX1sDBrCt2su/mHyO+fwSxd5aA2YNL/8hLZak7ZpN4J7/PYTLk2nKIX04ShQG39nWV4F/AZgSBbYuaBohHfbyn3JI74kDGxsawPZqL/9iApvWoRU8hfaPCxsL2vd9LdlOmns0xH4C2Bn2TqS1nh/WI6sBuktrPa8maJKLLP3lUJoKp0lO+8dcntQxfnfNKx1Av0spdDsB7CM5qYZ5dFsB/hvewZ6+FjTgJNSvkNxMci2AIwAuyr/oJDuShnjQ93oL4DHJu5Imkjwm39FaL41a6EtYAngQ40d9IBVfFF+5cuXKlUtlrD/HAXqo8vNmqQAAAABJRU5ErkJggg=="/>
			</defs>
		</svg>
	);
});
