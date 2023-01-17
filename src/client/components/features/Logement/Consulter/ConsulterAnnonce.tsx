import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';

import styles from './ConsulterAnnonce.module.scss';
import { DateMiseÀJour } from './DateMiseÀJour';

interface ConsulterAnnonceDeLogementProps {
	annonceDeLogement: AnnonceDeLogement
}

export function ConsulterAnnonce({ annonceDeLogement }: ConsulterAnnonceDeLogementProps) {
	const { dateDeMiseAJour, type, typeBien, titre } = annonceDeLogement;
	return (
		<main id="contenu">
			<Container>
				<header className={styles.annonceEntête}>
					<h1>{titre}</h1>
					<DateMiseÀJour date={new Date(dateDeMiseAJour)} />
					<span className={styles.type}>{type} - {typeBien}</span>
				</header>
			</Container>
		</main>
	);
}
