import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/features/Entreprendre/TagListWithSeparation.module.scss';
import { CommonProps } from '~/client/components/props';
import { Tag } from '~/client/components/ui/Tag/Tag';

export interface ItemTagList {
  value: string
  isBarré: boolean
}

interface TagListWithSeparationProps extends CommonProps {
  separationIcon: React.ReactNode
  list: ItemTagList[]
}

export function TagListWithSeparation({ className, separationIcon, list, ...rest }: TagListWithSeparationProps) {
  const _classNames = classNames(styles.tagList, className);

  return (
    <ul className={_classNames} {...rest}>
      {
        list
          .filter((tag) => !!tag)
          .map((tag, index) => (
            <li className={styles.tagItem} key={tag.value}>
              <Tag>{tag.isBarré ? <span className={styles.strike} title={`${tag.value} non concernée`}>{tag.value}</span> : tag.value}</Tag>
              {index !== list.length - 1 && separationIcon}
            </li>
          ))
      }
    </ul>
  );
}
