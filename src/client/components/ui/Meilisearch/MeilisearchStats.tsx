import type { StatsConnectorParams, StatsWidgetDescription } from 'instantsearch.js/es/connectors/stats/connectStats';
import connectStats from 'instantsearch.js/es/connectors/stats/connectStats';
import { useConnector } from 'react-instantsearch-hooks-web';

import styles from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout.module.scss';

export type UseStatsProps = StatsConnectorParams;

export function useStats(props?: UseStatsProps) {
  return useConnector<StatsConnectorParams, StatsWidgetDescription>(
    connectStats,
    props,
  );
}

export function MeilisearchStats(props: UseStatsProps & { label: string }) {
  const { nbHits } = useStats(props);
  const { label } = props;

  return (
    <>
      {nbHits > 0 &&
            <h2 className={styles.nombreRésultats}>{nbHits} {label}</h2>}
    </>
  );
}
