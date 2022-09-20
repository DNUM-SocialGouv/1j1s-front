import classNames from 'classnames';
import Image from 'next/image';
import React, { useState } from 'react';

import { HtmlHeadingTag } from '~/client/components/props';
import styles from '~/client/components/ui/Card/EmployeurLinkCard.module.scss';
import { AngleLeftIcon } from '~/client/components/ui/Icon/angle-left.icon';
import { AngleRightIcon } from '~/client/components/ui/Icon/angle-right.icon';
import { Link } from '~/client/components/ui/Link/Link';
import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';

import { ExternalRedirectionIcon } from '../Icon/external-redirection.icon';

interface EmployeurLinkCardProps {
  imageUrl: string;
  link: string;
  linkLabel?: string;
  title: string;
  titleLevel?: HtmlHeadingTag;
  isMobile?: boolean;
  pourQui: string;
}

export function EmployeurLinkCard({
  children,
  imageUrl,
  isMobile = false,
  link,
  linkLabel,
  title,
  titleLevel,
  pourQui,
}: React.PropsWithChildren<EmployeurLinkCardProps>) {
  const isInternalLink = useIsInternalLink(link);
  const [displayPourQui, setDisplayPourQui] = useState(false);

  function LinkCardTitle({ children, className }: { titleLevel?: HtmlHeadingTag } & React.HTMLAttributes<HTMLTitleElement>) {
    return React.createElement(titleLevel || 'h3', { className: className }, children);
  }

  return (
    <div className={classNames(styles.card, { [styles.mobile]: isMobile }, { [styles.active]: displayPourQui })}>
      <article className={styles.cardFront}>
        <div className={styles.image}>
          <Image src={imageUrl} alt="" layout="fill" objectFit="cover" objectPosition="top"/>
        </div>
        <LinkCardTitle className={styles.title}>{title}</LinkCardTitle>

        {pourQui && <div className={classNames(styles.link, styles.pourQui)} onClick={() => setDisplayPourQui(true)}>
          <button>Qui est concerné ?</button>
        </div>}
        <div className={styles.description}>{children}</div>
        <Link href={link} className={styles.link}>
          {linkLabel}
          {isInternalLink ? <AngleRightIcon/> : <ExternalRedirectionIcon/>}
        </Link>
      </article>
      <div className={styles.cardBack}>
        <button onClick={() => setDisplayPourQui(false)}>{<AngleLeftIcon/>}</button>
        <div className={styles.title}>Qui est concerné ?</div>
        <div className={styles.cardBackDescription}>{pourQui}</div>
      </div>
    </div>
  );
};


