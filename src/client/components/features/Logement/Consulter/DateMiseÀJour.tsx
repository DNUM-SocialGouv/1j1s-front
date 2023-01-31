import React from 'react';

import { useLocale } from '~/client/context/locale.context';

import styles from './ConsulterAnnonce.module.scss';

export function DateMiseÀJour(props: { date: Date }) {
	const locale = useLocale();
	const { date } = props;
	return (
		<span className={styles.date}>
			Annonce mise à jour le <time dateTime={date.toISOString()} lang={locale}>
				{date.toLocaleDateString(locale, { dateStyle: 'long' })}
			</time>
		</span>
	);
}

