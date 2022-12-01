import React from 'react';

import {
  RéférencerEntreprises,
} from '~/client/components/features/Immersions/ReferencesEntreprises/RéférencerEntreprises';
import AidesExceptionnelles
  from '~/client/components/features/JeDeviensMentor/AidesExceptionnelles/AidesExceptionnelles';
import { HeadTag } from '~/client/components/utils/HeaderTag';

export default function Immersions() {
  return (
    <>
      <HeadTag
        title="Immersions"
        description="Plus de 400 000 offres d'emplois et d'alternances sélectionnées pour vous"
      />
      <main id="contenu">
        <RéférencerEntreprises />
        <AidesExceptionnelles />
      </main>
    </>
  );
}
