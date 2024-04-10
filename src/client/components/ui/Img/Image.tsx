import NextImage from 'next/image';
import React from 'react';

type ImageProps = React.ComponentPropsWithoutRef<typeof NextImage>;

type ImageRef = React.ComponentRef<typeof NextImage>;
export const Image = React.forwardRef<ImageRef, ImageProps>(function Image({
	...props
}, ref) {
	return <NextImage {...props} ref={ref}/>;
});
