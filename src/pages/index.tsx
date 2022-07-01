import React from 'react';

import { CardComponent } from '~/client/components/ui/Card/CardComponent';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { BookIcon } from '~/client/components/ui/Icon/book.icon';
import { BriefCaseIcon } from '~/client/components/ui/Icon/brief-case.icon';
import { CompassIcon } from '~/client/components/ui/Icon/compass.icon';
import { TrophyIcon } from '~/client/components/ui/Icon/trophy.icon';
import { HeadTag } from '~/client/components/utils/HeaderTag';

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
        <CardComponent title="Test de carte"
          linkLabel="Mon lien de test"               
          link="https://images.unsplash.com/photo-1656376406178-9b74c689bdad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80" 
          imageUrl="https://images.unsplash.com/photo-1656376406178-9b74c689bdad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80" 
          imageAltText="Mon image">
          <p>mon contenu</p>
        </CardComponent>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
