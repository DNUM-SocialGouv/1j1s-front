import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';

type FootnoteProps = ComponentPropsWithoutRef<'p'> & {
	htmlFor: string,
};

const FootnoteComponent = forwardRef<HTMLParagraphElement, FootnoteProps>(function Footnote({
	children,
	htmlFor,
	...pProps
}, ref) {
	return (
		<p {...pProps} ref={ref}>
			<abbr title="note de pied de page">*</abbr><Link href={`#${htmlFor}`} title="Retour à la référence"><Icon name="angle-up" /></Link> {children}
		</p>
	);
});

type ReferenceProps = ComponentPropsWithoutRef<'a'> & {
	to: string,
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
