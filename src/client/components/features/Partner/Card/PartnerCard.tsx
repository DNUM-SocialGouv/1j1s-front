import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import styles from '~/client/components/features/Partner/Card/PartnerCard.module.scss';
import { ArrowRightIcon } from '~/client/components/ui/Icon/arrow-right.icon';
import { ExternalRedirectionIcon } from '~/client/components/ui/Icon/external-redirection.icon';

interface PartnerCardProps {
  alt: string
  logo: string
  link: string
  title: string
  headline: string
  headlineColor: string
  description: string
  linkLabel: string
  internal: boolean
}

export function PartnerCard(props: PartnerCardProps) {
  const { logo, alt, link, title, headline, linkLabel, headlineColor, internal, description } = props;
  const icon = internal ? <ArrowRightIcon color="#5269B5"/> : <ExternalRedirectionIcon color="#5269B5" />;
  return (
    <Link href={link}>
      <a className={styles.card} data-testid='PartnerCard'>
        <div className={styles.cardLogo}>
          <Image alt={alt} src={logo} width='100%' height='100%'/>
        </div>
        <div className={styles.cardBody}>
          <h6>{title}</h6>
          <p>
            <strong style={{ color: headlineColor }} className={styles.headline}>{headline}</strong>
            {description}
          </p>
          <div className={styles.cardIcon}>
            <span className={styles.cardLabelIcon}>{linkLabel}</span>
            {icon}
          </div>
        </div>
      </a>
    </Link>
  );
}
