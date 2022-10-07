import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';

import styles from './ArticleCard.module.scss';

interface ArticleCardProps {
  imageSrc: string
  titleLabel: string
  link: string
  linkLabel?: string
}

export function ArticleCard({ className, children, imageSrc, titleLabel, link, linkLabel = "Lire l'article" }: ArticleCardProps & React.HTMLAttributes<HTMLLinkElement>) {
  return (
    <Link href={link}>
      <article className={classNames(styles.articleCard, className)}>
        <div className={styles.imageWrapper}>
          <Image src={imageSrc} alt='' layout='fill' objectFit='contain' />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{titleLabel}</h3>
          <div className={styles.description}>{children}</div>
          <ButtonComponent className={styles.cta} label={linkLabel} icon={<Icon name='arrow-right' />} iconPosition='right' />
        </div>
      </article>
    </Link>
  );
}
