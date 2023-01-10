import classNames from 'classnames';
import React, { useMemo } from 'react';

import styles from '~/client/components/features/Logement/Annonce.module.scss';
import { AnnonceDeLogementIndexee } from '~/client/components/features/Logement/AnnonceDeLogement.type';
import { HitProps } from '~/client/components/layouts/InstantSearch/InstantSearchLayout';
import { Card } from '~/client/components/ui/Card/Card';
import { CardComponent } from '~/client/components/ui/Card/AbstractCard/CardComponent';
import { Carousel } from '~/client/components/ui/Carousel/Carousel';
import { Link } from '~/client/components/ui/Link/Link';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';

export const AnnonceDeLogement = (props : HitProps<AnnonceDeLogementIndexee>) => {
	const annonce  = props.hit;
	const dateDeLAnnonce = new Date(annonce.dateDeMiseAJour).toLocaleDateString();

	return (
		<CardComponent layout="vertical">
			<CardImage imageListUrl={annonce.imagesUrl} />

			<Card.Content className={styles.CardContenu}>
				<span className={styles.CardContenuEnTete}>
					<div className={styles.CardContenuEnTeteType}>{annonce.type}</div>
					<div className={styles.CardContenuEnTeteDate}>postée le {dateDeLAnnonce}</div>
				</span>

				<Card.Title titleAs="h3">{annonce.titre}</Card.Title>

				<dl className={styles.CardDescription}>
					<dt>Surface</dt>
					<dd>{annonce.surfaceAAfficher}</dd>
					<dt>Prix</dt>
					<dd>{annonce.prix} {annonce.devise}<sup>CC</sup></dd>
				</dl>
			</Card.Content>

			<span className={styles.CardFooter}>
				<TextIcon icon="map-pin" iconPosition="left">{annonce.localisationAAfficher}</TextIcon>
				<Link href={annonce.url} key={annonce.slug}
					className={classNames('underline-none', styles.CardFooterCallToAction)} prefetch={false}>
					<TextIcon icon="external-redirection">Lire l‘annonce</TextIcon>
				</Link>
			</span>
		</Card>
	);
};

const CardImage = (props: { imageListUrl: Array<string>} ) => {
	const { imageListUrl } = props;

	if (imageListUrl.length === 0) return <CardComponent.Image src={'/images/defaut-logement.webp'} className={styles.CardImageWrapper}/>;
	if (imageListUrl.length === 1) return <CardComponent.Image src={imageListUrl[0]} className={styles.CardImageWrapper}/>;
	return <CardAnnonceCarousel imageListUrl={imageListUrl} />;
};

const CardAnnonceCarousel = (props: { imageListUrl: Array<string>} ) => {
	const { imageListUrl } = props;
	const formattedList = imageListUrl.map((url) => ({ alt: '', src: url }));
	const firstFourthImages = useMemo(() => formattedList.slice(0, 4), [formattedList]);

	return (
		<Carousel
			imageList={firstFourthImages}
			imageListLabel="liste des photos du logement"
			className={styles.CardImageWrapper}
			aria-hidden
		/>
	);
};
