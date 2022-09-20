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
  logo: string
  link: string
  title?: string
  headline?: string
  headlineColor?: string
  description: string
  linkLabel: string
  alt: string
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

export function PartnerCard(props: PartnerCardProps) {
  const { logo, link, title, headline, linkLabel, headlineColor, description, alt } = props;
  const isInternalLink = useIsInternalLink(link);

  const icon = useMemo(function () {
    return <Icon name={isInternalLink ? 'arrow-right' : 'external-redirection'} />;
  }, [isInternalLink]);

  const hasHeadlineColor = headlineColor ? { color: headlineColor } : { color: 'inherit' };

  return (
    <Link href={link} className={classNames(styles.card, 'underline-none')}>
      <>
        <div className={styles.cardLogo}>
          <Image alt={alt} src={logo} width='100%' height='100%'/>
        </div>
        <div className={styles.cardBody}>
          { title &&
            <span className={styles.cardBody__Title}>{title}</span>
          }
          <p>
            { headline &&
              <strong style={ hasHeadlineColor } className={styles.cardHeadline}>{headline}</strong>
            }
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
