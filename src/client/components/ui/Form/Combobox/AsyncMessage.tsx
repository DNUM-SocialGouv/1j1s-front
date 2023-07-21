import React from 'react';

type AsyncMessageProps = React.ComponentPropsWithoutRef<'li'>;

export const AsyncMessage = React.forwardRef<HTMLLIElement, AsyncMessageProps>(function AsyncMessage({
	...liProps
}, ref) {
	return <li role={'status'} {...liProps} ref={ref}/>;
});
