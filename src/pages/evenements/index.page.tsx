import React from 'react';

import { HeroWithButtonLink } from '~/client/components/ui/Hero/HeroWithButtonLink';
import { HeadTag } from '~/client/components/utils/HeaderTag';

export default function PageEvenements() {
  const displayRechercheEvenement = process.env.NEXT_PUBLIC_RECHERCHE_EVENEMENT_FEATURE === '1';

  return (
    <>
      {
        !displayRechercheEvenement && <>
          <HeadTag title={'Trouver un évènement Emploi | 1jeune1solution'} />
          <main id='contenu'>
            <HeroWithButtonLink
              titlePrimaryText="Des centaines d'événements de recrutement "
              titleSecondaryText="pour tous les jeunes, partout en France"
              content='À la recherche d’un emploi ou d’une formation ?
              Dépassez les frontières du virtuel en allant directement à la rencontre de votre futur employeur,
              en participant à des ateliers thématiques ou en assistant à une conférence près de chez vous !'
              buttonLabel='Je trouve un événement Pôle Emploi'
              buttonLabelSecondary='Je trouve un événement ma Mission Locale'
              buttonHref='https://mesevenementsemploi.pole-emploi.fr/mes-evenements-emploi/evenements'
              buttonHrefSecondary='https://40-ans.unml.info/le-programme'
              imgSrc='/images/évènements.webp' />
          </main>
        </>
      }
      { displayRechercheEvenement && <h1>Page recherche évenement en Construction</h1> }
    </>
  );
}
