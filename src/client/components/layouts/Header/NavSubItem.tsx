import Link from 'next/link';
import React, { MouseEventHandler } from 'react';

interface NavSubItemProps {
  title: string
  link: string
  current?: boolean
  asLink?: React.ReactElement
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export function NavSubItem({ title, link, current, onClick }: NavSubItemProps) {

  return (
    <li key={title}>
      <Link href={link}>
        <a aria-current={current} onClick={onClick}>
          {title}
        </a>
      </Link>
    </li>
  );
}
