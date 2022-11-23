import classNames from 'classnames';
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

export function ArticleCard({ className, children, imageSrc, titleLabel, link, linkLabel = "Lire l'article" }: ArticleCardProps & React.HTMLAttributes<HTMLLinkElement>) {
  return (
    <CardComponent className={classNames(className, styles.articleCard)} layout={'vertical'} link={link}>
      <CardComponent.Image className={styles.imageWrapper} src={imageSrc} />
      <CardComponent.Content className={styles.content}>
        <CardComponent.Title className={styles.title}>{titleLabel}</CardComponent.Title>
        {children}
        <CardComponent.Button className={styles.cta} appearance={'primary'} icon={<Icon name={'arrow-right'}/>} label={linkLabel} />
      </CardComponent.Content>
    </CardComponent>
  );
}
