import type { StatsConnectorParams, StatsWidgetDescription } from 'instantsearch.js/es/connectors/stats/connectStats';
import connectStats from 'instantsearch.js/es/connectors/stats/connectStats';
import React from 'react';
import { useConnector, useInstantSearch } from 'react-instantsearch-hooks-web';

import styles from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout.module.scss';
import { ErrorComponent } from '~/client/components/ui/ErrorMessage/ErrorComponent';
import { Skeleton } from '~/client/components/ui/Loader/Skeleton/Skeleton';

export type UseStatsProps = StatsConnectorParams;

export function useStats(props?: UseStatsProps) {
  return useConnector<StatsConnectorParams, StatsWidgetDescription>(
    connectStats,
    props,
  );
}

export function MeilisearchStats(props: UseStatsProps & { labelSingulier: string, labelPluriel: string }) {
  const { nbHits } = useStats(props);
  const { labelSingulier, labelPluriel } = props;
  const { status } = useInstantSearch();

  function AfficherMessageRésultats() {
    return <>
      {nbHits == 1 &&
            <h2 className={styles.stats}>
              <span className={styles.nombreRésultats}>{nbHits}</span>
              {labelSingulier}
            </h2>}
      {nbHits > 1 &&
            <h2 className={styles.stats}>
              <span className={styles.nombreRésultats}>{nbHits}</span>
              {labelPluriel}
            </h2>}
      {nbHits == 0 &&
            <ErrorComponent/>
      }
    </>;
  }

  return <Skeleton type='line' isLoading={status === 'loading'} className={styles.nombreRésultats}>
    <AfficherMessageRésultats/>
  </Skeleton>;
}
