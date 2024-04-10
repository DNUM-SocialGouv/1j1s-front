import NextImage from 'next/image';
import React, { useState } from 'react';

type ImageProps = React.ComponentPropsWithoutRef<typeof NextImage>;

type ImageRef = React.ComponentRef<typeof NextImage>;
export const Image = React.forwardRef<ImageRef, ImageProps>(function Image({
	src,
	...props
}, ref) {
	const [error, setError] = useState(false);

	return (
		<NextImage
			src={error ? '/images/placeholder.webp' : src}
			onError={() => setError(true)}
			{...props}
			ref={ref}/>
	);
});
