import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

import { HtmlHeadingTag } from '~/client/components/props';
import styles from '~/client/components/ui/Card/LinkCard.module.scss';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';

interface LinkCardProps {
	imageUrl: string
	link: string
	linkLabel?: string
	title: string
  titleLevel?: HtmlHeadingTag
}

export function LinkCard({ children, imageUrl, link, linkLabel, title, titleLevel }: React.PropsWithChildren<LinkCardProps>)  {

  function LinkCardTitle({ children, className }: { titleLevel?: HtmlHeadingTag } & React.HTMLAttributes<HTMLTitleElement>) {
    return React.createElement(titleLevel || 'h3', { className: className }, children);
  }

  return (
    <Link href={link} className={classNames(styles.card, 'underline-none')}>
      <article className={styles.cardArticle}>
        <div className={styles.cardImageWrapper}>
          <Image src={imageUrl} alt="" layout="fill" objectFit="cover" objectPosition="top"/>
        </div>

        <div className={styles.cardContent}>
          <div className={styles.cardContentHeader}>
            <LinkCardTitle className={styles.cardTitle}>{title}</LinkCardTitle>
            <span className={styles.cardAction}>
              <span className="sr-only">{linkLabel}</span>
              <Icon name='angle-right' aria-hidden="true"/>
            </span>
          </div>

          <div className={styles.cardDescription}>{children}</div>
        </div>
      </article>
    </Link>
  );
};


