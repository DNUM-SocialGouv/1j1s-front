import { ButtonGroup, Icon } from '@dataesr/react-dsfr';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import styles from '~/client/components/ui/ServiceCard/ServiceCardComponent.module.css';

interface ServiceCardProps {
  alt: string,
  logo: string,
  link: string,
}

export function ServiceCard({ logo, children, alt, link }: React.PropsWithChildren<ServiceCardProps>) {
  return (
    <Link href={link}>
      <div className={styles.card}>
        <div className={styles.cardLogo}>
          <Image alt={alt} src={logo} width='100%' height='100%'/>
        </div>
        <div className={styles.cardBody}>
          {children}
          <ButtonGroup className='fr-link' align="right">
            <Icon name='ri-arrow-right-line' size="lg" iconPosition="right"/>
          </ButtonGroup>
        </div>
      </div>
    </Link>
  );
}
