import classNames from 'classnames';
import React, {
  useCallback,
} from 'react';

import styles from '~/client/components/ui/Button/Button.module.scss';
import { ButtonProps } from '~/client/components/ui/Button/button.props';

export function Button({ children, buttonType='primary', buttonOnDarkBackground= false, icon, className, ...rest } : React.PropsWithChildren<ButtonProps>) {


  const getButton = useCallback(() => {
    const primaryStyle = buttonOnDarkBackground ? styles.buttonPrimaryOnDarkBackground : styles.buttonPrimary;
    const buttonStyle = classNames(styles.button, primaryStyle, className);

    switch(buttonType) {
      case 'link':
        return buttonLink(children, rest);
      case 'linkWithRightIcon':
        return buttonLinkWithRightIcon(children, rest, icon);
      case 'withLeftIcon':
        return buttonWithLeftIcon(children, rest, icon, buttonStyle);
      case 'withRightIcon':
        return buttonWithRightIcon(children, rest, icon, buttonStyle);
      default:
        return buttonPrimary(children, rest, buttonStyle);
    }
  }, [buttonType, buttonOnDarkBackground, children, className, icon, rest]);

  return ( getButton() );
}

function buttonPrimary(children: React.ReactNode, rest: React.ButtonHTMLAttributes<unknown> , buttonStyle: string) {
  return (
    <button className={buttonStyle} {...rest}>
      {children}
    </button>
  );
}

function buttonLink(children: React.ReactNode, rest: React.ButtonHTMLAttributes<unknown> ) {
  return (
    <button className={classNames(styles.button, styles.buttonLink)} {...rest}>
      {children}
    </button>
  );
}

function buttonLinkWithRightIcon(children: React.ReactNode, rest: React.ButtonHTMLAttributes<unknown> , icon: React.ReactNode | undefined) {
  return (
    <button className={classNames(styles.button, styles.buttonLink)} {...rest}>
      {children}
      {icon && <>{icon}</>}
    </button>
  );
}

function buttonWithLeftIcon(children: React.ReactNode, rest: React.ButtonHTMLAttributes<unknown> , icon: React.ReactNode | undefined, buttonStyle: string) {
  return (
    <button className={buttonStyle} {...rest}>
      {icon && <>{icon}</>}
      {children}
    </button>
  );
}

function buttonWithRightIcon(children: React.ReactNode, rest: React.ButtonHTMLAttributes<unknown> , icon: React.ReactNode | undefined, buttonStyle: string) {
  return (
    <button className={buttonStyle} {...rest}>
      {children}
      {icon && <>{icon}</>}
    </button>
  );
}
