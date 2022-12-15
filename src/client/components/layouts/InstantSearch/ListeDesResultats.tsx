import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/InstantSearch/ListeDesResultats.module.scss';
import { Skeleton } from '~/client/components/ui/Loader/Skeleton/Skeleton';

interface ListeDesResultatsProps {
  resultats: React.ReactElement
  isLoading: boolean
  isResultatFullScreen: boolean
  skeletonRepeat: number
  pagination: React.ReactNode
}

export const ListeDesResultats = (props: ListeDesResultatsProps) => {
  const { resultats, isLoading, isResultatFullScreen, skeletonRepeat, pagination } = props;

  return (
    <section className={styles.listeDesResultatsWrapper}>
	  <Container className={isResultatFullScreen ? '' : styles.listeDesResultats}>
        <Skeleton
          type='card'
          isLoading={isLoading}
          repeat={skeletonRepeat}
          className={isResultatFullScreen ? '' : styles.skeletonDisplay}
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
