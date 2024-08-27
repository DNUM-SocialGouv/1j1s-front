import NextImage from 'next/image';
import React, { useState } from 'react';

const PLACEHOLDER_SRC = '/images/placeholder.webp';

type ImageProps = React.ComponentPropsWithoutRef<typeof NextImage>;
type ImageRef = React.ComponentRef<typeof NextImage>;
export const Image = React.forwardRef<ImageRef, ImageProps>(function Image({
	src,
	onError: onErrorProps = doNothing,
	...props
}, ref) {
	const [error, setError] = useState(false);

	return (
		<NextImage
			{...props}
			src={error ? PLACEHOLDER_SRC : src}
			onError={(...args) => {
				setError(true);
				onErrorProps(...args);
			}}
			ref={ref}
		/>
	);
});

function doNothing() {}
