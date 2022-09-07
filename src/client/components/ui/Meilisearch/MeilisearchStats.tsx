import type { StatsConnectorParams, StatsWidgetDescription } from 'instantsearch.js/es/connectors/stats/connectStats';
import connectStats from 'instantsearch.js/es/connectors/stats/connectStats';
import React from 'react';
import { useConnector } from 'react-instantsearch-hooks-web';

import { ErrorComponent } from '~/client/components/ui/ErrorMessage/ErrorComponent';
import styles from '~/client/components/ui/Meilisearch/MeiliSearchStats.module.scss';

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

  return (
    <>
      {nbHits == 1 &&
            <h2 className={styles.nombreRésultats}>{nbHits} {labelSingulier}</h2>}
      {nbHits > 1 &&
            <h2 className={styles.nombreRésultats}>{nbHits} {labelPluriel}</h2>}
      {nbHits == 0 &&
            <ErrorComponent/>
      }
    </>
  );
}
