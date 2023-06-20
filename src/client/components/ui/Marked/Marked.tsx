import classNames from 'classnames';
import React, { useMemo } from 'react';

import { getHtmlFromMd } from '~/client/components/ui/Marked/getHtmlFromMd';
import styles from '~/client/components/ui/Marked/Marked.module.scss';

interface MarkedProps extends React.ComponentPropsWithoutRef<'div'> {
	markdown: string
}

export default function Marked({ markdown, className, ...rest }: MarkedProps) {
	const html = useMemo(() => ({ __html: getHtmlFromMd(markdown) }), [markdown]);
	return (<div dangerouslySetInnerHTML={html} className={classNames(styles.markdown, className)} {...rest} />);
}
