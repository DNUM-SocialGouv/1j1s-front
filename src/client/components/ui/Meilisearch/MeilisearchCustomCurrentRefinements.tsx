import React from 'react';
import {
	useCurrentRefinements,
	UseCurrentRefinementsProps,
} from 'react-instantsearch-hooks-web';

import { Icon } from '~/client/components/ui/Icon/Icon';
import { getCapitalizedItems } from '~/client/components/ui/Meilisearch/getCapitalizedItems';

import styles from './MeilisearchCustomCurrentRefinements.module.scss';

export default function MeilisearchCustomCurrentRefinements(props: UseCurrentRefinementsProps) {
	const { items, refine } = useCurrentRefinements(props);
	const isItemListEmpty = items.length === 0;

	if (isItemListEmpty) return null;

	return (
		<ul aria-label="liste des filtres appliqués" className={styles.tagList}>
			{items.map((item) => {
				return item.refinements.map((refinement, index) => (
					<li key={index} className={styles.tag}>
						<span>{getCapitalizedItems(refinement.label)}</span>
						<button aria-label="supprimer le filtre" type="button" onClick={() => refine(refinement)}>
							<Icon name="close" />
						</button>
					</li>
				));
			})}
		</ul>
	);
}
