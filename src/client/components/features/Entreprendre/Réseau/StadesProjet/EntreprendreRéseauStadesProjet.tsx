import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/features/Entreprendre/Réseau/StadesProjet/EntreprendreRéseauStadesProjet.module.scss';
import { CommonProps } from '~/client/components/props';
import { Tag } from '~/client/components/ui/Tag/Tag';

export interface ItemTagList {
  value: string
  isBarré: boolean
}

interface EntreprendreRéseauStadesProjetProps extends CommonProps {
  list: ItemTagList[]
}

export function EntreprendreRéseauStadesProjet({ className, list, ...rest }: EntreprendreRéseauStadesProjetProps) {
  const _classNames = classNames(styles.tagList, className);

  return (
    <ol className={_classNames} {...rest}>
      {
        list
          .filter((tag) => !!tag)
          .map((tag) => (
            <li className={styles.tagListItem} key={tag.value}>
              <Tag>{tag.isBarré ? <span className={styles.strike} title={`${tag.value} non concernée`}>{tag.value}</span> : tag.value}</Tag>
            </li>
          ))
      }
    </ol>
  );
}
