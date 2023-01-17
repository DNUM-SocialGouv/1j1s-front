import classNames from 'classnames';
import React, { useMemo } from 'react';

import styles from '~/client/components/features/Logement/Annonce.module.scss';
import { HitProps } from '~/client/components/layouts/InstantSearch/InstantSearchLayout';
import { Card } from '~/client/components/ui/Card/Card';
import { Carousel } from '~/client/components/ui/Carousel/Carousel';
import { Link } from '~/client/components/ui/Link/Link';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';
import { AnnonceDeLogementIndexee } from '~/server/cms/domain/annonceDeLogement.type';

export const AnnonceDeLogement = (props : HitProps<AnnonceDeLogementIndexee>) => {
	const annonce  = props.hit;
	const dateDeLAnnonce = new Date(annonce.dateDeMiseAJour).toLocaleDateString();

	return (
		<Card layout="vertical">
			<CardImage imageSrcList={annonce.imagesUrl} />

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
				<Link href={`/annonces/${annonce.slug}`} key={annonce.slug}
					className={classNames('underline-none', styles.CardFooterCallToAction)} prefetch={false}>
					<TextIcon icon="external-redirection">Lire l‘annonce</TextIcon>
				</Link>
			</span>
		</Card>
	);
};

type ImageSrcListProps = Array<string>

const CardImage = (props: { imageSrcList: ImageSrcListProps} ) => {
	const { imageSrcList } = props;
	const hasNoImage = imageSrcList.length === 0;
	const hasOnlyOneImage = imageSrcList.length === 1;

	if (hasNoImage) return <Card.Image src={'/images/defaut-logement.webp'} className={styles.CardImageWrapper}/>;
	if (hasOnlyOneImage) return <Card.Image src={imageSrcList[0]} className={styles.CardImageWrapper}/>;
	return <CardAnnonceCarousel imageSrcList={imageSrcList} />;
};

const CardAnnonceCarousel = (props: { imageSrcList: ImageSrcListProps} ) => {
	const { imageSrcList } = props;
	const formattedList = imageSrcList.map((url) => ({ alt: '', src: url }));
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
