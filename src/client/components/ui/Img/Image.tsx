import NextImage from 'next/image';
import React from 'react';

/*
* TODO:
*  - [X] add index.tsx
*  - [X] Add wrapper for Next/Image
*  - [] Add placeholder on error
*  - [] Add placeholder as component
*  - [] Renommer en Image ?
* */

type ImageProps = React.ComponentPropsWithoutRef<typeof NextImage>;

type ImageRef = React.ComponentRef<typeof NextImage>;
export const Image = React.forwardRef<ImageRef, ImageProps>(function Image({
	...props
}, ref) {
	return <NextImage {...props} ref={ref}/>;
});
