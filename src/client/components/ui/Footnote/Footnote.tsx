import { ComponentPropsWithoutRef, forwardRef } from 'react';

type FootnoteProps = ComponentPropsWithoutRef<'p'>;

const FootnoteComponent = forwardRef<HTMLParagraphElement, FootnoteProps>(function Footnote({
	...pProps
}, ref) {
	return <p {...pProps} ref={ref}/>;
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
