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
  headlineColor?: string
  logo: string
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

export function PartnerCard({ description, className, headline, headlineColor, logo, link, linkLabel, title }: PartnerCardProps & React.HTMLAttributes<HTMLLinkElement>) {
  const isInternalLink = useIsInternalLink(link);
  const { isLargeScreen } = useBreakpoint();


  const icon = useMemo(function () {
    return <Icon name={isInternalLink ? 'arrow-right' : 'external-redirection'} />;
  }, [isInternalLink]);

  const hasHeadlineColor = headlineColor ? { color: headlineColor } : { color: 'inherit' };

  return (
    <Link href={link} className={classNames(styles.card, className, 'underline-none')}>
      {isLargeScreen ?
        <CardComponent layout={'horizontal'} className={styles.card}>
          <div className={styles.cardLogo}>
            <CardComponent.Image className={classNames(styles.cardLogoWrapper, styles.cardLogoWrapperPaysage)} src={logo}/>
          </div>
          <CardComponent.Content className={styles.cardBody}>
            <CardComponent.Title className={styles.cardBody__Title} titleAs={'h2'}>{title}</CardComponent.Title>
            <p>
              {headline && <strong style={hasHeadlineColor} className={styles.cardHeadline}>{headline}</strong>}
              {description}
            </p>
            <span className={styles.cardAction}>
              <CardComponent.FakeLink appearance={'tertiary'} label={linkLabel} icon={icon}/>
            </span>
          </CardComponent.Content>
        </CardComponent>
        :
        <CardComponent layout={'vertical'} className={styles.card}>
          <div className={styles.cardLogo}>
            <CardComponent.Image className={classNames(styles.cardLogoWrapper, styles.cardLogoWrapperPortrait)} src={logo} />
          </div>
          <CardComponent.Content className={styles.cardBody}>
            <CardComponent.Title className={styles.cardBody__Title} titleAs={'h2'}>{title}</CardComponent.Title>
            <p>
              {headline && <strong style={hasHeadlineColor} className={styles.cardHeadline}>{headline}</strong>}
              {description}
            </p>
            <span className={styles.cardAction}>
              <CardComponent.FakeLink appearance={'tertiary'} label={linkLabel} icon={icon}/>
            </span>
          </CardComponent.Content>
        </CardComponent>
      }
    </Link>
  );
}
