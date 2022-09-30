import React from 'react';

import { HeroWithButtonLink } from '~/client/components/ui/Hero/HeroWithButtonLink';
import { HeadTag } from '~/client/components/utils/HeaderTag';

export default function PageEvenements() {
  return (
    <>
      <HeadTag title={'Trouver un évènement Emploi | 1jeune1solution'} />
      <main id='contenu'>
        <HeroWithButtonLink
          titlePrimaryText="Des centaines d'événements de recrutement "
          titleSecondaryText="pour tous les jeunes, partout en France"
          content='À la recherche d’un emploi ou d’une formation ?
              Dépassez les frontières du virtuel en allant directement à la rencontre de votre futur employeur,
              en participant à des ateliers thématiques ou en assistant à une conférence près de chez vous !'
          buttonLabel='Je trouve un événement' 
          buttonHref='https://mesevenementsemploi.pole-emploi.fr/mes-evenements-emploi/evenements'
          imgSrc='/images/évènements.webp' />
      </main>
    </>
  );
}
