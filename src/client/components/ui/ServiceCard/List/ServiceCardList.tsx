import { Title } from '@dataesr/react-dsfr';
import React from 'react';

import styles from '~/client/components/ui/ServiceCard/List/ServiceCardList.module.css';
import { ServiceCard } from '~/client/components/ui/ServiceCard/ServiceCardComponent';

export function ServiceCardlist() {
  return(
    <div className={styles.serviceCardList}>
      <ServiceCard logo={'/images/cidj.svg'}
        alt={'Logo du centre d\'information et de documentation pour la jeunesse'}
        link={'https://www.cidj.com/orientation-metiers'}>
        <Title as='h2' look='h6'>Besoin d&apos;informations sur les métiers ?</Title>
        <p><b style={{ color: '#5F2885' }}>Renseignez-vous sur les différents secteurs d&apos;activité et métiers avec le CIDJ.</b> Vous
                y trouverez des fiches métiers par secteur, centre d&apos;intérêt et opportunités de recrutement afin
                d&apos;affiner vos choix d&apos;orientation.</p>
      </ServiceCard>
      <ServiceCard logo={'/images/bonne-boite.svg'} alt={'Logo de la bonne boîte'}
        link={'https://labonneboite.pole-emploi.fr/'}>
        <Title as='h2' look='h6'>Et si vous contactiez directement les entreprises ?</Title>
        <p><b style={{ color: '#C7297E' }}>N&apos;envoyez plus vos CV au hasard !</b> Identifiez et contactez
                les entreprises qui peuvent être susceptibles de recruter même si elles n&apos;ont pas déposé
                d&apos;offres. Nos outils détectent les entreprises qui vont probablement embaucher dans les 6 prochains
                mois.</p>
      </ServiceCard>
      <ServiceCard logo={'/images/service-civique.svg'} alt={'Logo du service civique'}
        link={'https://www.service-civique.gouv.fr/trouver-ma-mission?page=1'}>
        <Title as='h2' look='h6'>Le Service Civique, pour acquérir de l&apos;expérience et préparer son
                avenir</Title>
        <p><b style={{ color: '#0C7EC4' }}>Avec ou sans diplôme, engagez-vous dans des missions d&apos;intérêt général en France ou à l&apos;étranger.</b> Indemnisé
                580€/mois, il vous permettra d&apos;acquérir ou de développer vos compétences dans de nombreux
                domaines.(Ouvert aux 16-25 ans. 30 ans pour les jeunes en situation de handicap)</p>
      </ServiceCard>
    </div>
  );}
