import React from 'react';

import styles from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout.module.scss';
import { ErrorComponent } from '~/client/components/ui/ErrorMessage/ErrorComponent';
import { Footnote } from '~/client/components/ui/Footnote/Footnote';
import { Skeleton } from '~/client/components/ui/Loader/Skeleton/Skeleton';

interface MessageResultatRechercheProps {
  labelSingulier: string
  labelPluriel: string
  isLoading: boolean
  numberOfResult: number
}

export function MessageResultatRecherche(props: MessageResultatRechercheProps) {
	const { labelSingulier, labelPluriel, isLoading, numberOfResult } = props;

	function AfficherMessageRésultats() {
		return <>
			{numberOfResult === 1 &&
            <h2 className={styles.stats}>
            	<span className={styles.nombreRésultats}>{numberOfResult}</span>
            	{' ' + labelSingulier}
            	<Footnote.Reference to="partenaires" id="partenaires-reference" />
            </h2>}
			{numberOfResult > 1 &&
            <h2 className={styles.stats}>
            	<span className={styles.nombreRésultats}>{numberOfResult}</span>
            	{' ' + labelPluriel}
            	<Footnote.Reference to="partenaires" id="partenaires-reference" />
            </h2>}
			{(numberOfResult === 0) &&
            <ErrorComponent/>
			}
		</>;
	}

	return (
		<Skeleton type='line' isLoading={isLoading} className={styles.nombreRésultats}>
			<AfficherMessageRésultats/>
		</Skeleton>
	);
}
