import React from 'react';

import { ButtonRetour } from '~/client/components/features/ButtonRetour/ButtonRetour';
import { BilanEnergetiqueLogement } from '~/client/components/features/Logement/Consulter/BilanEnergetiqueLogement';
import { DescriptionDuLogement } from '~/client/components/features/Logement/Consulter/DescriptionDuLogement';
import { InformationsGénérales } from '~/client/components/features/Logement/Consulter/InformationsGénérales';
import { Container } from '~/client/components/layouts/Container/Container';
import { Image as ImageProps } from '~/client/components/props';
import { Carousel } from '~/client/components/ui/Carousel/Carousel';
import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';

import styles from './ConsulterAnnonce.module.scss';
import { DateMiseÀJour } from './DateMiseÀJour';

interface ConsulterAnnonceDeLogementProps {
    annonceDeLogement: AnnonceDeLogement
}

function AnnonceEntête({ children }: { children: React.ReactNode }) {
	return (
		<Container className={styles.entête}>
			<header className={styles.displayContents}>
				{children}
			</header>
		</Container>
	);
}

function TypeBien({ children }: { children: React.ReactNode }) {
	return <span className={styles.type}>{children}</span>;
}

export function ConsulterAnnonce({ annonceDeLogement }: ConsulterAnnonceDeLogementProps) {
	const { dateDeMiseAJour, type, typeBien, titre, description, imageUrlList, bilanEnergetique } = annonceDeLogement;
	return (
		<main id="contenu" className={styles.gridLayout}>
			<ButtonRetour className={styles.boutonRetour}/>
			<AnnonceCarousel imageUrlList={imageUrlList}/>
			<AnnonceEntête>
				<h1>{titre}</h1>
				<DateMiseÀJour date={new Date(dateDeMiseAJour)}/>
				<TypeBien>{type} - {typeBien}</TypeBien>
			</AnnonceEntête>
			<Container>
				<InformationsGénérales annonce={annonceDeLogement}/>
				<DescriptionDuLogement>{description}</DescriptionDuLogement>
				<BilanEnergetiqueLogement
					consommationEnergetique={bilanEnergetique.consommationEnergetique}
					emissionDeGaz={bilanEnergetique.emissionDeGaz}
				/>
			</Container>
		</main>
	);
}

const AnnonceCarousel = ({ imageUrlList }: { imageUrlList: Array<ImageProps> | [] }) => {
	const MAX_IMAGE_WIDTH = 720;
	const MAX_IMAGE_HEIGHT = 400;

	return <div className={styles.carouselWrapper}>
		<Carousel
			imageList={imageUrlList}
			imageListLabel="liste des photos du logement"
			className={styles.carousel}
			aria-hidden
			hideIndicators
			imagesSize={{ height: MAX_IMAGE_HEIGHT, width: MAX_IMAGE_WIDTH }}
		/>
	</div>;
};
