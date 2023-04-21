import { ComponentPropsWithoutRef, forwardRef } from 'react';

type FootnoteProps = ComponentPropsWithoutRef<'p'>;

const FootnoteComponent = forwardRef<HTMLParagraphElement, FootnoteProps>(function Footnote({
	...pProps
}, ref) {
	return <p {...pProps} ref={ref}/>;
});

type ReferenceProps = ComponentPropsWithoutRef<'a'>;

const Reference = forwardRef<HTMLAnchorElement, ReferenceProps>(function Reference({
	...aProps
}, ref) {
	return <a {...aProps} ref={ref}>*</a>;
});

export const Footnote = Object.assign(FootnoteComponent, { Reference });
