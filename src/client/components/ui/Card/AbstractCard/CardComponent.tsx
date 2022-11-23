import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react';

import { HtmlHeadingTag } from '../../../props';
import styles from './CardComponent.module.scss';

interface CardComponentProps {
  layout: 'horizontal' | 'vertical'
  link: string
}

export function CardComponent({ children, className, layout, link }: CardComponentProps & React.HTMLAttributes<HTMLLinkElement>) {
  const layoutClass = useMemo(() => {
    switch (layout) {
      case 'horizontal': return styles.cardComponentHorizontal;
      case 'vertical': return styles.cardComponentVertical;
    }
  }, [layout]);

  return (
    <>
      <Link className={classNames(styles.cardComponent, layoutClass, className)} href={link}>
        {children}
      </Link>
    </>
  );
}

function CardContent({ children, className, rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...rest}>{children}</div>;
}

function CardButton({ appearance = 'tertiary', className, icon, label }: { appearance: 'primary' | 'secondary' | 'tertiary', icon?: React.ReactNode, label?: string } & React.HTMLAttributes<HTMLButtonElement>) {
  const appearanceClass = useMemo(() => {
    switch (appearance) {
      case 'primary': return styles.cardButtonPrimary;
      case 'secondary': return styles.cardButtonSecondary;
      case 'tertiary': return styles.cardButtonTertiary;
    }
  }, [appearance]);

  return (
    <span className={classNames(className, appearanceClass, styles.cardButton)}>
      <span>{label}</span>
      {icon}
    </span>
  );
}

function CardImage({ className, objectFit = 'contain', src }: { objectFit?: 'cover' | 'contain', src: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={classNames(styles.cardImageWrapper, className)}>
      <Image src={src} alt={''} layout={'fill'} objectFit={objectFit} />
    </div>
  );
}

function CardTitle({ children, className, id, titleAs = 'h2' }: { titleAs?: HtmlHeadingTag } & React.HTMLAttributes<HTMLTitleElement>) {
  return React.createElement(titleAs, { className: classNames(styles.cardTitle, className), id }, children );
}

CardComponent.Button = CardButton;
CardComponent.Content = CardContent;
CardComponent.Image = CardImage;
CardComponent.Title = CardTitle;

