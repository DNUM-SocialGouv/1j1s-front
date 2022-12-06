import classNames from 'classnames';
import React from 'react';

import { CardComponent } from '~/client/components/ui/Card/AbstractCard/CardComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';
import { AnnonceDeLogementIndexee } from '~/pages/annonces/AnnonceDeLogement.type';

import styles from './Annonce.module.scss';

interface HitProps {
  hit: AnnonceDeLogementIndexee
}

export const AnnonceDeLogement = (props : HitProps) => {
  const annonce  = props.hit;
  const dateDeLAnnonce = new Date(annonce.dateDeMiseAJour).toLocaleDateString();

  return <CardComponent layout='vertical'>
    <CardComponent.Image src={'/images/defaut-logement.webp'} className={styles.CardImageWrapper}/>

    <CardComponent.Content className={styles.CardContenu}>
      <span className={styles.CardContenuEnTete}>
        <div className={styles.CardContenuEnTeteType}>{annonce.type}</div>
        <div className={styles.CardContenuEnTeteDate}>postée le {dateDeLAnnonce}</div>
      </span>

	  <CardComponent.Title titleAs="h3">{annonce.titre}</CardComponent.Title>

	  <dl className={styles.CardDescription}>
        <dt>Surface</dt>
        <dd>{annonce.surfaceAAfficher}</dd>
        <dt>Prix</dt>
        <dd>{annonce.prix} €<sup>CC</sup></dd>
	  </dl>
    </CardComponent.Content>

    <span className={styles.CardFooter}>
      <TextIcon text={annonce.localisationAAfficher} icon={<Icon name="map-pin"/>} iconPosition='left'/>
      <Link href={annonce.url} key={annonce.slug}
        className={classNames('underline-none', styles.CardFooterCallToAction)} prefetch={false}>
        <TextIcon
		  text="Lire l'annonce"
		  icon={<Icon name="external-redirection"/>}
        />
      </Link>
    </span>
  </CardComponent>;
};
