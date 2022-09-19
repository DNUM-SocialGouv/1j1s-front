import classNames from 'classnames';
import React from 'react';

import { Link } from '~/client/components/ui/Link/Link';
import styles from '~/client/components/ui/Link/LinkAsButton.module.scss';

interface LinkAsButtonProps extends React.AnchorHTMLAttributes<unknown> {
  icon?: React.ReactNode
  disabled?: boolean
  buttonOnDarkBackground?: boolean
}

export function LinkAsButton({ children, icon, href, disabled=false, buttonOnDarkBackground=false, className, ...rest } : React.PropsWithChildren<LinkAsButtonProps>) {
  const primaryStyle = buttonOnDarkBackground ? styles.linkAsButtonPrimaryOnDarkBackground : styles.linkAsButtonPrimary;
  const buttonStyle = classNames('underline-none', styles.linkAsButton, primaryStyle, className, { [styles.linkAsButtonDisabled]: disabled });

  if (!href) return null;

  return (
    <Link href={href} className={buttonStyle} {...rest}>
      {children}
      {icon}
    </Link>
  );
}
