import React from 'react';

import {
  FormulaireRechercheOffreEmploi,
} from '~/client/components/features/OffreEmploi/FormulaireRecherche/FormulaireRechercheOffreEmploi';
import { RechercherOffreEmploi } from '~/client/components/features/OffreEmploi/Rechercher/RechercherOffreEmploi';
import commonStyles from '~/client/components/features/RechercherOffre.module.css';
import { Hero } from '~/client/components/ui/Hero/Hero';

export default function RechercherOffreEmploiPage() {
  return (
    <main id="contenu" className={commonStyles.container}>
      <Hero image="/images/banners/offre-emploi.webp">
        Des milliers d&apos;<b>offres d&apos;emplois<br/>
        sélectionnées pour vous</b> par<br/>
        Pôle Emploi
      </Hero>
      <FormulaireRechercheOffreEmploi />
      <RechercherOffreEmploi />
    </main>
  );
}
