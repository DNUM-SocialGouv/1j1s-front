import React from 'react';

import styles from './ConsulterAnnonce.module.scss';

type DescriptionDuLogementProps = {
	children: string,
}

export const DescriptionDuLogement = ({ children }: DescriptionDuLogementProps) => {
	const longueDescription = children.length > 650;
	let description = children;
	if (longueDescription) {
		description = description.slice(0, 644) + ' [...]';
	}
	return (
		<section className={styles.card}>
			<h2>Description du Logement</h2>
			<p>{description}</p>
		</section>
	);
};
