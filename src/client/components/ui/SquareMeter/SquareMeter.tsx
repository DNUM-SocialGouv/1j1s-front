import React from 'react';

type SquareMeterProps = React.ComponentPropsWithoutRef<'abbr'>;

export const SquareMeter = React.forwardRef<HTMLElement, SquareMeterProps>(function SquareMeter({
	...abbrProps
}, ref) {
	return <abbr title="mètre carré" {...abbrProps} ref={ref}>m<sup>2</sup></abbr>;
});
