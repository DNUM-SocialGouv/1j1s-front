import { Icon, Title } from '@dataesr/react-dsfr';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import styles from '~/client/components/features/Partner/Card/PartnerCard.module.css';

export interface PartnerTitleProps {
  titleAs: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

interface PartnerCardProps extends PartnerTitleProps {
  alt: string
  logo: string
  link: string
  title: string
  headline: string
  headlineColor: string
  description: string
}

export function PartnerCard(props: PartnerCardProps) {
  const { logo, alt, link, title, titleAs, headline, headlineColor, description } = props;

  return (
    <Link href={link}>
      <a className={styles.card} data-testid='PartnerCard'>
        <div className={styles.cardLogo}>
          <Image alt={alt} src={logo} width='100%' height='100%'/>
        </div>
        <div className={styles.cardBody}>
          <Title as={titleAs} look='h6'>{title}</Title>
          <p>
            <strong style={{ color: headlineColor }} className={styles.headline}>{headline}</strong>
            {description}
          </p>
          <Icon name='ri-external-link-line fr-link' size='lg'/>
        </div>
      </a>
    </Link>
  );
}
