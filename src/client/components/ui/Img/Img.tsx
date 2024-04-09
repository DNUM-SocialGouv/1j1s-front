import Image from 'next/image';
import React from 'react';

/*
* TODO:
*  - [] add index.tsx
*  - [X] Add wrapper for Next/Image
*  - [] Add placeholder on error
*  - [] Add placeholder as component
* */

type ImgProps = React.ComponentPropsWithoutRef<typeof Image>;

type ImageRef = React.ComponentRef<typeof Image>;
export const Img = React.forwardRef<ImageRef, ImgProps>(function Img({
	...props
}, ref) {
	return <Image {...props} ref={ref}/>;
});
