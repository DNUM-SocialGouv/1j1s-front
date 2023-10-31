import classNames from 'classnames';
import Image from 'next/image';
import React, { useMemo } from 'react';

import styles from '~/client/components/features/Logement/Annonce.module.scss';
import { HitProps } from '~/client/components/layouts/InstantSearch/InstantSearchLayout';
import { Card } from '~/client/components/ui/Card/Card';
import { Carousel } from '~/client/components/ui/Carousel/Carousel';
import { Link } from '~/client/components/ui/Link/Link';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';
import { AnnonceDeLogementIndexee } from '~/server/cms/domain/annonceDeLogement.type';

const TYPE_DE_LOGEMENT_INTERGENERATIONNEL = 'habitation intergénérationnelle';

export function AnnonceDeLogement(props: HitProps<AnnonceDeLogementIndexee>) {
	const annonce = props.hit;
	const typeDeLogement = annonce.type === TYPE_DE_LOGEMENT_INTERGENERATIONNEL ? 'intergénérationnel' : annonce.type;
	const dateDeLAnnonce = new Date(annonce.dateDeMiseAJour).toLocaleDateString();

	return (
		<Card layout="vertical">
			<CardImage imageSrcList={annonce.imagesUrl}/>

			<Card.Content className={styles.CardContenu}>
				<span className={styles.CardContenuEnTete}>
					<span className={styles.CardContenuEnTeteType}>{typeDeLogement}</span>
					<span className={styles.CardContenuEnTeteDate}>postée le {dateDeLAnnonce}</span>
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
				<TextIcon
					icon="map-pin"
					iconPosition="left"
					className={styles.localisation}
				>
					<span>{annonce.localisationAAfficher}</span>
				</TextIcon>
				<Link
					href={`/logements/annonces/${annonce.slug}`}
					key={annonce.slug}
					className={classNames('underline-none', styles.CardFooterCallToAction)}
					prefetch={false}
				>
					<TextIcon icon="arrow-right">Lire l‘annonce</TextIcon>
				</Link>
			</span>
		</Card>
	);
}

type ImageSrcListProps = Array<string>

function CardImage(props: { imageSrcList: ImageSrcListProps }) {
	const { imageSrcList } = props;
	const hasNoImage = imageSrcList.length === 0;
	const hasOnlyOneImage = imageSrcList.length === 1;

	if (hasNoImage) return <div className={styles.CardImageWrapper}>
		<Image src={'/images/image-par-defaut-carte.webp'} alt="" width={360} height={180}/>
	</div>;

	if (hasOnlyOneImage) return <div className={styles.CardImageWrapper}>
		<Image src={imageSrcList[0]} alt="" width={360} height={180}/>
	</div>;

	return <CardAnnonceCarousel imageSrcList={imageSrcList}/>;
}

const CardAnnonceCarousel = (props: { imageSrcList: ImageSrcListProps }) => {
	const { imageSrcList } = props;
	const formattedList = imageSrcList.map((src) => ({ alt: undefined, src }));
	const MAX_IMAGE_WIDTH = 360;
	const MAX_IMAGE_HEIGHT = 180;
	const firstFourthImages = useMemo(() => formattedList.slice(0, 4), [formattedList]);

	return (
		<Carousel
			imageList={firstFourthImages}
			imageListLabel="liste des photos du logement"
			className={styles.CardImageWrapper}
			imagesSize={{ height: MAX_IMAGE_HEIGHT, width: MAX_IMAGE_WIDTH }}
			aria-label="Photos du logement"
		/>
	);
};
