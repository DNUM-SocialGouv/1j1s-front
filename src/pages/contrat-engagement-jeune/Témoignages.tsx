import Image from 'next/image';
import React from 'react';

import { AccordionComponent } from '~/client/components/ui/Accordion/AccordionComponent';
import Marked from '~/client/components/ui/Marked/Marked';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import styles from '~/pages/contrat-engagement-jeune/Témoignages.module.scss';

import portraitKévin from '../../../public/images/CEJ/vignette-kevin.jpg';


const programme = `
#### Son programme :

+ 3 mois dans sa Mission Locale avec son conseiller qui lui proposera des ateliers collectifs pour
  travailler sur son projet professionnel et effectuer des stages en entreprise en bénéficiant d'une
  allocation de 500 euros par mois.
+ Intéressé par le sport, il pourra ensuite faire un service civique de 8 mois dans une association
  qui propose des activités sportives à des jeunes en difficulté.
+ Pour finir, avant de se lancer sur le marché du travail, il retournera dans sa Mission Locale
  pendant 1 mois pour préparer des entretiens d'embauche avec son conseiller et démarcher des entreprises.
+ **Objectif :** qu'à la fin de son programme Kévin ait trouvé un emploi dans un domaine dans lequel il s'épanouit.
`;

export function TémoignageKévin () {
  const { isSmallScreen } = useBreakpoint();
  let ContenuProgramme = (<Marked className={ styles.programme } markdown={ programme }/>);
  if (isSmallScreen) {
    ContenuProgramme = (<AccordionComponent>{ ContenuProgramme }</AccordionComponent>);
  }
  return (
    <section className={ styles.témoignage}>
      <article>
        <h2>Ce que le Contrat d&apos;Engagement Jeune proposera à Kévin</h2>
        <div className={ styles.portrait }>
          <Image src={ portraitKévin } alt="Portrait de Kévin" />
        </div>
        <div className={ styles.bio }>
          <h3>Kévin, 18 ans</h3>
          <p >Sans diplôme et sans aucune ressource financière, il pourra bénéficier du Contrat d&apos;Engagement Jeune.</p>
        </div>
        { ContenuProgramme }
      </article>
    </section>
  );
}
