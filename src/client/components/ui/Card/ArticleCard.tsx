import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

import { Icon } from '~/client/components/ui/Icon/Icon';

import { CardComponent } from './AbstractCard/CardComponent';
import styles from './ArticleCard.module.scss';

interface ArticleCardProps {
  imageSrc: string
  titleLabel: string
  link: string
  linkLabel?: string
}

export function ArticleCard({ className, children, imageSrc, titleLabel, link, linkLabel = 'Lire l‘article' }: ArticleCardProps & React.HTMLAttributes<HTMLLinkElement>) {
  return (
    <Link href={link} className={'underline-none'}>
      <CardComponent className={classNames(className, styles.articleCard)} layout={'vertical'}>
        <CardComponent.Image className={styles.imageWrapper} src={imageSrc} ariaHidden/>
        <CardComponent.Content className={styles.content}>
          <CardComponent.Title className={styles.title} titleAs={'h3'}>{titleLabel}</CardComponent.Title>
          {children}
          <CardComponent.FakeLink className={styles.cta} appearance={'primary'} icon={<Icon name={'arrow-right'}/>} label={linkLabel} />
        </CardComponent.Content>
      </CardComponent>
    </Link>
  );
}
