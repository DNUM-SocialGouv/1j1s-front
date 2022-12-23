import React  from 'react';
// eslint-disable-next-line import/named
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch-hooks-web';

import { CommonProps } from '~/client/components/props';
import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import { getCapitalizedItems } from '~/client/components/ui/Meilisearch/getCapitalizedItems';

interface MeilisearchCustomRefinementListProps extends CommonProps {
  label: string
}
export function MeilisearchCustomRefinementListForModal(props: UseRefinementListProps & MeilisearchCustomRefinementListProps & React.HTMLAttributes<HTMLDivElement>) {
  const { refine, items } = useRefinementList(props);

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
