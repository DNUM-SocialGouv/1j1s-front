import classNames from 'classnames';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';

import styles from './Footnote.module.scss';

type FootnoteProps = Omit<ComponentPropsWithoutRef<'p'>, 'id'> & {
	htmlFor: string,
	id: string,
};

const FootnoteComponent = forwardRef<HTMLParagraphElement, FootnoteProps>(function Footnote({
	children,
	htmlFor,
	className,
	...pProps
}, ref) {
	return (
		<p {...pProps} className={classNames(className, styles.footnote)} ref={ref}>
			<abbr title="note de pied de page">*</abbr> {children} <Link href={`#${htmlFor}`} title="Retour à la référence"><Icon name="angle-up" /></Link>
		</p>
	);
});

type ReferenceProps = Omit<ComponentPropsWithoutRef<'a'>, 'id'> & {
	to: string,
	id: string,
};

const Reference = forwardRef<HTMLAnchorElement, ReferenceProps>(function Reference({
	to,
	...aProps
}, ref) {
	return (
		<a href={`#${to}`} title="note de pied de page" {...aProps} ref={ref}>
			<abbr title="note de pied de page">*</abbr>
		</a>
	);
});

export const Footnote = Object.assign(FootnoteComponent, { Reference });
