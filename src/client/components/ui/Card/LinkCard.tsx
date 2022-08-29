import Image from 'next/image';
import React from 'react';

import styles from '~/client/components/ui/Card/LinkCard.module.scss';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';

interface LinkCardProps {
	imageUrl: string
	link: string
	linkLabel?: string
	title: string
}

export function LinkCard({ children, imageUrl, link, linkLabel, title }: React.PropsWithChildren<LinkCardProps>)  {

  return (
    <Link href={link} className={styles.card}>
      <article className={styles.cardArticle}>
        <div className={styles.cardImageWrapper}>
          <Image src={imageUrl} alt="" layout="fill" objectFit="cover" objectPosition="top"/>
        </div>

        <div className={styles.cardContent}>
          <div className={styles.cardContentHeader}>
            <h3 className={styles.cardTitle}>{title}</h3>
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


