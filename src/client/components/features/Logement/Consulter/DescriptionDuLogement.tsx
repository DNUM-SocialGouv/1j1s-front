import React, { useState } from 'react';

import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';

import styles from './ConsulterAnnonce.module.scss';

const MAX_DESCRIPTION_LENGTH = 650;
const DESCRIPTION_LENGTH_THRESHOLD = 450;

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
	const longueDescription = children.length > MAX_DESCRIPTION_LENGTH;
	let description = children;
	if (longueDescription && !descriptionÉtendue) {
		description = description.slice(0, DESCRIPTION_LENGTH_THRESHOLD) + ' [...]';
	}
	return (
		<section className={styles.card}>
			<h2>Description du Logement</h2>
			<p>{description}</p>
			{longueDescription && <BoutonEtendre onClick={() => setDescritionÉtendue(!descriptionÉtendue)}/>}
		</section>
	);
};
