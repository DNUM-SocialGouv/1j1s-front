import React from 'react';
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch-hooks-web';

import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import { getCapitalizedItems } from '~/client/components/ui/Meilisearch/getCapitalizedItems';

interface MeilisearchCustomRefinementListProps {
	label: string
}

export function MeilisearchCustomRefinementListForModal(props: UseRefinementListProps & MeilisearchCustomRefinementListProps) {
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
					onChange={() => refine(item.value)}
				/>
			))}
		</>
	);
}
