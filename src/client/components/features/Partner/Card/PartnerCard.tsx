import classNames from 'classnames';
import React, {
  useMemo,
} from 'react';

import styles from '~/client/components/features/Partner/Card/PartnerCard.module.scss';
import { CardComponent } from '~/client/components/ui/Card/AbstractCard/CardComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';


interface PartnerCardProps {
  description: string
  headline?: string
  headlineColor?: 'default' | 'asBonneBoiteColor' | 'asOnisepColor' | 'asServiceCiviqueColor'
  logo: string
  link: string
  linkLabel: string
  title?: string
  name?: string
}

export function PartnerCardList(list: PartnerCardProps[], title?: string){
  const listPartner = 'Liste des partenaires';
  return(
    <div className={styles.partnerListWrapper}>
      {title && <h2 className={styles.partnerListTitle}>{title}</h2>}
      <ul className={styles.partnerList} aria-label={listPartner}>
        {list.map((partnerCardProps, index) => {
          return (
            <li key={index}>
              {PartnerCard(partnerCardProps)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function PartnerCard({ description, className, headline, headlineColor, logo, link, linkLabel, title }: PartnerCardProps & React.HTMLAttributes<HTMLLinkElement>) {
  const isInternalLink = useIsInternalLink(link);
  const { isLargeScreen } = useBreakpoint();

  const appearanceLinkBold = useMemo(() => {
    switch (headlineColor) {
      case 'asBonneBoiteColor': return styles.bonneBoiteColor;
      case 'asOnisepColor': return styles.onisepColor;
      case 'asServiceCiviqueColor': return styles.serviceCiviqueColor;
      default: return styles.link;
    }
  }, [headlineColor]);

  const icon = useMemo(function () {
    return <Icon name={isInternalLink ? 'arrow-right' : 'external-redirection'} />;
  }, [isInternalLink]);


  return (
    <Link href={link} className={classNames(styles.card, className, 'underline-none')}>
      <CardComponent layout={ isLargeScreen ? 'horizontal' : 'vertical' }>
        <CardComponent.Image className={styles.cardLogo} src={logo}/>
        <CardComponent.Content className={styles.cardBody}>
          <div className={styles.cardBody__Title}>{title}</div>
          <p>
            {headline && <strong className={classNames(styles.cardHeadline, appearanceLinkBold)}>{headline}</strong>}
            {description}
          </p>
          <span className={styles.cardAction}>
            <CardComponent.FakeLink appearance={'tertiary'} label={linkLabel} icon={icon}/>
          </span>
        </CardComponent.Content>
      </CardComponent>
    </Link>
  );
}
