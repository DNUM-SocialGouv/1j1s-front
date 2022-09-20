import React, { MouseEventHandler } from 'react';

import { Link } from '~/client/components/ui/Link/Link';

interface NavSubItemProps {
  title: string
  link: string
  current?: boolean
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export function NavSubItem({ title, link, current, onClick }: NavSubItemProps) {

  return (
    <li key={title}>
      <Link href={link} aria-current={current} onClick={onClick} className={!current ? 'underline-none' : ''}>
        {title}
      </Link>
    </li>
  );
}
