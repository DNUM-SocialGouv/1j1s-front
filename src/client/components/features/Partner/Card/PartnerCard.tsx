import classNames from 'classnames';
import Image from 'next/image';
import React, {
  useMemo,
} from 'react';

import styles from '~/client/components/features/Partner/Card/PartnerCard.module.scss';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';

interface PartnerCardProps {
  alt?: string
  description: string
  headline?: string
  headlineColor?: string
  logo: string
  logoRatio?: 'portrait' | 'paysage'
  link: string
  linkLabel: string
  title?: string
}

export function PartnerCardList(list: PartnerCardProps[], title?: string){
  return(
    <div className={styles.partnerListWrapper}>
      {title && <h2 className={styles.partnerListTitle}>{title}</h2>}
      <ul className={styles.partnerList}>
        {list.map((partnerCardProps, index) => {
          return(
            <li key={index}>
              {PartnerCard(partnerCardProps)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function PartnerCard({ alt = '', description, headline, headlineColor, logo, logoRatio = 'portrait', link, linkLabel, title }: PartnerCardProps) {
  const isInternalLink = useIsInternalLink(link);

  const icon = useMemo(function () {
    return <Icon name={isInternalLink ? 'arrow-right' : 'external-redirection'} />;
  }, [isInternalLink]);

  const hasHeadlineColor = headlineColor ? { color: headlineColor } : { color: 'inherit' };

  return (
    <Link href={link} className={classNames(styles.card, 'underline-none')}>
      <>
        <div className={styles.cardLogo}>
          <div className={classNames(styles.cardLogoWrapper, logoRatio === 'paysage' ? styles.cardLogoWrapperPaysage : styles.cardLogoWrapperPortrait)}>
            <Image alt={alt} src={logo} layout='fill'/>
          </div>
        </div>
        <div className={styles.cardBody}>
          {title && <span className={styles.cardBody__Title}>{title}</span>}
          <p>
            {headline && <strong style={ hasHeadlineColor } className={styles.cardHeadline}>{headline}</strong>}
            {description}
          </p>
          <span className={styles.cardAction}>
            <span>{linkLabel}</span>
            {icon}
          </span>
        </div>
      </>
    </Link>
  );

}
