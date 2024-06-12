import React from 'react';

import { ErrorComponent } from '~/client/components/ui/ErrorMessage/ErrorComponent';
import { Footnote } from '~/client/components/ui/Footnote/Footnote';
import { Skeleton } from '~/client/components/ui/Loader/Skeleton/Skeleton';
import styles from '~/client/components/ui/Meilisearch/MessageResultatRecherche.module.scss';

interface MessageResultatRechercheProps {
  labelSingulier: string
  labelPluriel: string
  isLoading: boolean
  numberOfResult: number
}

export function MessageResultatRecherche(props: MessageResultatRechercheProps) {
	const { labelSingulier, labelPluriel, isLoading, numberOfResult } = props;
	const attrRole = numberOfResult > 0 ? 'status' : 'error';

	function AfficherMessageRésultats() {
		return <div role={attrRole}>
			{numberOfResult === 1 &&
            <h2 className={styles.stats}>
            	<span className={styles.nombreResultats}>{numberOfResult}</span>
            	{' ' + labelSingulier}
            	<Footnote.Reference to="partenaires" id="partenaires-reference" />
            </h2>}
			{numberOfResult > 1 &&
            <h2 className={styles.stats}>
            	<span className={styles.nombreResultats}>{numberOfResult}</span>
            	{' ' + labelPluriel}
            	<Footnote.Reference to="partenaires" id="partenaires-reference" />
            </h2>}
			{(numberOfResult === 0) &&
				<div role="alert">
					<ErrorComponent/>
				</div>
			}
		</div>;
	}

	return (
		<Skeleton type='line' isLoading={isLoading} className={styles.nombreResultats}>
			<AfficherMessageRésultats/>
		</Skeleton>
	);
}
