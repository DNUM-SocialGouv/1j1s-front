import React from 'react';

import styles from '~/client/components/ui/Card/RedirectionCard.module.css';
import { ArrowRightIcon } from '~/client/components/ui/Icon/arrow-right.icon';
import { ExternalRedirectionIcon } from '~/client/components/ui/Icon/external-redirection.icon';

enum RedirectionType {
	EXTERNAL = 'external',
	INTERNAL = 'internal'
}

interface RedirectionCardProps {
	children?: React.ReactNode
	imageUrl?: string
	imageAltText?: string
	link?: string
	linkLabel?: string
	title: string
	type?: string
}

export const RedirectionCard: React.FunctionComponent<RedirectionCardProps> = (props: RedirectionCardProps) => {
  const { children, imageUrl, imageAltText, link, linkLabel, title, type } = props;
	
  const icon = type === RedirectionType.EXTERNAL ? <ExternalRedirectionIcon color="#5269B5" /> : <ArrowRightIcon color="#5269B5" />;

  return (
    <article className={styles.card}>
	    <div className={styles.cardImageWrapper}>
	      {imageUrl && imageAltText && <img className={styles.cardImage} src={imageUrl} alt={imageAltText} />}
	    </div>
	    <div className={styles.cardContent}>
	      <h6 className={styles.cardTitle}>{title}</h6>
		    <div className={styles.cardDescription}>{children}</div>
		    <div className={styles.cardAction}>
			    {link && linkLabel && 
				    <a className={styles.cardLink} href={link}>
					    <span className={styles.cardLinkLabel}>{linkLabel}</span>
					    {icon}
				    </a>
          }
		    </div>
      </div>
    </article>
  );
};
