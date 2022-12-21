import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/InstantSearch/ListeDesResultats.module.scss';
import { Skeleton } from '~/client/components/ui/Loader/Skeleton/Skeleton';

interface ListeDesResultatsProps {
  resultats: React.ReactElement
  isLoading: boolean
  isAffichageListeDeResultatsDesktopDirectionRow: boolean
  skeletonRepeat: number
  pagination: React.ReactNode
}

export function ListeDesResultats(props: ListeDesResultatsProps) {
  const { resultats, isLoading, isAffichageListeDeResultatsDesktopDirectionRow, skeletonRepeat, pagination } = props;

  return (
    <section className={styles.listeDesResultatsWrapper}>
	  <Container className={{ [styles.listeDesResultats]: !isAffichageListeDeResultatsDesktopDirectionRow }}>
        <Skeleton
          type='card'
          isLoading={isLoading}
          repeat={skeletonRepeat}
          className={{ [styles.skeletonAffichageDesktopDirectionRow]: !isAffichageListeDeResultatsDesktopDirectionRow } }
        >
          <>
            { resultats }
            { pagination }
          </>
        </Skeleton>
	  </Container>
    </section>
  );
};
