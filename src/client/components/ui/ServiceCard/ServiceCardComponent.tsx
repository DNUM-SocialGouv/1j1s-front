import { ButtonGroup, Icon } from '@dataesr/react-dsfr';
import Image from 'next/image';
import React from 'react';

import styles from '~/client/components/ui/ServiceCard/ServiceCardComponent.module.css';

interface ServiceCardProps {
  logo: string,
}

export function ServiceCard({ logo, children }: React.PropsWithChildren<ServiceCardProps>) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <Image alt="" src={logo} width="140" height="80"/>
      </div>
      <div className={styles.cardBody}>
        {children}
        <ButtonGroup className='fr-link' align="right">
          <Icon name="ri-arrow-right-line" size="lg" iconPosition="right" />
        </ButtonGroup>
      </div>
    </div>
  );
}
