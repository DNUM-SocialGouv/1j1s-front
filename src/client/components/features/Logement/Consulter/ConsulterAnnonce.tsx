import Image from 'next/image';
import React from 'react';

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
		<header className={styles.entête}>
			{children}
		</header>
	);
}

function TypeBien({ children }: { children: React.ReactNode }) {
	return <span className={styles.type}>{children}</span>;
}

export function ConsulterAnnonce({ annonceDeLogement }: ConsulterAnnonceDeLogementProps) {
	const { dateDeMiseAJour, type, typeBien, titre, description, imageUrlList } = annonceDeLogement;
	return (
		<main id="contenu">
			<ConsulterAnnonceCarousel imageUrlList={imageUrlList} />
			<Container className={styles.annonce}>
				<AnnonceEntête>
					<h1>{titre}</h1>
					<DateMiseÀJour date={new Date(dateDeMiseAJour)}/>
					<TypeBien>{type} - {typeBien}</TypeBien>
				</AnnonceEntête>
				<InformationsGénérales annonce={annonceDeLogement} />
				<DescriptionDuLogement>{description}</DescriptionDuLogement>
			</Container>
		</main>
	);
}

const ConsulterAnnonceCarousel = ({ imageUrlList }: { imageUrlList: Array<ImageProps> | []}) => {
	const hasNoImage = imageUrlList.length === 0;
	const hasOnlyOneImage = imageUrlList.length === 1;
	const AVERAGE_IMAGE_WIDTH = 720;
	const AVERAGE_IMAGE_HEIGHT = 400;

	if (hasNoImage) return null;
	if (hasOnlyOneImage) return <Image src={imageUrlList[0].src} alt={imageUrlList[0].alt} width={AVERAGE_IMAGE_WIDTH} height={AVERAGE_IMAGE_HEIGHT} />;

	return <div className={styles.carouselWrapper}>
		<Carousel
			imageList={imageUrlList}
			imageListLabel="liste des photos du logement"
			className={styles.carousel}
			aria-hidden
			hideIndicators
			imageSizes={{ height: AVERAGE_IMAGE_HEIGHT, width: AVERAGE_IMAGE_WIDTH }}
		/>
	</div>;
};
