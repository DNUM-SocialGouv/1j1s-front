import React from 'react';

import { JsDateService } from '~/client/services/date/js/js.date.service';

import styles from './ConsulterAnnonce.module.scss';

export function DateMiseÀJour({ date }: { date: string }) {
	const dateToFormat = new Date(date);
	const dateService = new JsDateService();
	return (
		<span className={styles.date}>
			Annonce mise à jour le <time dateTime={dateToFormat.toISOString()}>
				{dateService.formatToHumanReadableDate(dateToFormat)}
			</time>
		</span>
	);
}

