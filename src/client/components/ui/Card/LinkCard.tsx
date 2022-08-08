import Image from 'next/image';
import React, {
  useMemo,
} from 'react';

import styles from '~/client/components/ui/Card/LinkCard.module.scss';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';

interface LinkCardProps {
	imageUrl: string
	link: string
	linkLabel?: string
	title: string
}

export function LinkCard({ children, imageUrl, link, linkLabel, title }: React.PropsWithChildren<LinkCardProps>)  {
  const isInternalLink = useIsInternalLink(link);

  const icon = useMemo(function() {
    return <Icon name={isInternalLink ? 'arrow-right' : 'external-redirection'} />;
  }, [isInternalLink]);


  return (
    <Link href={link} className={styles.card}>
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
    </Link>
  );
};


