import { Title } from '@dataesr/react-dsfr';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import styles from '~/client/components/ui/ServiceCard/ServiceCardComponent.module.css';

interface ServiceCardProps {
    id: number,
    logo: string,
    header: string,
    text: string,
    title: string,
    link: string,
}

const serviceCivique: ServiceCardProps =
    {
      header: 'Service Civique Header',
      id: 0,
      link: 'https://www.service-civique.gouv.fr/trouver-ma-mission?page=1',
      logo: '/images/service-civique.svg',
      text: 'Avec ou sans diplôme, engagez vous dans des missions d\'intérêt général en France ou à l\'étranger. Indemnisé 580€ / mois, il vous permettra d\'acquérir ou de développer vos compétences dans de nombreux domaines.(Ouvert aux 16-25 ans. 30 ans pour les jeunes en situation de handicap)',
      title: 'Le Service Civique, pour acquérir de l\'expérience et préparer son avenir',
    };

const bonneBoite: ServiceCardProps =
    {
      header: 'bonneBoite Header',
      id: 1,
      link: 'https://labonneboite.pole-emploi.fr/',
      logo: '/images/bonne-boite.svg',
      text: 'N’envoyez plus vos CV au hasard ! Identifiez et contactez les entreprises qui peuvent être susceptibles de recruter même si elles n’ont pas déposé d’offres. Nos outils détectent les entreprises qui vont probablement embaucher dans les 6 prochains mois.',
      title: 'Et si vous contactiez directement les entreprises ?',
    };

const centreInfoJeunesse: ServiceCardProps =
    {
      header: 'centreInfoJeunesse Header',
      id: 2,
      link: 'https://www.cidj.com/orientation-metiers',
      logo: '/images/cidj.svg',
      text: 'Renseignez-vous sur les différents secteurs d\'activités et métiers avec le CIDJ. Vous y trouverez des fiches métiers par secteur, centre d\'intérêt et opportunités de recrutement afin d\'affiner vos choix d\'orientation.',
      title: 'Besoin d’informations sur les métiers ?',
    };

function ServiceCard(props: ServiceCardProps){
  const { logo, text, link, title } = props;
  return(
    <Link href={`${link}`}>
      <a className={styles.card} data-testid="RésultatServiceCard">
        <header className={styles.cardHeader}>
          <Image alt="" src={logo} width="140" height="80"/>
        </header>
        <div className={styles.cardBody}>
          <Title as='h2' look='h6'>{title}</Title>
          <p>{text}</p>
        </div>

      </a>
    </Link>
  );
}

export function ServiceCardComponent() {
  const services: ServiceCardProps[] = [centreInfoJeunesse, bonneBoite, serviceCivique];
  return(
    <ul className={styles.résultatRechercheOffreEmploiList}>
      {services.map((service: ServiceCardProps) => {
        return (
          <li key={service.id}>
            <ServiceCard {...service}/>
          </li>
        );
      })}
    </ul>
  );
}
