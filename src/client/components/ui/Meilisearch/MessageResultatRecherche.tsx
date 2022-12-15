import React from 'react';

import styles from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout.module.scss';
import { ErrorComponent } from '~/client/components/ui/ErrorMessage/ErrorComponent';
import { Skeleton } from '~/client/components/ui/Loader/Skeleton/Skeleton';

export function MessageResultatRecherche(props: { labelSingulier: string, labelPluriel: string, isLoading: boolean, numberOfResult: number }) {
  const { labelSingulier, labelPluriel, isLoading, numberOfResult } = props;

  function AfficherMessageRésultats() {
    return <>
      {numberOfResult === 1 &&
            <h2 className={styles.stats}>
              <span className={styles.nombreRésultats}>{numberOfResult}</span>
              {' ' + labelSingulier}
            </h2>}
      {numberOfResult > 1 &&
            <h2 className={styles.stats}>
              <span className={styles.nombreRésultats}>{numberOfResult}</span>
              {' ' + labelPluriel}
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
