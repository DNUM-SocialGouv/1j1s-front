import React, { useEffect, useState } from 'react';

import { useCombobox } from '~/client/components/ui/Form/Combobox/ComboboxContext';
import { matchesInput } from '~/client/components/ui/Form/Combobox/utils';
import { useSynchronizedRef } from '~/client/hooks/useSynchronizedRef';

type CategoryProps = React.ComponentPropsWithoutRef<'ul'> & {
	name: string,
};

export const Category = React.forwardRef<HTMLUListElement, CategoryProps>(function Category({
	children,
	name,
	...ulProps
}, outerRef) {
	const ref = useSynchronizedRef(outerRef);
	const [hidden, setHidden] = useState(false);
	const { state: { value } } = useCombobox();

	useEffect(function checkIfHidden() {
		const options = Array.from(ref.current?.querySelectorAll('[role="option"]') ?? []);
		const hasDisplayedOption = options.some((option) => matchesInput(option, value));
		setHidden(!hasDisplayedOption);
	}, [ref, children, value]);


	return (
		<li role="none" hidden={hidden}>
			{name}
			<ul role="group" aria-label={name} {...ulProps} ref={ref}>
				{children}
			</ul>
		</li>
	);
});
