import classNames from 'classnames';
import Image from 'next/image';
import React, { useMemo } from 'react';

import { HtmlHeadingTag } from '~/client/components/props';
import { ButtonComponent, ButtonComponentProps } from '~/client/components/ui/Button/ButtonComponent';
import { Link } from '~/client/components/ui/Link/Link';

import styles from './Card.module.scss';

interface CardProps {
	layout: 'horizontal' | 'vertical'
}

export function Card({ children, className, layout, ...rest }: CardProps & React.ComponentPropsWithoutRef<'div'>) {
	const layoutClass = useMemo(() => {
		switch (layout) {
			case 'horizontal':
				return styles.cardComponentHorizontal;
			case 'vertical':
				return styles.cardComponentVertical;
		}
	}, [layout]);

	return (
		<div className={classNames(styles.cardComponent, layoutClass, className)} {...rest}>
			{children}
		</div>
	);
}

function CardContent({ children, className, ...rest }: React.ComponentPropsWithoutRef<'div'>) {
	return <div className={className} {...rest}>{children}</div>;
}

function CardButton(props: React.ComponentPropsWithoutRef<typeof ButtonComponent>) {
	const { appearance = 'tertiary', className, icon, label, ...rest } = props;
	return <ButtonComponent
		className={className}
		appearance={appearance}
		label={label || ''}
		icon={icon}
		iconPosition={'right'} {...rest}
	/>;
}

type CardCallToActionProps = Required<Pick<ButtonComponentProps, 'appearance' | 'label'>>
	& { icon: React.ReactNode }

function CardFakeLink(props: CardCallToActionProps & React.ComponentPropsWithoutRef<'span'>) {
	const { appearance = 'quaternary', className, icon, label, ...rest } = props;
	const appearanceClass = useMemo(() => {
		switch (appearance) {
			case 'primary':
				return styles.cardButtonPrimary;
			case 'secondary':
				return styles.cardButtonSecondary;
			case 'tertiary':
				return styles.cardButtonTertiary;
			case 'quaternary':
				return styles.cardButtonQuaternary;
		}
	}, [appearance]);

	return (
		<span className={classNames(className, appearanceClass, styles.cardButton)} {...rest}>
			<span>{label}</span>
			{icon}
		</span>
	);
}

interface CardLinkProps {
	icon?: React.ReactNode
	href: string
	label?: string
}

function CardLink(props: CardLinkProps & React.ComponentPropsWithoutRef<typeof Link>) {
	const { className, href, label, ...rest } = props;
	return <Link className={classNames(className, styles.cardLink)} href={href} {...rest}>{label}</Link>;
}

interface CardImageProps {
	src: string;
	alt?: string;
	sizes?: string;
	ariaHidden?: boolean;
}

function CardImage(props: CardImageProps & React.ComponentPropsWithoutRef<'div'>) {
	const { className, src, alt = '', sizes = '100vw', ...rest } = props;
	return (
		<div className={classNames(styles.cardImageWrapper, className)} {...rest}>
			<Image src={src} alt={alt} fill={true} sizes={sizes}/>
		</div>
	);
}

function CardTitle(props: { titleAs: HtmlHeadingTag } & React.ComponentPropsWithoutRef<HtmlHeadingTag>) {
	const { children, className, titleAs, ...rest } = props;
	return React.createElement(titleAs, { className: classNames(styles.cardTitle, className), ...rest }, children);
}

Card.Button = CardButton;
Card.Content = CardContent;
Card.FakeLink = CardFakeLink;
Card.Image = CardImage;
Card.Link = CardLink;
Card.Title = CardTitle;
