import React from 'react';

import { ErrorComponent } from '~/client/components/ui/ErrorMessage/ErrorComponent';
import { Footnote } from '~/client/components/ui/Footnote/Footnote';
import { Skeleton } from '~/client/components/ui/Loader/Skeleton/Skeleton';
import styles from '~/client/components/ui/Meilisearch/MessageResultatRecherche/MessageResultatRecherche.module.scss';

interface MessageResultatRechercheProps {
	labelSingulier: string
	labelPluriel: string
	isLoading: boolean
	numberOfResult: number
}

export function MessageResultatRecherche(props: MessageResultatRechercheProps) {
	const { labelSingulier, labelPluriel, isLoading, numberOfResult } = props;

	return (
		<Skeleton type="line" isLoading={isLoading} className={styles.nombreResultats}>
			<>
				<div role="status">
					{numberOfResult === 1 && (
						<h2 className={styles.stats}>
							<span className={styles.nombreResultats}>{numberOfResult}</span>
							{' ' + labelSingulier}
							<Footnote.Reference to="partenaires" id="partenaires-reference"/>
						</h2>
					)}
					{numberOfResult > 1 && (
						<h2 className={styles.stats}>
							<span className={styles.nombreResultats}>{numberOfResult}</span>
							{' ' + labelPluriel}
							<Footnote.Reference to="partenaires" id="partenaires-reference"/>
						</h2>
					)}
				</div>
				<div role="alert">
					{
						(numberOfResult === 0) && (
							<div>
								<ErrorComponent/>
							</div>
						)}
				</div>
			</>
		</Skeleton>
	);
}
