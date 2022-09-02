import React from 'react';

import styles from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout.module.scss';

interface ConsulterOffreLayoutProps {
  children: React.ReactNode
}

export function ConsulterOffreLayout(props: React.PropsWithChildren<ConsulterOffreLayoutProps>) {
  const { children } = props;

  return (
    <main id="contenu" className={styles.container}>
      <article className={styles.layout}>
        {children}
      </article>
    </main>
  );
}
