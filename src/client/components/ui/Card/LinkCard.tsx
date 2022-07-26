import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react';

import styles from '~/client/components/ui/Card/LinkCard.module.scss';
import { ArrowRightIcon } from '~/client/components/ui/Icon/arrow-right.icon';
import { ExternalRedirectionIcon } from '~/client/components/ui/Icon/external-redirection.icon';

interface LinkCardProps {
	imageUrl: string
	link: string
	linkLabel?: string
	title: string
}

export function LinkCard({ children, imageUrl, link, linkLabel, title }: React.PropsWithChildren<LinkCardProps>)  {

  const isInternalLink = useMemo(function () {
    return link.startsWith('/');
  }, [link]);

  const icon = useMemo(function () {
	  return isInternalLink ? <ArrowRightIcon /> : <ExternalRedirectionIcon />;
  }, [isInternalLink]);

  const externalAttributes = {
    rel: 'noreferrer',
    target: '_blank',
  };

  return (
  	<Link href={link}>
      <a className={styles.card} {...(!isInternalLink && externalAttributes)}>
        <article className={styles.cardArticle}>
          <div className={styles.cardImageWrapper}>
            <Image src={imageUrl} alt="" layout="fill" objectFit="cover" objectPosition="top"/>
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{title}</h3>
            <div className={styles.cardDescription}>{children}</div>
          </div>
          <span className={styles.cardAction}>
            {linkLabel}
            {icon}
          </span>
        </article>
      </a>
    </Link>
  );
};
