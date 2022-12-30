import React from 'react';

import styles from '~/client/components/layouts/RechercherSolution/ListeRésultats/ListeRésultatsRechercherSolution.module.scss';

export function ListeRésultatsRechercherSolution({ children, ...rest }: React.PropsWithChildren) {
  return (
    <ul className={styles.listeRésultatsRechercherSolution} {...rest}>
      {children}
    </ul>
  );
}
