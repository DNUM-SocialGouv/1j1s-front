import React, { useState } from 'react';

import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';

import styles from './ConsulterAnnonce.module.scss';

function BoutonEtendre({ onClick }: { onClick: () => void }) {
	return (
		<button className={styles.readMore} onClick={onClick}>
			<TextIcon icon="angle-down">Lire la suite</TextIcon>
		</button>
	);
}

type DescriptionDuLogementProps = {
	children: string,
}

export const DescriptionDuLogement = ({ children }: DescriptionDuLogementProps) => {
	const [ descriptionÉtendue, setDescritionÉtendue ] = useState(false);
	const longueDescription = children.length > 650;
	let description = children;
	if (longueDescription && !descriptionÉtendue) {
		description = description.slice(0, 644) + ' [...]';
	}
	return (
		<section className={styles.card}>
			<h2>Description du Logement</h2>
			<p>{description}</p>
			{longueDescription && <BoutonEtendre onClick={() => setDescritionÉtendue(!descriptionÉtendue)}/>}
		</section>
	);
};
