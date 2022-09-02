import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

import styles from '~/client/components/ui/Link/LinkAsButton.module.scss';

interface LinkAsButtonProps extends React.AnchorHTMLAttributes<unknown> {
  icon?: React.ReactNode
  buttonOnDarkBackground?: boolean
}

export function LinkAsButton({ children, icon, href, buttonOnDarkBackground= false, className, ...rest } : React.PropsWithChildren<LinkAsButtonProps>) {
  const primaryStyle = buttonOnDarkBackground ? styles.linkAsButtonPrimaryOnDarkBackground : styles.linkAsButtonPrimary;
  const buttonStyle = classNames(styles.linkAsButton, primaryStyle, className);
  if (!href) return null;

  return (
    <Link href={href}>
      <a className={buttonStyle} {...rest}>
        {children}
        {icon}
      </a>
    </Link>
  );
}
