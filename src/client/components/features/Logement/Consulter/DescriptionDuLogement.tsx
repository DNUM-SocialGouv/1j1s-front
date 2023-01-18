import React, { useState } from 'react';

import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';

import styles from './ConsulterAnnonce.module.scss';

const MAX_DESCRIPTION_LENGTH = 650;
const DESCRIPTION_LENGTH_THRESHOLD = 450;

interface BoutonEtendreProps {
	onClick: () => void;
	estÉtendu: boolean;
}

function BoutonEtendre({ onClick, estÉtendu }: BoutonEtendreProps) {
	return (
		<button className={styles.readMore} onClick={onClick}>
			{ estÉtendu
				? <TextIcon icon="angle-up">Afficher moins</TextIcon>
				: <TextIcon icon="angle-down">Lire la suite</TextIcon> }
		</button>
	);
}

type DescriptionDuLogementProps = {
	children: string,
}

function cropDescription(description: string) {
	const premièreEspaceAprèsThreshold = description.indexOf(' ', DESCRIPTION_LENGTH_THRESHOLD);
	return description.slice(0, premièreEspaceAprèsThreshold);
}

export const DescriptionDuLogement = ({ children }: DescriptionDuLogementProps) => {
	const [ descriptionÉtendue, setDescritionÉtendue ] = useState(false);
	const longueDescription = children.length > MAX_DESCRIPTION_LENGTH;
	let description = children;
	if (longueDescription && !descriptionÉtendue) {
		description = cropDescription(description) + ' [...]';
	}
	return (
		<section className={styles.card}>
			<h2>Description du Logement</h2>
			<p>{description}</p>
			{longueDescription && (
				<BoutonEtendre
					onClick={() => setDescritionÉtendue(!descriptionÉtendue)}
					estÉtendu={descriptionÉtendue} />
			)}
		</section>
	);
};
