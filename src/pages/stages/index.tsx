import React from 'react';

import styles from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout.module.css';
import { HeadTag } from '~/client/components/utils/HeaderTag';


export default function RechercherOffreStagePage() {
  return (
    <><HeadTag
      title={'Des milliers d\'offres de stages sélectionnés pour vous'}
      description="Plus de 400 000 offres d'emplois et d'alternances sélectionnées pour vous"/>
    <main id="contenu">
      <p className={styles.rechercheSolution}>coucou hibou</p>
    </main>
    </>
  )
  ;
}
