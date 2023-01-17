import React from 'react';

import styles from './ConsulterAnnonce.module.scss';

function formatDate(date: Date): string {
	const day = date.toLocaleDateString(undefined, { day: '2-digit' });
	const month = date.toLocaleDateString(undefined, { month: '2-digit' });
	const year = date.toLocaleDateString(undefined, { year: 'numeric' });
	return `${day}.${month}.${year}`;
}
export function DateMiseÀJour(props: { date: Date }) {
	const { date } = props;
	return (
		<span className={styles.date}>
			Annonce mise à jour le <time dateTime={date.toISOString()}>
				{formatDate(date)}
			</time>
		</span>
	);
}

