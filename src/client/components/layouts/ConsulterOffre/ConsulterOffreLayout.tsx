import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import styles from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout.module.scss';
import { Button } from '~/client/components/ui/Button/Button';
import { AngleLeftIcon } from '~/client/components/ui/Icon/angle-left.icon';


interface ConsulterOffreLayoutProps {
  children: React.ReactNode;
}

export function ConsulterOffreLayout(props: React.PropsWithChildren<ConsulterOffreLayoutProps>) {
  const { children } = props;
  const router = useRouter();
  const [isButtonRetourVisible, setIsButtonRetourVisible] = useState<boolean>(false);
  const [retour, setRetour] = useState<string>();

  useEffect(() => {
    if(router.query.from !== undefined) {
      setIsButtonRetourVisible(true);
      setRetour(router.query.from.toString());
    }
  }, [router.query.from]);


  function handleRetour() {
    if(router.query.from !== undefined) {
      if(router.query.params !== undefined) {
        return router.push(`${router.query.from.toString()}?${router.query.params.toString()}`);
      }
      return router.push(router.query.from.toString());
    }
  }

  return (
    <main id="contenu" className={styles.container}>
      <article className={styles.layout}>
        { isButtonRetourVisible && <Button buttonType="linkWithLeftIcon" onClick={handleRetour} aria-label={`Retour vers ${retour}`} icon={<AngleLeftIcon />}>Retour</Button>}
        {children}
      </article>
    </main>
  );
}
