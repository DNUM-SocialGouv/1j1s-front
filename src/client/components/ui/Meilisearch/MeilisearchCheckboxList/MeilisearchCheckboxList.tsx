import React from 'react';
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch';

import { Checkbox } from '../../Checkbox/Checkbox';
import { getCapitalizedItems } from '../getCapitalizedItems';

interface MeilisearchCheckboxListProps {
	label: string
}

export function MeilisearchCheckboxList(props: UseRefinementListProps & MeilisearchCheckboxListProps) {
	const { refine, items } = useRefinementList(props);

	if (items.length === 0) return <p>Malheureusement ce champ de recherche ne peut pas être affiché pour le moment.</p>;
	return (
		<>
			{items.map((item, index) => (
				<Checkbox
					key={index}
					label={getCapitalizedItems(item.label)}
					value={item.value}
					checked={item.isRefined}
					onChange={() => refine(item.value)} />
			))}
		</>
	);
}
