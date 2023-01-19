import React, { useState } from 'react';

import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';

import styles from './ConsulterAnnonce.module.scss';

const MAX_DESCRIPTION_LENGTH = 650;
const DESCRIPTION_LENGTH_THRESHOLD = 450;

interface BoutonEtendreProps {
	onClick: () => void
	estÉtendu: boolean
	'aria-controls': string
}

function BoutonEtendre({ onClick, estÉtendu, 'aria-controls': ariaControls }: BoutonEtendreProps) {
	return (
		<button
			className={styles.readMore}
			onClick={onClick}
			aria-expanded={estÉtendu}
			aria-controls={ariaControls}>
			{ estÉtendu
				? <TextIcon icon="angle-up">Afficher moins</TextIcon>
				: <TextIcon icon="angle-down">Lire la suite</TextIcon> }
		</button>
	);
}

type DescriptionDuLogementProps = {
	children: string
}

function cropDescription(description: string) {
	const premièreEspaceAprèsThreshold = description.indexOf(' ', DESCRIPTION_LENGTH_THRESHOLD);
	return description.slice(0, premièreEspaceAprèsThreshold);
}

export const DescriptionDuLogement = ({ children }: DescriptionDuLogementProps) => {
	const [ descriptionÉtendue, setDescriptionÉtendue ] = useState(false);
	const longueDescription = children.length > MAX_DESCRIPTION_LENGTH;
	let description = children;
	if (longueDescription && !descriptionÉtendue) {
		description = cropDescription(description) + ' …';
	}
	return (
		<section className={styles.card}>
			<h2>Description du Logement</h2>
			<p id="description-annonce">{description}</p>
			{longueDescription && (
				<BoutonEtendre
					onClick={() => setDescriptionÉtendue(!descriptionÉtendue)}
					estÉtendu={descriptionÉtendue}
					aria-controls="description-annonce" />
			)}
		</section>
	);
};
