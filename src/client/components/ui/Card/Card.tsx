import classNames from 'classnames';
import Image from 'next/image';
import React, { useMemo } from 'react';

import { HtmlHeadingTag } from '~/client/components/props';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Link } from '~/client/components/ui/Link/Link';

import styles from './Card.module.scss';

interface CardProps {
  layout: 'horizontal' | 'vertical'
}

export function Card({ children, className, layout }: CardProps & React.HTMLAttributes<HTMLLinkElement>) {
	const layoutClass = useMemo(() => {
		switch (layout) {
			case 'horizontal': return styles.cardComponentHorizontal;
			case 'vertical': return styles.cardComponentVertical;
		}
	}, [layout]);

	return (
		<div className={classNames(styles.cardComponent, layoutClass, className)}>
			{children}
		</div>
	);
}

function CardContent({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={className}>{children}</div>;
}

function CardButton({ appearance = 'tertiary', className, icon, label }: { appearance: 'primary' | 'secondary' | 'tertiary', icon?: React.ReactNode, label?: string } & React.HTMLAttributes<HTMLButtonElement>) {
	return <ButtonComponent className={className} appearance={appearance} label={label || ''} icon={icon} iconPosition={'right'} />;
}

function CardFakeLink({ appearance = 'tertiary', className, icon, label }: { appearance: 'primary' | 'secondary' | 'tertiary', icon?: React.ReactNode, label?: string } & React.HTMLAttributes<HTMLButtonElement>) {
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

function CardLink({ appearance = 'default', className, href, label }: { appearance?: 'default' | 'asPrimaryButton' | 'asSecondaryButton', icon?: React.ReactNode, href: string, label?: string } & React.HTMLAttributes<HTMLButtonElement>) {
	return <Link className={className} appearance={appearance} href={href}>{label}</Link>;
}

function CardImage({ className, src, alt, sizes, ...rest }: { src: string, alt?: string, sizes?: string, ariaHidden?: boolean } & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={classNames(styles.cardImageWrapper, className)} {...rest}>
			<Image src={src} alt={alt || ' '} fill sizes={sizes || '180px'} />
		</div>
	);
}

function CardTitle({ children, className, id, titleAs }: { titleAs: HtmlHeadingTag } & React.HTMLAttributes<HTMLTitleElement>) {
	return React.createElement(titleAs, { className: classNames(styles.cardTitle, className), id }, children );
}

Card.Button = CardButton;
Card.Content = CardContent;
Card.FakeLink = CardFakeLink;
Card.Image = CardImage;
Card.Link = CardLink;
Card.Title = CardTitle;

