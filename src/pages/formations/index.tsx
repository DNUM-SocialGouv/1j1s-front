import React from 'react';

import { PartnerCardList } from '~/client/components/features/Partner/Card/PartnerCard';
import { CIDJPartner } from '~/client/components/features/Partner/CIDJPartner';
import { MétierDuSoinPartner } from '~/client/components/features/Partner/MétiersDuSoinPartner';
import { MonCompteFormationPartner } from '~/client/components/features/Partner/MonCompteFormationPartner';
import { ParcourSupPartner } from '~/client/components/features/Partner/ParcourSupPartner';
import { HeroWithButtonLink } from '~/client/components/ui/Hero/HeroWithButtonLink';
import { HeadTag } from '~/client/components/utils/HeaderTag';

import styles from './Formations.module.scss';

export default function FormationPage() {
  return (
    <>
      <HeadTag title="Rechercher une formation | 1jeune1solution"/>
      <HeroWithButtonLink
        titre={heroFormationTitle()}
        content={heroFormationContent()}
        buttonHref="https://reseau.intercariforef.org/"
        buttonLabel="Je trouve ma formation"
        imgSrc="/images/banners/mentorat.jpg"
      />
      {PartnerCardList([
        MonCompteFormationPartner().props,
        ParcourSupPartner().props,
        CIDJPartner().props,
        MétierDuSoinPartner().props,
      ])}
    </>
  );
};

function heroFormationTitle() {
  return(
    <>
      <b>Trouvez la formation pour réaliser</b>
      <span className={styles.heroText}> votre projet professionnel</span>
    </>
  );
};

function heroFormationContent() {
  return(
    <>
      <span>Vous recherchez une formation qualifiante pour préparer au mieux votre entrée, votre maintien ou votre retour sur le marché du travail ? Grâce au moteur de recherche Carif Oref,</span>
      <b> trouvez la formation qu’il vous faut en fonction de sa localisation, du type de métier auquel vous souhaitez être préparé, du niveau de qualification souhaité et bien plus encore !</b>
    </>
  );
};


export async function getStaticProps() {
  return {
    props: {},
  };
}
