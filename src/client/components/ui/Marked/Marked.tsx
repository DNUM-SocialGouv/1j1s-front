import classNames from 'classnames';
import { marked } from 'marked';
import React, { useMemo } from 'react';

import styles from '~/client/components/ui/Marked/Marked.module.scss';

interface MarkedProps extends React.ComponentPropsWithoutRef<'div'> {
	markdown: string
}

export default function Marked({ markdown, className, ...rest }: MarkedProps) {
	const html = useMemo(() => ({ __html: marked.parse(markdown) }), [markdown]);
	return (<div dangerouslySetInnerHTML={html} className={classNames(styles.markdown, className)} {...rest} />);
}
