import React, { useCallback, useMemo } from 'react';
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch';

import { getCapitalizedItems } from '~/client/components/ui/Meilisearch/getCapitalizedItems';

import { OptionSelect, Select } from '../../Form/Select/Select';

// TODO (BRUJ 08/07/2024): A supprimer le Omit lors du passage des options en composition
type MeilisearchSelectMultipleProps = Omit<React.ComponentPropsWithoutRef<typeof Select>, 'optionList'>

export function MeilisearchSelectMultiple(props: UseRefinementListProps & MeilisearchSelectMultipleProps) {
	const { refine, items } = useRefinementList(props);
	const { label, className } = props;

	// TODO (BRUJ 08/07/2024): A supprimer lors du passage des options en composition
	const optionsList: Array<OptionSelect> = useMemo(() => {
		return items.map((item) => ({
			libellé: getCapitalizedItems(item.label),
			valeur: item.value,
		}));
	}, [items]);

	const valuesSelected = useMemo(() => {
		return items.filter((item) => item.isRefined)
			.map((item) => item.value);
	}, [items]);

	const onOptionSelected = useCallback((option: HTMLElement) => {
		const value = option.getAttribute('data-value');
		if (value) refine(value);
	}, [refine]);

	return (
		<Select className={className} label={label} optionList={optionsList} multiple onChange={onOptionSelected}
			value={valuesSelected}/>
	);
}
