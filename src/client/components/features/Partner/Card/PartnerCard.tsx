import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react';

import styles from '~/client/components/features/Partner/Card/PartnerCard.module.scss';
import { ArrowRightIcon } from '~/client/components/ui/Icon/arrow-right.icon';
import { ExternalRedirectionIcon } from '~/client/components/ui/Icon/external-redirection.icon';
import { useLinkAttribute } from '~/client/hooks/useLinkAttribute';

interface PartnerCardProps {
  logo: string
  link: string
  title: string
  headline: string
  headlineColor: string
  description: string
  linkLabel: string
}

export function PartnerCard(props: PartnerCardProps) {
  const { logo, link, title, headline, linkLabel, headlineColor, description } = props;
  const { isInternalLink, externalAttributes } = useLinkAttribute(link);
  const icon = useMemo(function () {
    return isInternalLink ? <ArrowRightIcon /> : <ExternalRedirectionIcon />;
  }, [isInternalLink]);

  return (
    <Link href={link}>
      <a className={styles.card}  {...(!isInternalLink && externalAttributes)}>
        <div className={styles.cardLogo}>
          <Image alt="" src={logo} width='100%' height='100%'/>
        </div>
        <div className={styles.cardBody}>
          <h2>{title}</h2>
          <p>
            <strong style={{ color: headlineColor }} className={styles.headline}>{headline}</strong>
            {description}
          </p>
          <span className={styles.cardAction}>
            {linkLabel}
            {icon}
          </span>
        </div>
      </a>
    </Link>
  );
}
