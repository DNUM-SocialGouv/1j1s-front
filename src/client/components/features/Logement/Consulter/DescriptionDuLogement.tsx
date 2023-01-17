import React from 'react';

import styles from './ConsulterAnnonce.module.scss';

type DescriptionDuLogementProps = {
	children: React.ReactNode,
}

export const DescriptionDuLogement = ({ children }: DescriptionDuLogementProps) => {
	return (
		<section className={styles.card}>
			<h2>Description du Logement</h2>
			<p>{children}</p>
		</section>
	);
};
