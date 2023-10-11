import React from 'react';
import {
	useCurrentRefinements,
	UseCurrentRefinementsProps,
} from 'react-instantsearch';

import { Icon } from '~/client/components/ui/Icon/Icon';
import { getCapitalizedItems } from '~/client/components/ui/Meilisearch/getCapitalizedItems';
import { Tag } from '~/client/components/ui/Tag/Tag';

import styles from './MeilisearchCustomCurrentRefinements.module.scss';

export default function MeilisearchCustomCurrentRefinements(props: UseCurrentRefinementsProps) {
	const { items, refine } = useCurrentRefinements(props);
	const isItemListEmpty = items.length === 0;

	if (isItemListEmpty) return null;

	return (
		<ul aria-label="liste des filtres appliqués" className={styles.tagList}>
			{items.map((item) => {
				return item.refinements.map((refinement, index) => (
					<li key={index} >
						<Tag>
							<button aria-label={`${refinement.label} - supprimer le filtre`} type="button" onClick={() => refine(refinement)}>
								{getCapitalizedItems(refinement.label)}
								<Icon name="close" />
							</button>
						</Tag>
					</li>
				));
			})}
		</ul>
	);
}
