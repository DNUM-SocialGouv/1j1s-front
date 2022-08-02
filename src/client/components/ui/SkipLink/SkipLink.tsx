import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/ui/SkipLink/SkipLink.module.scss';

export function SkipLink() {
  return (
    <div className={styles.skipLink}>
      <Container>
        <ul className={styles.skipLinkList}>
          <li><a href="#contenu">Contenu</a></li>
          <li><a href="#header-navigation">Menu</a></li>
          <li><a href="#footer">Pied de page</a></li>
        </ul>
      </Container>
    </div>
  );
}
