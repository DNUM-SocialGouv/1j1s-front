import React from 'react';

import styles from '~/client/components/features/Logement/ListeDesAnnonces.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { Skeleton } from '~/client/components/ui/Loader/Skeleton/Skeleton';

interface ListeDesAnnoncesProps {
  resultats: React.ReactNode
  isLoading: boolean
}

export const ListeDesAnnonces = (props: ListeDesAnnoncesProps) => {
  const { resultats, isLoading } = props;

  return (
    <section className={styles.listeDesAnnoncesWrapper}>
	  <Container>
        <Skeleton type='card' isLoading={isLoading} repeat={3} className={styles.skeletonDisplay}/>
        { resultats }
	  </Container>
    </section>
  );
};
