import React from 'react';

import { DescriptionDuLogement } from '~/client/components/features/Logement/Consulter/DescriptionDuLogement';
import { Container } from '~/client/components/layouts/Container/Container';
import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';

import styles from './ConsulterAnnonce.module.scss';
import { DateMiseÀJour } from './DateMiseÀJour';

interface ConsulterAnnonceDeLogementProps {
	annonceDeLogement: AnnonceDeLogement
}

function AnnonceEntête({ children }: { children: React.ReactNode }) {
	return (
		<header className={styles.entête}>
			{children}
		</header>
	);
}

function TypeBien({ children }: { children: React.ReactNode }) {
	return <span className={styles.type}>{children}</span>;
}

export function ConsulterAnnonce({ annonceDeLogement }: ConsulterAnnonceDeLogementProps) {
	const { dateDeMiseAJour, type, typeBien, titre, description } = annonceDeLogement;
	return (
		<Container className={styles.annonce}>
			<main id="contenu">
				<AnnonceEntête>
					<h1>{titre}</h1>
					<DateMiseÀJour date={new Date(dateDeMiseAJour)}/>
					<TypeBien>{type} - {typeBien}</TypeBien>
				</AnnonceEntête>
				<DescriptionDuLogement>{description}</DescriptionDuLogement>
			</main>
		</Container>
	);
}
