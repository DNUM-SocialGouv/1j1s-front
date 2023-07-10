import React from 'react';

type CategoryProps = React.ComponentPropsWithoutRef<'ul'> & {
	name: string,
};

export const Category = React.forwardRef<HTMLUListElement, CategoryProps>(function Category({
	children,
	name,
	...ulProps
}, ref) {
	return (
		<li>
			{name}
			<ul role="group" aria-label={name} {...ulProps} ref={ref}>
				{children}
			</ul>
		</li>
	);
});
