import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/features/Logement/Annonce.module.scss';
import { AnnonceDeLogementIndexee } from '~/client/components/features/Logement/AnnonceDeLogement.type';
import { HitProps } from '~/client/components/layouts/InstantSearch/InstantSearchLayout';
import { CardComponent } from '~/client/components/ui/Card/AbstractCard/CardComponent';
import { Link } from '~/client/components/ui/Link/Link';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';

export const AnnonceDeLogement = (props : HitProps<AnnonceDeLogementIndexee>) => {
  const annonce  = props.hit;
  const dateDeLAnnonce = new Date(annonce.dateDeMiseAJour).toLocaleDateString();

  return (
    <CardComponent layout="vertical">
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
        <TextIcon icon="map-pin" iconPosition="left">{annonce.localisationAAfficher}</TextIcon>
        <Link href={annonce.url} key={annonce.slug}
          className={classNames('underline-none', styles.CardFooterCallToAction)} prefetch={false}>
          <TextIcon icon="external-redirection">Lire l‘annonce</TextIcon>
        </Link>
      </span>
    </CardComponent>
  );
};
