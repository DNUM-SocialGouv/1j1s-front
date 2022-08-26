import React from 'react';
// eslint-disable-next-line import/named
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch-hooks-web';

import { MeilisearchSelect } from '~/client/components/ui/Meilisearch/MeilisearchSelect';

export function MeilisearchCustomRefinementList(props: UseRefinementListProps & { name: string, label: string }) {
  const { refine, items } = useRefinementList(props);
  const { name, label } = props;
  const optionList = items.map((item) => {
    return { libellé: item.label, valeur: item.value };
  });

  return (
    <><MeilisearchSelect
      multiple
      optionList={optionList}
      onChange={refine}
      name={name}
      label={label}
    />
    </>
  );
}

