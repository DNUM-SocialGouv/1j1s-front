import React from 'react';

import { HeroWithButtonLink } from '~/client/components/ui/Hero/HeroWithButtonLink';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import styles from '~/pages/creer-mon-cv/Créer-cv.module.scss';

export default function FormationPage() {
  return (
    <>
      <HeadTag title="Créer mon CV personnalisé | 1jeune1solution"/>
      <HeroWithButtonLink
        titre={heroCVTitle()}
        content={heroCVContent()}
        buttonHref="https://cv.1jeune1solution.beta.gouv.fr/#/connexion"
        buttonLabel="Je crée mon CV"
        imgSrc="/images/banners/créer-cv.jpg"
      />
    </>
  );
};

function heroCVTitle() {
  return(
    <>
      <b>Je crée un CV personnalisé qui valorise mes compétences</b>
      <span className={styles.heroText}> et s’adpate à chaque annonce</span>
    </>
  );
};

function heroCVContent() {
  return(
    <span>Booster vos chances de trouver un emploi en personnalisant votre CV et en mettant en valeur vos compétences en fonction des annonces auxquelles vous postulez.</span>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}
