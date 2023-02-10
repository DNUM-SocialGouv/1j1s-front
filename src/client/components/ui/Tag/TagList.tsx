import classNames from 'classnames';
import React from 'react';

import { Tag } from '~/client/components/ui/Tag/Tag';
import styles from '~/client/components/ui/Tag/TagList.module.scss';

interface TagListProps extends React.ComponentPropsWithoutRef<'ul'> {
  list: Array<string | undefined>
}

export function TagList({ className, list, ...rest }: TagListProps) {
	const _classNames = classNames(styles.tagList, className);

	return (
		<ul className={_classNames} {...rest}>
			{
				list
					.filter((tag) => !!tag)
					.map((tag) => (
						<li key={tag}>
							<Tag>{tag}</Tag>
						</li>
					))
			}
		</ul>
	);
}
