import React from 'react';

import { LinkCard } from '~/client/components/ui/Card/LinkCard';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { BookIcon } from '~/client/components/ui/Icon/book.icon';
import { BriefCaseIcon } from '~/client/components/ui/Icon/brief-case.icon';
import { CompassIcon } from '~/client/components/ui/Icon/compass.icon';
import { TrophyIcon } from '~/client/components/ui/Icon/trophy.icon';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import styles from '~/pages/index.module.css';

export default function Accueil() {
  return (
    <>
      <HeadTag title="Toutes les solutions pour l'avenir des jeunes" />
      <Hero image="/images/banners/homepage.webp">
        <b>A chacun sa solution.</b><br />
        Vous avez entre 13 et 30 ans ?<br/>
        Découvrez toutes les solutions pour<br />
        votre avenir sur 1J1S !
      </Hero>
      <main id="contenu">
        Test des icônes :
        <div>
          <BriefCaseIcon />
        </div>
        <div>
          <BookIcon />
        </div>
        <div>
          <CompassIcon />
        </div>
        <div>
          <TrophyIcon />
        </div>
        <div className={styles.grid}>
          <LinkCard imageUrl="https://images.unsplash.com/photo-1652169890471-17c3e68bf920?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
            imageAltText="héhé" link="/" linkLabel="Lien de test" title='Mon titre de carte' type='external'>
            <p>Ceci est une carte de test</p>
          </LinkCard>
          <LinkCard imageUrl="https://images.unsplash.com/photo-1652169890471-17c3e68bf920?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
            imageAltText="héhé" link="/" linkLabel="Lien de test" title='Mon titre de carte' type='internal'>
            <p>Ceci est une carte de test Ceci est une carte de testCeci est une carte de testCeci est une carte de testCeci est une carte de test Le mot de la fin</p>
          </LinkCard>
          <LinkCard imageUrl="https://images.unsplash.com/photo-1652169890471-17c3e68bf920?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
            imageAltText="héhé" link="/" linkLabel="Lien de test" title='Mon titre de carte un peu plus long' type='external'>
            <p>Ceci est une carte de test Ceci est une carte de testCeci est une carte de testCeci est une carte de testCeci est une carte de testCeci est une carte de test Le mot de la fin</p>
          </LinkCard>
          <LinkCard imageUrl="https://images.unsplash.com/photo-1652169890471-17c3e68bf920?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
            imageAltText="héhé" link="/" linkLabel="Lien de test" title='Très très très long titre de carte uniquement pour voir si le rendu est acceptable' type='internal'>
            <p>Ceci est une carte de test Ceci est une carte de test Ceci est une carte de test Ceci est une carte de test Ceci est une carte de test Ceci est une carte de test Ceci est une carte de test Ceci est une carte de test Ceci est une carte de test Ceci est une carte de test Ceci est une carte de test Ceci est une carte de test Ceci est une carte de test Ceci est une carte de test Ceci est une carte de test Ceci est une carte de test Ceci est une carte de test Ceci est une carte de test Ceci est une carte de test Ceci est une carte de test Le mot de la fin</p>
          </LinkCard>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
