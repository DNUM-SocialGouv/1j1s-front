import Link from 'next/link';
import React, { useMemo } from 'react';

import styles from '~/client/components/ui/Card/LinkCard.module.css';
import { ArrowRightIcon } from '~/client/components/ui/Icon/arrow-right.icon';
import { ExternalRedirectionIcon } from '~/client/components/ui/Icon/external-redirection.icon';

enum LinkType {
	EXTERNAL = 'external',
	INTERNAL = 'internal'
}

interface LinkCardProps {
	children?: React.ReactNode
	imageUrl?: string
	imageAltText?: string
	link: string
	linkLabel?: string
	title: string
	type?: 'internal' | 'external'
}

export const LinkCard: React.FunctionComponent<LinkCardProps> = (props: LinkCardProps) => {
  const { children, imageUrl, imageAltText, link, linkLabel, title, type } = props;
	
  const isLinkExternalType = type === LinkType.EXTERNAL;
  const icon = useMemo(function () {
	  return isLinkExternalType ? <ExternalRedirectionIcon color="#5269B5" /> : <ArrowRightIcon color="#5269B5" />;
  }, [isLinkExternalType]);
  const computedLink = useMemo(function () {
    return isLinkExternalType
      ? <a className={styles.cardLink} href={link}>
	        <span className={styles.cardLinkLabel}>{linkLabel}</span>
	        {icon}
      </a>
      : <Link href={link}>
        <a className={styles.cardLink}>
          <span className={styles.cardLinkLabel}>{linkLabel}</span>
          {icon}
        </a>
      </Link>;
  }, [icon, isLinkExternalType, link, linkLabel]);

  return (
    <article className={styles.card}>
	    <div className={styles.cardImageWrapper}>
		    {/* eslint-disable-next-line @next/next/no-img-element */}
	      {imageUrl && imageAltText && <img className={styles.cardImage} src={imageUrl} alt={imageAltText} decoding="async" loading="lazy" />}
	    </div>
	    <div className={styles.cardContent}>
	      <h6 className={styles.cardTitle}>{title}</h6>
		    <div className={styles.cardDescription}>{children}</div>
      </div>
	    <div className={styles.cardAction}>{link && linkLabel && computedLink}</div>
    </article>
  );
};
