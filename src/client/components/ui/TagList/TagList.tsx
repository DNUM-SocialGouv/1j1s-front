import { Tag } from '@dataesr/react-dsfr';
import React from 'react';

import styles from '~/client/components/ui/TagList/TagList.module.css';

interface TagListProps {
  list: Array<string | undefined>
}

export function TagList({ children, list, ...rest }: React.PropsWithChildren<TagListProps>) {
  return (
    <ul data-testid="TagList" className={styles.tagList} {...rest}>
      {
        list.map((tag) => (
          tag && (
            <li key={tag} data-testid="TagListItem">
              <Tag>{tag}</Tag>
            </li>
          )
        ))
      }
      {children}
    </ul>
  );
}
