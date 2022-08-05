import Image from 'next/image';
import React, {
  useMemo,
} from 'react';

import styles from '~/client/components/features/Partner/Card/PartnerCard.module.scss';
import { ArrowRightIcon } from '~/client/components/ui/Icon/arrow-right.icon';
import { ExternalRedirectionIcon } from '~/client/components/ui/Icon/external-redirection.icon';
import { Link } from '~/client/components/ui/Link/Link';
import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';

interface PartnerCardProps {
  logo: string
  link: string
  title: string
  headline: string
  headlineColor: string
  description: string
  linkLabel: string
  alt: string
}

export function PartnerCard(props: PartnerCardProps) {
  const { logo, link, title, headline, linkLabel, headlineColor, description, alt } = props;
  const isInternalLink = useIsInternalLink(link);

  const icon = useMemo(function () {
    return isInternalLink ? <ArrowRightIcon /> : <ExternalRedirectionIcon />;
  }, [isInternalLink]);

  return (
    <Link link={link} className={styles.card}>
      <>
        <div className={styles.cardLogo}>
          <Image alt={alt} src={logo} width='100%' height='100%'/>
        </div>
        <div className={styles.cardBody}>
          <span className={styles.cardBody__Title}>{title}</span>
          <p>
            <strong style={{ color: headlineColor }} className={styles.headline}>{headline}</strong>
            {description}
          </p>
          <span className={styles.cardAction}>
            {linkLabel}
            {icon}
          </span>
        </div>
      </>
    </Link>
  );

}
