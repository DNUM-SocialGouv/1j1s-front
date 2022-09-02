import React, { Children } from 'react';

import { NavItemWithSubItems } from '~/client/components/layouts/Header/NavItemWithSubItems';
import { Link } from '~/client/components/ui/Link/Link';

interface NavItemProps {
  title: string
  link?: string
  current: boolean
  children?: React.ReactNode
}

export function NavItem({ title, current, link, children } : NavItemProps) {

  const hasChildren = Children.toArray(children).length > 0;

  return (
    hasChildren ?
      <NavItemWithSubItems title={title} isCurrent={current}>
        {children}
      </NavItemWithSubItems>
      :
      <li>
        <Link href={link ? link : ''} aria-current={current}>
          {title}
        </Link>
      </li>
  );
}
